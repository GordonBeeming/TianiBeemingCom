// This file loads data from Tina CMS markdown files
// It reads the content at build/runtime and parses the frontmatter
import { Buffer } from 'buffer'
import matter from 'gray-matter'

// Polyfill Buffer for browser
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
}

export interface PortfolioItem {
  id: string
  title: string
  description: string
  imageSrc: string
  labels: string[]
  featurePosition?: number
}

export interface CVData {
  name: string;
  contact: {
    email: string;
    phone: string;
  };
  summary: string;
  socialMedia: Array<{
    name: string;
    url: string;
    handle: string;
  }>;
  careerHistory: Array<{
    role: string;
    company: string;
    period: string;
    responsibilities?: string[];
  }>;
  skills: string[];
  languages: string[];
  education: Array<{
    qualification: string;
    institution: string;
    year: string;
    details?: string[];
  }>;
}

// Load portfolio items from markdown files
export const loadPortfolioItems = async (): Promise<PortfolioItem[]> => {
  // Use Vite's glob import to get all portfolio markdown files
  const portfolioFiles = import.meta.glob('../../content/portfolio/*.md', { 
    eager: true,
    query: '?raw',
    import: 'default'
  })
  
  console.log('Portfolio files loaded:', Object.keys(portfolioFiles).length)
  
  const items: PortfolioItem[] = []
  
  for (const [path, content] of Object.entries(portfolioFiles)) {
    console.log(`Processing: ${path}, content type: ${typeof content}`)
    if (typeof content === 'string') {
      const item = parsePortfolioMarkdown(path, content)
      if (item) items.push(item)
    } else {
      console.error(`Content is not a string for ${path}, got:`, typeof content)
    }
  }
  
  console.log(`Loaded ${items.length} portfolio items`)
  return items
}

// Load CV data from markdown file
export const loadCVData = async (): Promise<CVData | null> => {
  try {
    // Use glob import to get the CV data file
    const cvFiles = import.meta.glob('../../content/profile/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    })
    
    // Get the cv-data.md file
    const cvFilePath = Object.keys(cvFiles).find(path => path.includes('cv-data.md'))
    
    if (!cvFilePath) {
      console.error('CV data file not found')
      return null
    }
    
    const content = cvFiles[cvFilePath]
    
    if (typeof content !== 'string') {
      console.error('CV data content is not a string')
      return null
    }
    
    return parseCVMarkdown(content)
  } catch (error) {
    console.error('Error loading CV data:', error)
    return null
  }
}

// Parse portfolio markdown
function parsePortfolioMarkdown(path: string, content: string): PortfolioItem | null {
  try {
    const { data: frontmatter, content: body } = matter(content)
    const id = path.split('/').pop()?.replace('.md', '') || ''
    
    return {
      id,
      title: frontmatter.title || '',
      description: body.trim() || '',
      imageSrc: frontmatter.imageSrc || '',
      labels: frontmatter.labels || [],
      featurePosition: frontmatter.featurePosition
    }
  } catch (error) {
    console.error(`Error parsing portfolio markdown at ${path}:`, error)
    console.error('Content preview:', content.substring(0, 200))
    return null
  }
}

// Parse CV markdown
function parseCVMarkdown(content: string): CVData | null {
  try {
    const { data: frontmatter, content: body } = matter(content)
    
    return {
      name: frontmatter.name || '',
      contact: frontmatter.contact || { email: '', phone: '' },
      summary: body.trim() || '',
      socialMedia: frontmatter.socialMedia || [],
      careerHistory: frontmatter.careerHistory || [],
      skills: frontmatter.skills || [],
      languages: frontmatter.languages || [],
      education: frontmatter.education || []
    }
  } catch (error) {
    console.error('Error parsing CV markdown:', error)
    return null
  }
}