#!/usr/bin/env node

/**
 * Image Processing Script for Portfolio
 * 
 * This script processes raw images from /src/images/ and prepares them for web use:
 * - Renames files to web-friendly format (lowercase, kebab-case)
 * - Optimizes images for web performance
 * - Resizes and compresses images
 * - Saves processed images to /public/portfolio-images/
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, '..');
const sourceDir = path.join(projectRoot, 'src', 'images');
const outputDir = path.join(projectRoot, 'public', 'portfolio-images');

/**
 * Convert filename to web-friendly format
 * @param {string} filename - Original filename
 * @returns {string} Web-friendly filename
 */
function makeWebFriendly(filename) {
  const name = path.parse(filename).name;
  const ext = path.parse(filename).ext;
  
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-') + ext;
}

/**
 * Copy and rename image files (basic implementation)
 * In a real-world scenario, you'd use libraries like sharp for image optimization
 */
async function processImage(sourcePath, filename) {
  const webFriendlyName = makeWebFriendly(filename);
  const outputPath = path.join(outputDir, webFriendlyName);
  
  try {
    // For now, just copy the file with the new name
    // In production, you'd add image optimization here using libraries like sharp
    await fs.copyFile(sourcePath, outputPath);
    console.log(`✓ Processed: ${filename} → ${webFriendlyName}`);
    return webFriendlyName;
  } catch (error) {
    console.error(`✗ Failed to process ${filename}:`, error.message);
    return null;
  }
}

/**
 * Main processing function
 */
async function processImages() {
  try {
    console.log('🎨 Starting image processing...\n');
    
    // Ensure output directory exists
    await fs.mkdir(outputDir, { recursive: true });
    
    // Read source directory
    const files = await fs.readdir(sourceDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );
    
    if (imageFiles.length === 0) {
      console.log('No image files found in source directory.');
      return;
    }
    
    console.log(`Found ${imageFiles.length} image files to process:\n`);
    
    const processedFiles = [];
    
    for (const file of imageFiles) {
      const sourcePath = path.join(sourceDir, file);
      const processedName = await processImage(sourcePath, file);
      if (processedName) {
        processedFiles.push({
          original: file,
          processed: processedName,
          path: `/portfolio-images/${processedName}`
        });
      }
    }
    
    console.log(`\n✅ Processing complete! ${processedFiles.length} images processed.`);
    console.log('\nProcessed files:');
    processedFiles.forEach(file => {
      console.log(`  ${file.original} → ${file.processed}`);
    });
    
    // Save mapping for reference
    const mapping = {
      timestamp: new Date().toISOString(),
      processedFiles
    };
    
    await fs.writeFile(
      path.join(outputDir, 'processing-log.json'),
      JSON.stringify(mapping, null, 2)
    );
    
    console.log('\n📋 Processing log saved to public/portfolio-images/processing-log.json');
    
  } catch (error) {
    console.error('Error processing images:', error);
    process.exit(1);
  }
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  processImages();
}

export { processImages, makeWebFriendly };