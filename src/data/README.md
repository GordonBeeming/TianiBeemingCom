# Data Directory

⚠️ **DEPRECATED**: The JSON files in this directory have been migrated to Tina CMS.

## New Location

Content is now managed through Tina CMS and stored as markdown files:

- **Portfolio Items**: `/content/portfolio/*.md`
- **Profile/CV Data**: `/content/profile/cv-data.md`

## Backup

The original JSON files have been backed up to `./backup/` for reference.

## How to Edit Content

See the [Tina CMS Guide](../../TINA_CMS_GUIDE.md) for instructions on editing content through:
1. Tina CMS Admin UI at `http://localhost:5173/admin/index.html`
2. Direct markdown file editing in `/content/`

## Migration Notes

All data from the JSON files has been successfully converted to markdown format with proper frontmatter. The application now loads data from these markdown files at runtime.