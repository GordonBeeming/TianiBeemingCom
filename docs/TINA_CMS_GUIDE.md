# Tiani Beeming Portfolio - Tina CMS Integration

This project has been fully converted to use **Tina.io CMS** for content management. All portfolio items and CV/profile data are now managed through Tina CMS using markdown files with frontmatter.

## What Changed

### Before (JSON-based)
- Content was stored in `/src/data/portfolioData.json` and `/src/data/cvData.json`
- Content was imported directly into React components
- Editing required manual JSON file editing

### After (Tina CMS)
- Portfolio items are stored as individual markdown files in `/content/portfolio/`
- Profile/CV data is stored in `/content/profile/cv-data.md`
- Content can be edited through Tina's visual editor
- Content is managed through markdown files with YAML frontmatter

## Content Structure

### Portfolio Items
Each portfolio item is a separate markdown file in `/content/portfolio/` with this structure:

```markdown
---
title: "Portfolio Item Title"
imageSrc: "/portfolio-images/image.jpg"
labels:
  - "Label 1"
  - "Label 2"
featurePosition: 1  # Optional: Set to feature on homepage (1, 2, 3, etc.)
---

Description of the portfolio item goes here in the markdown body.
```

### Profile/CV Data
The profile data is stored in `/content/profile/cv-data.md` with this structure:

```markdown
---
name: "Your Name"
contact:
  email: "email@example.com"
  phone: "+1234567890"
socialMedia:
  - name: "LinkedIn"
    url: "https://linkedin.com/..."
    handle: "username"
careerHistory:
  - role: "Job Title"
    company: "Company Name"
    period: "Jan 2020 - Present"
    responsibilities:
      - "Responsibility 1"
      - "Responsibility 2"
skills:
  - "Skill 1"
  - "Skill 2"
languages:
  - "English"
education:
  - qualification: "Degree Name"
    institution: "School Name"
    year: "2020"
    details:
      - "Detail 1"
---

Your bio/summary text goes here in the markdown body.
```

## Development

### Running the Development Server

```bash
# Standard development (recommended)
npm run dev
```

This starts the Vite dev server on `http://localhost:5173`

### Running with Tina CMS Admin UI

To use the Tina CMS visual editor:

```bash
# Development with Tina CMS admin interface
npm run dev:tina
```

This will start:
- Tina CMS GraphQL server on `http://localhost:4001`
- Vite dev server on `http://localhost:5173`
- Access the CMS at `http://localhost:5173/admin/index.html`

### Building for Production

```bash
# Build the static site
npm run build

# Preview the production build
npm run preview
```

## Editing Content

### Option 1: Using Tina CMS Admin UI (Visual Editor)

1. Run `npm run dev:tina`
2. Open `http://localhost:5173/admin/index.html` in your browser
3. Navigate through the CMS interface to edit:
   - **Portfolio Items**: Add, edit, or delete portfolio pieces
   - **Profile & CV Data**: Update your bio, career history, skills, etc.
4. Changes are saved to markdown files in the `/content` directory

### Option 2: Direct File Editing

You can directly edit the markdown files in:
- `/content/portfolio/` - Individual portfolio items
- `/content/profile/cv-data.md` - Your profile and CV data

The app will automatically reload and display your changes.

## Adding New Portfolio Items

### Via Tina CMS Admin

1. Go to `http://localhost:5173/admin/index.html`
2. Navigate to "Portfolio Items"
3. Click "Add New Portfolio Item"
4. Fill in the form and save

### Manually

Create a new file in `/content/portfolio/your-item-name.md`:

```markdown
---
title: "Your New Item"
imageSrc: "/portfolio-images/your-image.jpg"
labels:
  - "Category 1"
  - "Category 2"
---

Description of your new portfolio item.
```

## Image Management

1. Add images to `/public/portfolio-images/`
2. Reference them in your markdown files using: `/portfolio-images/filename.jpg`
3. Images are automatically optimized during the build process

## Tina Cloud (Optional)

To enable collaborative editing and production CMS access:

1. Sign up at [tina.io](https://tina.io)
2. Create a new project
3. Get your Client ID and Token
4. Add to your environment variables:
   ```
   NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
   TINA_TOKEN=your-token
   ```
5. Run `npm run build:tina` to generate the necessary files

## Tech Stack

- **Content Management**: Tina CMS
- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router
- **UI Components**: Radix UI + Custom Components

## Data Loading

The application uses a custom data loader (`src/lib/tina.ts`) that:
- Reads markdown files at runtime using Vite's glob import
- Parses YAML frontmatter
- Converts markdown content to structured data
- Works both in development and production builds

## Benefits of This Setup

✅ **Easy Content Management**: Edit content through a visual interface or markdown files
✅ **Type-Safe**: Full TypeScript support with generated types
✅ **Version Control**: All content is in Git-friendly markdown files
✅ **Fast Development**: Hot module replacement for instant updates
✅ **SEO-Friendly**: Content is part of the static build
✅ **Flexible**: Edit locally or collaborate via Tina Cloud

## Troubleshooting

### Tina server won't start
- Make sure ports 4001 and 5173 are available
- Try stopping other development servers
- Run `npm run kill` to free up ports

### Content not updating
- Make sure you saved the markdown file
- Check the browser console for errors
- Restart the dev server

### Images not showing
- Verify images are in `/public/portfolio-images/`
- Check the image path in your markdown file
- Ensure the path starts with `/`

## Support

For Tina CMS documentation, visit: [tina.io/docs](https://tina.io/docs)

For project-specific issues, check the repository's issue tracker.