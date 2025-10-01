# 🎂 Tiani Beeming Portfolio

A beautiful portfolio website for Tiani Beeming, professional pastry chef and cake decorator, showcasing her stunning cake designs and professional experience.

## ✨ Features

- 📸 **Portfolio Gallery** - 41 beautifully showcased cake designs
- ⭐ **Featured Items** - Homepage highlighting of top 3 designs
- 📝 **Resume/CV** - Complete professional history
- 📞 **Contact Information** - Easy ways to get in touch
- 🎨 **Responsive Design** - Beautiful on all devices
- 🔄 **CMS Powered** - Content managed through Tina.io CMS

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit: http://localhost:5173
```

### With CMS Admin UI
```bash
# Start with Tina CMS visual editor
npm run dev:tina

# Access admin at: http://localhost:5173/admin/index.html
```

### Production Build
```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📚 Documentation

### For Users & Content Editors
- 📖 **[Quick Start Guide](./docs/QUICK_START.md)** - Get started in 3 steps
- 📘 **[Tina CMS Guide](./docs/TINA_CMS_GUIDE.md)** - Complete usage guide
- 📁 **[Documentation Index](./docs/README.md)** - All available docs

### For Developers
- 🤖 **[Copilot Instructions](./.github/copilot-instructions.md)** - Project patterns and guidelines
- 📋 **[Task Summaries](./tasks/README.md)** - Conversion task records

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4
- **Routing**: React Router 7
- **CMS**: Tina.io
- **UI Components**: Radix UI

## 📂 Project Structure

```
/content                    # Content managed by Tina CMS
├── /portfolio/            # 41 portfolio items (markdown)
└── /profile/              # CV/profile data (markdown)

/src
├── /lib/tina.ts          # Data loading utilities
├── /pages/               # Page components
├── /components/          # Reusable components
└── App.tsx               # Main application

/public
└── /portfolio-images/    # Portfolio images

/docs                      # User documentation
/tasks                     # Task completion records
```

## 📝 Content Editing

### Direct File Editing
Edit markdown files in `/content/`:
- Portfolio items: `/content/portfolio/*.md`
- CV/Profile: `/content/profile/cv-data.md`

### Visual Editor
Use Tina CMS admin interface:
```bash
npm run dev:tina
# Visit: http://localhost:5173/admin/index.html
```

## 🎯 Key Features

### Portfolio Management
- 41 unique cake designs
- Categories and labels for filtering
- Featured items on homepage
- Lightbox gallery view

### Professional CV
- Complete career history
- Skills and education
- Social media links
- Downloadable PDF resume

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Accessible navigation
- Fast loading

## 🔧 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run dev:tina` | Start with CMS admin UI |
| `npm run build` | Build for production |
| `npm run build:tina` | Build with Tina types |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 🆘 Troubleshooting

### Common Issues

**Dev server won't start?**
- Check ports 5173 and 4001 are available
- Try `npm run kill` to free ports

**Content not updating?**
- Save your markdown file
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

**Build errors?**
- Clear cache: `rm -rf node_modules/.vite`
- Reinstall: `npm install`

See [Quick Start Guide](./docs/QUICK_START.md) for more help.

## 📄 License

This project template is based on GitHub's Spark Template, licensed under the MIT license.

Portfolio content © Tiani Beeming. All rights reserved.

## 🎉 Status

✅ **Fully Operational**
- All pages working
- 41 portfolio items
- 3 featured items
- CMS integrated
- Production ready

---

**Built with ❤️ for showcasing amazing cake designs**
