# Copilot Instructions Update - Adapted for Tiani Beeming Portfolio

## Date: October 9, 2025

## Summary

Updated `.github/copilot-instructions.md` to properly adapt the recipe website template for the Tiani Beeming Portfolio project, keeping all workflow instructions intact while updating project-specific details.

## What Was Changed

### ✅ Project-Specific Updates (Tech Stack & Content)

1. **Project Overview**
   - Changed from: "recipe website"
   - Changed to: "portfolio website for Tiani Beeming, a professional pastry chef and cake decorator"

2. **Technology Stack Versions**
   - React 19.0.0 (confirmed)
   - Vite 6.3.5 (confirmed)
   - Tailwind CSS 4.0.17 (confirmed)
   - Tina CMS v2.9.0 (confirmed)
   - React Router DOM v6 (confirmed)
   - Markdown parser: gray-matter (confirmed)

3. **Content Structure**
   - Changed from: `content/recipes/`
   - Changed to: `content/portfolio/` (42 items), `content/profile/`, `content/posts/`

4. **Admin Access URLs**
   - Changed from: `http://localhost:5000/admin`
   - Changed to: `http://localhost:5173/admin` (Vite default port)

5. **Build Scripts**
   - Updated to match actual package.json:
     - `npm run dev` - Regular dev (faster)
     - `npm run dev:tina` - Dev with Tina CMS
     - `npm run build:tina` - Build Tina admin
     - `npm run build` - Build application

6. **Project-Specific Patterns Added**
   - Featured Items Logic (specific to portfolio)
   - Data Loading with gray-matter
   - Common Pitfalls specific to this project

7. **File Organization**
   - Updated component structure
   - Noted `src/lib/tina.ts` for data loading
   - Documented backup JSON files location

8. **Deployment**
   - Added GitHub Pages deployment info
   - Noted GitHub Actions workflow

### ✅ What Was KEPT (Your Workflow Instructions)

All of these sections were preserved exactly as you had them:

1. **Project File Structure Rules**
   - ⚠️ CRITICAL: All Files Must Be in Project Directory
   - Never write outside project root
   - Temporary files in `tmp/` folder

2. **File Organization Standards**
   - Documentation in `/docs/` (except standard GitHub files)
   - Task documentation in `/tasks/`
   - Task file naming: `YYYYMMDD-XX-topic.md`
   - Task screenshots in `/tasks/images/`

3. **Git Workflow - Commit as You Go**
   - Commit frequently
   - Small, focused commits
   - Descriptive commit messages
   - When to commit guidelines
   - Commit message format

4. **Co-Author Attribution**
   - ALWAYS add requester as co-author
   - How to identify the requester
   - Co-author format examples
   - When to add co-authors

5. **Accessibility First 🌟**
   - All accessibility requirements
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation
   - Form accessibility
   - Visual accessibility
   - Screen reader support
   - Accessibility checklist

6. **Before/After/Making Changes Workflow**
   - Before making changes checklist
   - Making changes guidelines
   - After making changes checklist

7. **Testing and Quality**
   - Manual testing requirements
   - Screenshots for task documentation
   - Before committing checklist
   - Edge cases to consider

8. **Important Reminders**
   - All 14 critical guidelines
   - When to update these instructions

## Files Modified

1. `.github/copilot-instructions.md` - Fully adapted for Tiani Beeming Portfolio

## Verification

✅ All workflow instructions preserved
✅ Project-specific tech details updated
✅ Content management structure updated
✅ Build commands match package.json
✅ Accessibility requirements intact
✅ Co-author guidelines intact
✅ File organization rules intact
✅ Git workflow instructions intact

## Result

The copilot instructions now:
- Have accurate tech stack for THIS project (Tiani Beeming Portfolio)
- Retain ALL your workflow preferences (commits, co-authoring, file organization)
- Include project-specific patterns (featured items, portfolio structure)
- Maintain all accessibility and quality standards
- Reference correct paths and content structure
