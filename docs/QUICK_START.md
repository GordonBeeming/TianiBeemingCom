# 🚀 Quick Start Guide - Tina CMS

## ⚡ Get Started in 3 Steps

### 1️⃣ Development
```bash
npm run dev
# Opens: http://localhost:5173
```

### 2️⃣ Edit Content
**Option A - Direct Editing:**
```bash
# Edit files in:
/content/portfolio/*.md        # Portfolio items
/content/profile/cv-data.md    # Your CV/bio
```

**Option B - Visual Editor:**
```bash
npm run dev:tina
# Opens admin at: http://localhost:5173/admin/index.html
```

### 3️⃣ Deploy
```bash
npm run build
# Deploys to: /dist
```

---

## 📝 Quick Edits

### Add Portfolio Item
Create `/content/portfolio/my-new-item.md`:
```markdown
---
title: "My New Cake"
imageSrc: "/portfolio-images/new-cake.jpg"
labels:
  - "Birthday Cakes"
  - "Buttercream"
---

Description of your amazing new cake!
```

### Feature on Homepage
Add to any portfolio item:
```yaml
featurePosition: 1  # Use 1, 2, or 3
```

### Update CV
Edit `/content/profile/cv-data.md`:
- Change frontmatter for structured data
- Edit body text for your bio

---

## 🔥 Quick Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run dev:tina` | Start with Tina admin UI |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 📂 Where Things Are

| Content Type | Location |
|--------------|----------|
| Portfolio Items | `/content/portfolio/*.md` |
| CV/Profile Data | `/content/profile/cv-data.md` |
| Images | `/public/portfolio-images/` |
| Old JSON Backups | `/src/data/backup/` |

---

## 🐛 Troubleshooting

**Pages not loading?**
```bash
# Check browser console for errors
# Restart dev server
npm run dev
```

**Content not updating?**
```bash
# Save your file and refresh browser
# Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

**Featured items not showing?**
- Check `featurePosition: 1` is a number (no quotes)
- Must be in frontmatter section (between `---` markers)

---

## 📚 Full Documentation

- **FINAL_COMPLETE_SUMMARY.md** - Complete overview
- **TINA_CMS_GUIDE.md** - Detailed usage guide
- **TINA_CONVERSION_SUMMARY.md** - What changed
- **FEATURED_ITEMS_VERIFICATION.md** - Featured items info
- **CONTACT_RESUME_FIX.md** - Contact/Resume fix details

---

## ✅ System Status

✅ **All Pages Working**  
✅ **41 Portfolio Items**  
✅ **3 Featured Items**  
✅ **CV Data Loading**  
✅ **Production Ready**  

---

## 🆘 Need Help?

1. Check documentation files listed above
2. Look at existing markdown files for examples
3. Check browser console for error messages
4. Restart dev server if things seem stuck

---

**You're all set! Happy editing! 🎂✨**