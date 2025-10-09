# GitHub Copilot Instructions for Tiani Beeming Portfolio

## Meta-Instructions for AI Assistants

**IMPORTANT**: When the user provides "repo organization" or "process improvement" tasks (e.g., file naming conventions, folder structures, documentation standards), you MUST:

1. ✅ **Implement the requested changes** immediately
2. ✅ **Update these copilot instructions** to document the new conventions
3. ✅ **Add clear examples** so future AI interactions follow the same patterns
4. ✅ **Place new rules in the appropriate section** (File Organization, Development Workflow, etc.)

This ensures the repository stays organized and future tasks automatically follow established patterns without requiring the user to repeat instructions.

---

## Project Overview

This is a **portfolio website for Tiani Beeming**, a professional pastry chef and cake decorator. The site showcases her cake designs, provides her CV/resume, and offers contact information.

### Tech Stack
- **Frontend**: React 19.0.0 + TypeScript
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS 4.0.17
- **Routing**: React Router DOM v6 (not v7)
- **CMS**: Tina.io v2.9.0 (for content management)
- **UI Components**: Radix UI primitives with custom components

### Project Type
- Static portfolio website
- Single-page application with client-side routing
- Content-driven with markdown files

---

## Important Project Patterns

### 1. Content Management (Tina CMS)

**All content is stored as markdown files with YAML frontmatter:**

#### Portfolio Items
- **Location**: `/content/portfolio/*.md`
- **Format**: Individual markdown file per item
- **Structure**:
```markdown
---
title: "Item Title"
imageSrc: "/portfolio-images/image.jpg"
labels:
  - "Category 1"
  - "Category 2"
featurePosition: 1  # Optional number for homepage featuring
---

Description text (markdown body)
```

#### CV/Profile Data
- **Location**: `/content/profile/cv-data.md`
- **Single file** with complex nested YAML frontmatter
- **Parser**: Uses `gray-matter` library (NOT custom parser)

### 2. Data Loading Pattern

**File**: `/src/lib/tina.ts`

```typescript
// Uses Vite's glob imports with eager loading
const files = import.meta.glob('../../content/portfolio/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

// Parse with gray-matter library
import matter from 'gray-matter'
const { data: frontmatter, content: body } = matter(content)
```

**Key Points**:
- ✅ **DO** use `gray-matter` for parsing markdown frontmatter
- ✅ **DO** use Vite glob imports with `eager: true` and `query: '?raw'`
- ❌ **DON'T** use custom YAML parsers (they break with nested objects)
- ❌ **DON'T** use dynamic imports (`await import()`) - use glob patterns

### 3. Featured Items Logic

**Featured items on homepage require:**
- `featurePosition` must be a **number** (not string)
- Filter: `typeof item.featurePosition === 'number'`
- Sort: `(a, b) => (a.featurePosition ?? 0) - (b.featurePosition ?? 0)`

**Homepage lightbox navigation**:
- Only cycles through featured items (1, 2, 3)
- Portfolio page cycles through all items

### 4. Type Safety

**Important interfaces** in `/src/lib/tina.ts`:
```typescript
export interface PortfolioItem {
  id: string
  title: string
  description: string
  imageSrc: string
  labels: string[]
  featurePosition?: number  // Optional number
}

export interface CVData {
  name: string
  contact: { email: string; phone: string }
  summary: string
  socialMedia: Array<{name: string; url: string; handle: string}>
  careerHistory: Array<{role: string; company: string; period: string; responsibilities?: string[]}>
  skills: string[]
  languages: string[]
  education: Array<{qualification: string; institution: string; year: string; details?: string[]}>
}
```

---

## Development Workflow

### Commands
```bash
npm run dev          # Standard dev (Vite only) - RECOMMENDED
npm run dev:tina     # Dev with Tina CMS admin UI
npm run build        # Production build
npm run build:tina   # Build with Tina GraphQL types
```

### Dev Server
- **Port**: 5173 (Vite default)
- **Tina GraphQL**: Port 4001 (when using `dev:tina`)
- **Admin UI**: `http://localhost:5173/admin/index.html`

---

## Common Pitfalls & Solutions

### ❌ Problem: Pages Show Blank/Loading Forever
**Cause**: Data not loading properly
**Solution**: 
- Check `loadCVData()` and `loadPortfolioItems()` in `/src/lib/tina.ts`
- Verify glob patterns are correct
- Ensure `gray-matter` is being used (not custom parser)
- Add console.logs to debug data loading

### ❌ Problem: Featured Items Don't Display
**Cause**: `featurePosition` parsed as string instead of number
**Solution**:
- Ensure `gray-matter` is used (it auto-converts types)
- In markdown: `featurePosition: 1` (no quotes)
- Check filter: `typeof item.featurePosition === 'number'`

### ❌ Problem: Build Fails with Module Errors
**Cause**: Missing dependencies or incorrect Vite config
**Solution**:
- Check `vite.config.ts` - uses Tailwind CSS Vite plugin only
- No separate React plugin is used (handled by Tailwind)
- Check for `buffer` and `process.env` polyfills in config
- Ensure `optimizeDeps` includes: `react`, `react-dom`, `react-router-dom`, `gray-matter`, `buffer`

### ❌ Problem: Nested YAML Data Not Parsing
**Cause**: Using custom YAML parser
**Solution**:
- **ALWAYS use `gray-matter`** library
- Never write custom YAML parsers for this project
- `gray-matter` handles all edge cases correctly

---

## File Organization

### Documentation & Markdown Files
**IMPORTANT**: Follow these rules for markdown file placement:

✅ **Keep in root** (standard GitHub files):
- `README.md` - Project overview
- `LICENSE` - License file
- `CHANGELOG.md` - Version history
- `CONTRIBUTING.md` - Contribution guidelines
- `CODE_OF_CONDUCT.md` - Community standards
- `SECURITY.md` - Security policies

📁 **Move to `/docs`** (project documentation):
- All user-facing documentation
- Setup guides, tutorials, how-tos
- Architecture docs, API docs
- Any `.md` files about the project itself

📋 **Move to `/tasks`** (task/work tracking):
- Task completion summaries
- Debug logs and investigation notes
- Implementation notes
- Work progress documentation

### Task File Naming Convention

**ALL task files MUST follow this naming pattern:**

```
yyyyMMdd-XX-DESCRIPTION.md
```

**Format rules:**
- `yyyyMMdd` = Date the task was created (e.g., 20251001 for October 1, 2025)
- `XX` = Two-digit sequence number (01-99) for tasks created on the same day
- `DESCRIPTION` = Clear, descriptive name in UPPER_SNAKE_CASE or kebab-case

**Examples:**
- ✅ `20251001-01-MIGRATION_CHECKLIST.md`
- ✅ `20251001-02-FEATURED_ITEMS_VERIFICATION.md`
- ✅ `20251002-01-add-search-feature.md`
- ❌ `MIGRATION_CHECKLIST.md` (missing date prefix)
- ❌ `2025-10-01-task.md` (wrong date format)

**Benefits:**
- Chronological sorting is automatic
- Easy to see when tasks were created
- Supports up to 99 tasks per day
- Clear at-a-glance timeline of work

**When creating new task files:**
1. Use current date in yyyyMMdd format
2. Check existing files for that date to determine next sequence number
3. Add descriptive name after the sequence number

### Project Structure

```
/content                    # ALL CONTENT (managed by Tina CMS)
├── /portfolio/            # 42 individual portfolio items
│   └── *.md              # One file per item
├── /posts/                # Blog posts (optional)
└── /profile/
    └── cv-data.md        # Single CV/profile file

/src
├── /lib/
│   └── tina.ts           # Data loading utilities ⭐ IMPORTANT
├── /pages/               # Page components
│   ├── HomePage.tsx      # Featured items logic
│   ├── PortfolioPage.tsx # All items + filtering
│   ├── ResumePage.tsx    # CV display
│   ├── ContactPage.tsx   # Contact info
│   └── AboutPage.tsx     # Bio/summary
├── /components/          # Reusable components
│   └── /ui/             # Radix UI wrappers
├── /data/
│   └── /backup/         # OLD JSON files (DEPRECATED)
└── App.tsx              # Main app with routing

/tina
└── config.ts            # Tina CMS schema

/public
└── /portfolio-images/   # Portfolio images

/docs                    # User documentation
/tasks                   # Task completion summaries
```

---

## Image Handling

### Adding New Portfolio Images
1. Place image in `/public/portfolio-images/`
2. Reference in markdown: `imageSrc: "/portfolio-images/filename.jpg"`
3. Images are served statically from public folder
4. Path must start with `/` (absolute from public root)

### Image Optimization
- Currently using `vite-plugin-image-optimizer` (configured but may have conflicts)
- Plugin is installed but not actively used in production build
- Images should be optimized before upload for best performance

---

## Component Patterns

### Data Loading in App.tsx
```typescript
// Load data on mount
useEffect(() => {
  const loadData = async () => {
    const [portfolio, cvData] = await Promise.all([
      loadPortfolioItems(),
      loadCVData()
    ])
    setPortfolioItems(portfolio)
    if (cvData) {
      setCvDataState(cvData)
      setAboutContent(cvData.summary)
    }
    setDataLoaded(true)
  }
  loadData()
}, [])
```

### Null Handling in Pages
```typescript
// Pages must handle null state
if (!cvDataState) {
  return <div>Loading...</div>
}
```

---

## Styling Guidelines

### Tailwind Usage
- Uses Tailwind CSS 4.0.17 with `@tailwindcss/vite` plugin
- Custom theme in `/src/styles/theme.css`
- Component-specific styles in `/src/index.css`
- Configuration uses Vite plugin instead of separate config file

### UI Components
- Built on Radix UI primitives
- Located in `/src/components/ui/`
- Styled with Tailwind + CVA (class-variance-authority)

---

## Content Editing

### For Developers
- Edit markdown files in `/content/` directly
- Hot reload works automatically
- Commit markdown files to Git

### For Content Managers
- Use Tina CMS admin UI (`npm run dev:tina`)
- Visual editor at `/admin/index.html`
- Changes save directly to markdown files

---

## Production Deployment

### GitHub Pages Deployment

The project is configured to automatically deploy to GitHub Pages via GitHub Actions.

**Workflow file**: `.github/workflows/deploy.yml`

**Build Process**:
1. Checkout code
2. Setup Node.js v20
3. Install dependencies
4. **Build Tina Admin** (`npm run build:tina`) - Creates admin interface in `public/admin/`
5. **Build Main App** (`npm run build`) - Vite builds to `dist/` (includes admin)
6. Upload and deploy to GitHub Pages

**Required GitHub Secrets**:
- `NEXT_PUBLIC_TINA_CLIENT_ID` - From tina.io project dashboard
- `TINA_TOKEN` - From tina.io project settings

**Important**: The workflow MUST run `build:tina` before `build` to ensure the admin interface is properly included in the deployment.

### Build Output
- Static files in `/dist`
- SPA with client-side routing
- Currently deployed to GitHub Pages
- Requires SPA-friendly hosting or proper routing configuration

### Environment Variables
Optional (for Tina Cloud):
```
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
```

### Deployment Checklist
- [ ] Run `npm run build:tina` to build Tina admin interface
- [ ] Run `npm run build` to build the main application
- [ ] Check `/dist` for output (including `/admin` folder)
- [ ] Test with `npm run preview`
- [ ] Ensure GitHub secrets are set (NEXT_PUBLIC_TINA_CLIENT_ID and TINA_TOKEN)
- [ ] Push to main branch to trigger GitHub Actions deployment

---

## Dependencies to Remember

### Critical Dependencies
- `gray-matter`: YAML frontmatter parsing ⭐ ESSENTIAL
- `tinacms`: CMS functionality
- `@tinacms/cli`: CLI tools
- `react-router-dom`: Client-side routing

### Don't Add These
- ❌ Custom YAML parsers (use `gray-matter` instead)
- ❌ `@vitejs/plugin-react` (not needed with Tailwind Vite plugin)
- ❌ `@vitejs/plugin-react-swc` (same reason)
- ❌ Additional build plugins without testing (can cause conflicts)

---

## Debugging Tips

### Check Data Loading
```typescript
// In tina.ts functions
console.log('Portfolio files:', Object.keys(portfolioFiles))
console.log('Parsed item:', item)
console.log('CV data:', cvData)
```

### Check Featured Items
```typescript
// In HomePage.tsx
const featuredItems = portfolioItems
  .filter(item => typeof item.featurePosition === 'number')
console.log('Featured items:', featuredItems)
```

### Common Console Errors
- "Cannot find module" → Check glob pattern paths
- "cvDataState is null" → Check loadCVData() function
- "featurePosition is undefined" → Check YAML parsing

---

## Testing Approach

### What to Test
1. All pages load without errors
2. Portfolio items display correctly
3. Featured items show on homepage (exactly 3)
4. Contact page shows CV data
5. Resume page shows CV data
6. Build completes successfully

### Quick Test
```bash
npm run build && npm run preview
# Visit all routes and check for errors
```

---

## Quick Reference

### Key Files
- `/src/lib/tina.ts` - Data loading ⭐
- `/src/App.tsx` - Main app & routing
- `/tina/config.ts` - CMS schema
- `/content/` - All content

### Key Commands
- `npm run dev` - Standard development (Vite only)
- `npm run dev:tina` - Development with Tina CMS admin UI
- `npm run build:tina` - Build Tina admin interface
- `npm run build` - Build production application
- `npm run preview` - Preview production build locally
- Check `/docs/QUICK_START.md` for more

### Key Concepts
- Content = Markdown files
- Parser = gray-matter library
- Featured = `featurePosition` number
- Images = `/public/portfolio-images/`

---

## Notes for Future Developers

1. **Never replace gray-matter** - Custom parsers break nested YAML
2. **Use glob patterns** - Dynamic imports don't work reliably
3. **Featured items need numbers** - Not strings, actual numbers
4. **Keep it simple** - Avoid complex build plugins
5. **Test all pages** - Especially Contact and Resume after changes

---

**Last Updated**: October 2025  
**Project Status**: ✅ Fully Functional  
**CMS Status**: ✅ Tina.io v2.9.0 Integrated  
**Content Items**: 42 portfolio items + 1 CV profile + posts collection  
**Deployment**: ✅ GitHub Pages via GitHub Actions