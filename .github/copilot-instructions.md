# GitHub Copilot Instructions

## Project Overview
This is a **portfolio website for Tiani Beeming**, a professional pastry chef and cake decorator. The site showcases her cake designs, provides her CV/resume, and offers contact information. Built with React, Vite, TypeScript, and Tailwind CSS, using **Tina CMS** for content management.

## Technology Stack
- **Frontend**: React 19.0.0, TypeScript, Tailwind CSS 4.0.17
- **Build Tool**: Vite 6.3.5
- **CMS**: Tina CMS v2.9.0 (integrated)
- **Routing**: React Router DOM v6
- **UI Components**: Radix UI primitives, custom components
- **Markdown**: gray-matter for frontmatter parsing

## Content Management System (Tina CMS)

### Important: Generated Files Are NOT Source Code
**Tina admin files are build artifacts, NOT source code.**

#### What Gets Committed:
- ✅ `tina/config.ts` - Tina configuration
- ✅ `content/` - Portfolio and profile markdown files
- ✅ Tina-related dependencies in package.json

#### What Gets Ignored (`.gitignore`):
- ❌ `public/admin/` - Generated admin UI files (except `.gitignore`)
- ❌ `tina/__generated__/` - Auto-generated schema and GraphQL files
- ❌ Any other admin build artifacts

**NEVER commit these generated files** - they are rebuilt during the build process.

### Build Process
The build includes Tina admin generation:
```json
{
  "scripts": {
    "build": "tsc -b --noCheck && vite build",
    "build:tina": "tinacms build"
  }
}
```

**GitHub Actions workflow** runs both:
1. `npm run build:tina` - Generates admin UI in `public/admin/`
2. `npm run build` - TypeScript compilation + Vite builds the app (includes admin files)

### Development Workflow

#### With CMS Access (use this for content editing):
```bash
npm run dev:tina
# or
pnpm run dev:tina
```
- Starts Vite + Tina CMS
- Access admin at `/admin`
- Edit content visually

#### Without CMS (faster for code changes):
```bash
npm run dev
# or
pnpm run dev
```
- Regular Vite dev server
- No admin access

### Why Admin Files Are NOT Committed

1. **Build Artifacts**: Generated during build, like `dist/`
2. **Platform-Specific**: esbuild binaries differ per OS
3. **Reproducible**: Build produces identical output
4. **Bloat**: Large JS bundles would bloat repo

### CI/CD Behavior
- GitHub Actions runs on Linux
- Builds Tina admin during deployment
- Works correctly because build happens on target platform
- Deployed to GitHub Pages automatically on push to main

## Project File Structure Rules

### ⚠️ CRITICAL: All Files Must Be in Project Directory
**NEVER write files outside the project root.** All files, directories, and artifacts must be within the project folder.

#### Allowed Locations:
- Project root: `/work` or current working directory
- Any subdirectories under project root
- Temporary files: Use `tmp/` folder within project (add to .gitignore)

#### Forbidden:
- Writing to home directory (`~/`)
- Writing to system directories (`/tmp`, `/var`, etc.)
- Writing outside project boundaries

#### If You Need Temporary Storage:
1. Create `tmp/` folder in project root
2. Add `tmp/` to `.gitignore`
3. Use it for temporary files
4. Clean up when done

## File Organization Standards

### Documentation Structure
**All documentation files must be organized in the `/docs` folder**, except for standard GitHub files.

#### Standard GitHub Files (keep in root):
- `README.md` - Project overview and getting started guide
- `LICENSE` - Project license
- `SECURITY.md` - Security policies and vulnerability reporting (if exists)
- `CODE_OF_CONDUCT.md` - Community guidelines (if exists)
- `CONTRIBUTING.md` - Contribution guidelines (if exists)
- `CHANGELOG.md` - Version history (if exists)

#### Documentation Files (must be in `/docs`):
- Product requirements documents
- Architecture documentation
- Design specifications
- API documentation
- User guides
- Development guides
- Any other project documentation

### Task Documentation
All task outcomes from Copilot jobs and development tasks must be documented in `/tasks/`.

#### Task File Naming Convention:
- **Format**: `YYYYMMDD-XX-topic.md` (XX is a two-digit order number)
- **Example**: `20251001-01-migration-checklist.md`, `20251001-02-featured-items-verification.md`
- **Date Format**: Use ISO 8601 date format (YYYYMMDD)
- **Order**: Two-digit sequence number (01, 02, 03...) to track order of tasks on same day
- **Topic**: Use lowercase with hyphens for multi-word topics

#### Task Screenshots:
- **Location**: `/tasks/images/`
- **For UI Changes**: Take before/after screenshots manually
- **Naming**: `YYYYMMDD-XX-{description}.png` (matches task file)
- **Examples**: 
  - `20251001-02-before-lightbox.png`
  - `20251001-02-after-lightbox.png`
  - `20251009-01-deployment-workflow.png`
- **In Task Docs**: Reference images with relative paths: `![Description](./images/20251001-02-before-lightbox.png)`

#### Task Documentation Guidelines:
1. **Minor Tasks**: Update existing task files instead of creating new ones
   - If a task is a continuation or update to previous work, append to the existing file
   - Add a new section with updated date header within the file
   
2. **Major Tasks**: Create new task files for significant features or changes
   - New features or components
   - Major refactoring efforts
   - Significant bug fixes
   - Architecture changes

3. **Task File Content Should Include**:
   - Date and brief description at the top
   - Problem/objective statement
   - Solution approach
   - Changes made (file changes, new dependencies, etc.)
   - Testing performed
   - Any follow-up items or known issues
   - **Use standard markdown checkboxes**: `- [ ]` for unchecked, `- [x]` for checked
   - Avoid using emojis (✅, ✓, ❌) for checkboxes - use proper markdown syntax

## Tina CMS Integration (Complete)

### Content Structure
- **Portfolio Content**: `content/portfolio/` - 42 individual cake designs as markdown files
- **Profile/CV**: `content/profile/cv-data.md` - Single file with nested YAML frontmatter
- **Posts**: `content/posts/` - Blog posts (optional, not actively used)
- **Tina Config**: `tina/config.ts` - Schema and collection definitions

### Admin Access
- **Local**: `http://localhost:5173/admin` (requires `npm run dev:tina` or `pnpm run dev:tina`)
- **Production**: `https://yourusername.github.io/your-repo/admin` (after deployment)

### Development Commands
```bash
# Dev with Tina CMS access
npm run dev:tina  # or: pnpm run dev:tina

# Regular dev (faster, no CMS)
npm run dev       # or: pnpm run dev

# Build Tina admin
npm run build:tina  # or: pnpm run build:tina

# Build the app
npm run build     # or: pnpm run build
```

### Build Behavior
- Tina build creates admin interface: `tinacms build` → `public/admin/`
- Main build includes everything: `tsc && vite build` → `dist/` (includes admin)
- Admin files are in `.gitignore` (build artifacts)

### When Making Changes
1. **Never commit** `public/admin/` or `tina/__generated__/` files (they're generated)
2. **Always commit** changes to `tina/config.ts` or content schema
3. **Use `npm run dev:tina`** when testing CMS-related features
4. **Update Tina config** when adding new content fields

### Content Loading Pattern
**Important**: This project uses `gray-matter` library for parsing markdown frontmatter.

```typescript
// In src/lib/tina.ts
import matter from 'gray-matter'

// Uses Vite's glob imports
const files = import.meta.glob('../../content/portfolio/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
})

// Parse with gray-matter
const { data: frontmatter, content: body } = matter(fileContent)
```

**Never use custom YAML parsers** - they break with nested objects. Always use `gray-matter`.

## Code Style and Patterns

### Accessibility First 🌟

**Accessibility is a CORE requirement, not an afterthought.**

Every component, feature, and change MUST be built with accessibility in mind:

#### Required Accessibility Practices:
1. **Semantic HTML**
   - Use appropriate HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`, etc.)
   - Never use `<div>` or `<span>` when a semantic element exists
   - Ensure proper heading hierarchy (h1 → h2 → h3, no skipping levels)

2. **ARIA Attributes**
   - Add `aria-label` to icon-only buttons and interactive elements
   - Use `aria-hidden="true"` for decorative icons and images
   - Implement `aria-live` regions for dynamic content updates
   - Add `aria-describedby` for additional context when needed
   - Use proper `role` attributes (e.g., `role="list"`, `role="status"`)

3. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Implement visible focus states (never `outline: none` without replacement)
   - Support standard keyboard patterns (Tab, Enter, Space, Escape, Arrow keys)
   - Ensure logical tab order follows visual flow

4. **Form Accessibility**
   - Always associate labels with form inputs using `htmlFor` and `id`
   - Include helpful placeholder text and error messages
   - Use appropriate input types
   - Provide clear validation feedback

5. **Visual Accessibility**
   - Maintain WCAG AA contrast ratios minimum (4.5:1 for normal text, 3:1 for large text)
   - Don't rely on color alone to convey information
   - Ensure touch targets are at least 44×44 pixels
   - Support text resize up to 200% without breaking layout

6. **Images and Media**
   - Provide meaningful `alt` text for all images (describe content, not "image of...")
   - Use `aria-hidden="true"` for decorative images with empty alt (`alt=""`)
   - Ensure portfolio images have descriptive alt text

7. **Screen Reader Support**
   - Test with screen readers (VoiceOver, NVDA, JAWS)
   - Use skip links for navigation
   - Announce dynamic content changes with `aria-live`
   - Provide descriptive link text (avoid "click here")

#### Accessibility Checklist for Every Change:
- [ ] Can this be used with keyboard only?
- [ ] Does this work with a screen reader?
- [ ] Are color contrasts sufficient?
- [ ] Are all interactive elements properly labeled?
- [ ] Is focus management handled correctly?
- [ ] Are error states clearly communicated?
- [ ] Does this work at 200% zoom?

### TypeScript
- Use TypeScript for all new files
- Prefer type inference where possible
- Use interfaces for object shapes, types for unions/intersections
- Avoid `any` - use `unknown` if type is truly unknown

### React Patterns
- Use functional components with hooks
- Prefer composition over inheritance
- Use custom hooks for reusable logic
- Keep components small and focused (single responsibility)

### Naming Conventions
- **Components**: PascalCase (e.g., `PortfolioCard.tsx`)
- **Utilities/Hooks**: camelCase (e.g., `usePortfolioData.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_FEATURED_ITEMS`)
- **CSS Classes**: Use Tailwind utility classes, custom classes in kebab-case

### File Organization
```
src/
  ├── components/     # Reusable UI components
  │   └── ui/        # Radix UI wrapper components
  ├── pages/          # Page components
  ├── lib/            # Data loading utilities (tina.ts)
  ├── data/           # Data files
  │   └── backup/    # Old JSON files (deprecated)
  ├── styles/         # CSS files (theme.css)
  └── App.tsx         # Main app with routing

content/              # All CMS-managed content
  ├── portfolio/      # Portfolio items (42 markdown files)
  ├── profile/        # CV/profile data
  └── posts/          # Blog posts (optional)

tina/                 # Tina CMS configuration
  ├── config.ts       # Schema definitions
 __generated__/  # Auto-generated (gitignored)  └─

public/               # Static assets
  ├── portfolio-images/  # Portfolio images
  └── admin/          # Tina admin (generated, gitignored)
```

## Development Workflow

### Git Workflow - Commit as You Go
**IMPORTANT**: Commit changes incrementally as you complete logical units of work.

#### Commit Guidelines:
1. **Commit frequently**: After completing each logical change or fix
2. **Small, focused commits**: Each commit should represent one change
3. **Descriptive messages**: Use clear, concise commit messages
4. **Fix mistakes**: If you need to fix something in the last commit:
   ```bash
   # Undo last commit but keep changes
   git reset --soft HEAD~1
   # Make your fixes
   git add .
   git commit -m "Fixed: [description]"
   ```

#### When to Commit:
- ✅ After adding a new feature or component
- ✅ After fixing a bug
- ✅ After updating documentation
- ✅ After refactoring code
- ✅ Before making major changes (safety checkpoint)
- ✅ After successful test runs

#### Commit Message Format:
```
[Type]: Brief description

Examples:
- feat: Add portfolio filtering functionality
- fix: Correct lightbox navigation behavior
- docs: Update Tina CMS setup guide
- refactor: Simplify portfolio card component
- style: Fix accessibility contrast issues
- test: Add keyboard navigation tests
```

#### Co-Author Attribution

**ALWAYS add the requester as a co-author on commits** to ensure proper attribution.

**How to identify the requester**:
1. **Git config**: Check `git config user.name` and `git config user.email`
2. **GitHub user**: If running in GitHub Codespaces, use the logged-in GitHub user
3. **GitHub Actions**: When triggered by a comment/issue, use the comment author's details
4. **Manual request**: When someone asks you to make changes, use their information

**Co-Author Format**:
```bash
git commit -m "Type: Brief description

Co-authored-by: Name <email@example.com>"
```

**Example**:
```bash
git commit -m "feat: Add portfolio search functionality

Co-authored-by: Gordon Beeming <me@gordonbeeming.com>"
```

**Multiple co-authors**:
```bash
git commit -m "feat: Add portfolio search functionality

Co-authored-by: Gordon Beeming <me@gordonbeeming.com>
Co-authored-by: Other Contributor <other@example.com>"
```

**When to add co-authors**:
- ✅ When implementing a requested feature
- ✅ When fixing a reported bug
- ✅ When making changes based on feedback
- ✅ When pair programming or collaborating
- ❌ Not needed for automated updates (dependency bumps, etc.)
- ❌ Not needed for your own self-initiated refactoring (unless requested)

### Before Making Changes
1. Check existing patterns in the codebase
2. Review documentation in `/docs/` for project requirements
3. **Review accessibility requirements** - ensure changes maintain or improve accessibility
4. Ensure changes align with portfolio website goals

### Making Changes
1. Make minimal, surgical changes - change only what's necessary
2. Follow existing code patterns and conventions
3. **Implement accessibility best practices** - semantic HTML, ARIA, keyboard support
4. Update relevant documentation if making structural changes
5. Test changes locally before committing

### After Making Changes
1. Run linters: `npm run lint`
2. Build the project: `npm run build`
3. Test in dev mode: `npm run dev`
4. **For UI changes**: Take before/after screenshots manually, save to `tasks/images/`
5. Document significant changes in `/tasks/` following naming conventions
6. **Include screenshots in task docs** with relative image paths
7. **Commit your changes with co-author attribution**:
   ```bash
   git add . && git commit -m "Type: Description

   Co-authored-by: Name <email@example.com>"
   ```

## Testing and Quality

### Manual Testing
Always test your changes thoroughly before committing.

#### Screenshots for Task Documentation:
**For UI changes, manually capture screenshots**:
1. Run the dev server: `npm run dev`
2. Take "before" screenshot of current state
3. Make your changes
4. Take "after" screenshot
5. Save both to `tasks/images/` with task-numbered names
6. Reference in task documentation with relative paths

**Example**:
```markdown
## Visual Changes

Before:
![Before lightbox update](./images/20251009-01-before-lightbox.png)

After:
![After lightbox update](./images/20251009-01-after-lightbox.png)
```

### Before Committing
- Ensure no TypeScript errors: `npm run build`
- Run ESLint: `npm run lint`
- Test affected functionality manually in the browser
- **For UI changes**: Capture before/after screenshots in `tasks/images/`
- **Test keyboard navigation** - ensure all interactive elements are accessible
- **Test with screen reader** - verify announcements are correct
- Verify responsive design if UI changes were made
- **Check color contrast** - ensure WCAG AA compliance

### Edge Cases to Consider
- Missing or failed image loads
- Empty states (no portfolio items)
- Long text content (titles, descriptions)
- Various screen sizes and devices
- Slow network conditions
- **Keyboard-only navigation**
- **Screen reader usage**
- **High contrast mode**
- **Reduced motion preferences**

## Important Project-Specific Patterns

### Featured Items Logic
- Featured items require `featurePosition` as a **number** (not string)
- Filter: `typeof item.featurePosition === 'number'`
- Sort: `(a, b) => (a.featurePosition ?? 0) - (b.featurePosition ?? 0)`
- Homepage lightbox only cycles through featured items
- Portfolio page cycles through all items

### Data Loading
- Uses Vite's `import.meta.glob` with `eager: true` and `query: '?raw'`
- Parses markdown with `gray-matter` library (NEVER custom parsers)
- Handles async data loading in App.tsx
- Pages must handle null states during loading

### Common Pitfalls
- ❌ Don't use custom YAML parsers - use `gray-matter`
- ❌ Don't add `@vitejs/plugin-react` - conflicts with Tailwind Vite plugin
- ❌ Don't commit `public/admin/` or `tina/__generated__/` files
- ✅ Featured items must have `featurePosition` as number, not string
- ✅ Always check glob patterns match content folder structure
- ✅ Ensure Vite config has buffer and process.env polyfills

## Important Reminders

### ⚠️ Critical Guidelines
1. **Commit as you go** - Make incremental commits after each logical change
2. **Fix commits if needed** - Use `git reset --soft HEAD~1` to undo last commit and fix
3. **Add co-authors to commits** - Always attribute the requester (see Git Workflow section)
4. **All files in project directory** - Never write outside project root
5. **Keep these instructions updated** - Especially during major changes
6. **All docs in `/docs`** - Except standard GitHub files
7. **Task files in `/tasks`** - Use date prefix `YYYYMMDD-XX-topic.md` format
8. **Task screenshots in `/tasks/images/`** - Manual before/after for UI changes
9. **Minor tasks update existing files** - Don't create duplicate task files
10. **Document major changes** - Create task files for significant work
11. **Accessibility is mandatory** - Every change must be accessible
12. **Test before committing** - Build and manually test functionality in browser
13. **Tina generated files are ignored** - Never commit `tina/__generated__/` or `public/admin/`
14. **Use gray-matter for parsing** - Never write custom YAML parsers

### When to Update These Instructions
- Adding new tools or dependencies
- Changing project structure
- Establishing new coding patterns
- Adding new development workflows
- Changing documentation structure
- Adding deployment configurations

---

**Last Updated**: 2025-10-09
**Version**: 1.0.0
**Project**: Tiani Beeming Portfolio
**CMS Status**: ✅ Tina CMS v2.9.0 Integrated
**Deployment**: ✅ GitHub Pages via GitHub Actions
**Accessibility Standard**: WCAG 2.1 AA
**Testing**: Manual testing and validation
**Screenshots**: Manual capture in tasks/images/
**Attribution**: Co-author commits for proper attribution
