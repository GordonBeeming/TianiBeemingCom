# Gray-Matter Integration - Debugging Guide

## Current Status

✅ **Build**: Successful  
✅ **Dev Server**: Running without errors  
✅ **Gray-Matter**: Installed and configured  

## If You're Seeing Errors

The error message "error parsing portfolio markdown at ../../content/portf..." suggests gray-matter might be having issues in the browser. Here's how to debug:

### Step 1: Check Browser Console

1. Open http://localhost:5173
2. Press F12 (or right-click > Inspect)
3. Go to the Console tab
4. Look for any red error messages
5. Share the **complete error message** including the stack trace

### Step 2: Look for Debug Logs

You should see these console logs (if working correctly):
```
Portfolio files loaded: 41
Processing: ../../content/portfolio/[filename].md, content type: string
Loaded 41 portfolio items
```

### Step 3: Test Gray-Matter Directly

Add this line to `/src/App.tsx` (after the imports):
```typescript
import './test-gray-matter'
```

Then check the console for gray-matter test results.

### Step 4: Clear Cache

Sometimes Vite's cache causes issues:
```bash
# Stop the dev server (Ctrl+C)
rm -rf node_modules/.vite
npm run dev
```

## Possible Issues & Solutions

### Issue 1: "matter is not a function"
**Solution**: Gray-matter import might need adjustment:
```typescript
// Try this instead:
import * as grayMatter from 'gray-matter'
const matter = grayMatter.default || grayMatter
```

### Issue 2: Content is undefined
**Solution**: Vite glob import might not be working:
- Check if files exist in `/content/portfolio/`
- Verify file paths are correct

### Issue 3: YAML parsing errors
**Solution**: Check markdown file format:
```markdown
---
title: "Item Title"   <-- Must have quotes
imageSrc: "/image.jpg"
labels:
  - "Label 1"         <-- Array items with dashes
featurePosition: 1    <-- Number without quotes
---

Body content here.
```

## Alternative: Rollback to Custom Parser

If gray-matter continues to cause issues, we can revert to a working custom parser. The custom parser was simpler and worked for this specific use case.

To rollback:
1. See `/tasks/FEATURED_ITEMS_VERIFICATION.md` for the original parser
2. It handled numbers, booleans, and basic nested structures
3. Less robust but worked reliably for this project

## Next Steps

Please provide:
1. ✅ Exact error message from browser console
2. ✅ Screenshot of the error (if possible)
3. ✅ Any console.log messages you see
4. ✅ Whether the pages load at all (even if showing errors)

Once I see the exact error, I can provide a targeted fix.

## Quick Test Commands

```bash
# Test build (should succeed)
npm run build

# Test dev server
npm run dev

# Clear everything and restart
rm -rf node_modules/.vite dist
npm run dev
```

## Emergency Fix

If you need the site working immediately, I can provide a rollback to the working custom parser. Just let me know!

---

**Status**: Waiting for browser console error details
**Build Status**: ✅ Passing
**Next**: Need exact error message to proceed