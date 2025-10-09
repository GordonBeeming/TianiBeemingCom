# Tina CMS Deployment Setup for GitHub Pages

## ✅ CONFIRMED: Tina CMS is Merged to Main

Your Tina CMS setup has been successfully merged to main via PR #34 (commit `30e1dba`).

The `convert-to-tinacms` branch has been merged and all Tina functionality is now on the main branch:
- ✅ Content folder with 41+ portfolio items as markdown
- ✅ Tina configuration in `tina/config.ts`
- ✅ Build scripts (`dev:tina` and `build:tina`) in package.json
- ✅ Public admin folder structure

## Summary of Changes

The GitHub Actions workflow has been updated to properly build and deploy the TinaCMS admin interface alongside your portfolio site.

## What Was Changed

### `.github/workflows/deploy.yml`

Added a new build step before the main build:

```yaml
- name: Build Tina Admin
  run: npm run build:tina
  env:
    NEXT_PUBLIC_TINA_CLIENT_ID: ${{ secrets.NEXT_PUBLIC_TINA_CLIENT_ID }}
    TINA_TOKEN: ${{ secrets.TINA_TOKEN }}
```

This ensures:
1. **Tina Admin Interface** is built to `public/admin/`
2. The admin interface is included when Vite builds the final site to `dist/`
3. Your `/admin` route will work on GitHub Pages

## Required GitHub Secrets

You need to add these two secrets to your GitHub repository:

### 1. `NEXT_PUBLIC_TINA_CLIENT_ID`
- **What it is**: Your Tina Cloud Client ID
- **Where to get it**: 
  1. Sign up at [tina.io](https://tina.io)
  2. Create a new project
  3. Go to project settings
  4. Copy the Client ID
- **How to add**: 
  - GitHub repo → Settings → Secrets and variables → Actions → New repository secret
  - Name: `NEXT_PUBLIC_TINA_CLIENT_ID`
  - Value: Your client ID from Tina Cloud

### 2. `TINA_TOKEN`
- **What it is**: Your Tina Cloud authentication token
- **Where to get it**: 
  1. In your Tina Cloud project dashboard
  2. Go to project settings → Tokens
  3. Generate a new token
  4. Copy the token (you'll only see it once!)
- **How to add**: 
  - GitHub repo → Settings → Secrets and variables → Actions → New repository secret
  - Name: `TINA_TOKEN`
  - Value: Your token from Tina Cloud

## Build Process

The updated workflow now follows this sequence:

1. **Checkout code** from the repository
2. **Setup Node.js** v20
3. **Install dependencies** (`npm install`)
4. **Build Tina Admin** (`npm run build:tina`)
   - Creates the admin interface in `public/admin/`
   - Uses your Tina Cloud credentials for authentication
5. **Build main site** (`npm run build`)
   - Vite builds the React app to `dist/`
   - Copies everything from `public/` (including `admin/`) to `dist/`
6. **Deploy to GitHub Pages** - Uploads the `dist/` folder

## Routing for GitHub Pages

For the `/admin` route to work properly on GitHub Pages, you may need to:

### Option 1: Using SPA Fallback (Recommended for GitHub Pages)

Create a `public/404.html` file that redirects to your main index:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Tiani Beeming Portfolio</title>
    <script>
      // Redirect all 404s to index.html to support SPA routing
      sessionStorage.setItem('redirect', window.location.pathname);
      window.location.replace('/');
    </script>
  </head>
  <body></body>
</html>
```

Then in your main `index.html`, add code to restore the path:

```html
<script>
  const redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    window.location.replace(redirect);
  }
</script>
```

### Option 2: Using Base Path

If your site is at `username.github.io/repo-name`, update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/repo-name/',  // Change this to match your repo name
  // ... rest of config
});
```

## Testing Locally

Before deploying, test that everything works locally:

```bash
# Install dependencies (if not done already)
npm install

# Build Tina admin interface
npm run build:tina

# Build the main site
npm run build

# Preview the production build
npm run preview

# Visit http://localhost:4173/admin to test the admin interface
```

## After Deployment

Once deployed, you can access:
- **Main site**: `https://yourusername.github.io/your-repo/`
- **Tina Admin**: `https://yourusername.github.io/your-repo/admin`

## Troubleshooting

### Admin page shows "Failed loading TinaCMS assets"

**Causes:**
- Tina Cloud credentials are missing or incorrect
- `build:tina` step didn't run successfully
- The `public/admin/` folder wasn't copied to `dist/`

**Solutions:**
1. Verify GitHub secrets are set correctly
2. Check GitHub Actions logs for build errors
3. Ensure `npm run build:tina` runs successfully locally

### 404 error when accessing `/admin`

**Causes:**
- GitHub Pages doesn't support SPA routing by default
- Missing 404.html fallback

**Solutions:**
1. Add the 404.html fallback (Option 1 above)
2. Or configure Vite base path (Option 2 above)
3. Ensure the admin folder exists in the deployed dist

### Admin interface loads but can't authenticate

**Causes:**
- Tina Cloud project not configured correctly
- Incorrect branch name in tina config

**Solutions:**
1. Check your Tina Cloud project settings
2. Verify the branch name in `tina/config.ts` matches your GitHub branch
3. Ensure your GitHub repo is connected to Tina Cloud

## Notes

- **Local development**: Use `npm run dev:tina` to run Tina CMS locally with the dev server
- **Tina Cloud is optional**: If you don't need the cloud features, you can run Tina in local-only mode
- **Content is in Git**: All your content is stored as markdown files in the `content/` folder, so it's version controlled
- **The admin interface needs the secrets**: Without them, the admin won't build properly for production use

## Next Steps

1. ✅ Update the workflow (already done)
2. ⏳ Add GitHub secrets (`NEXT_PUBLIC_TINA_CLIENT_ID` and `TINA_TOKEN`)
3. ⏳ (Optional) Add 404.html for SPA routing
4. ⏳ Push changes to trigger deployment
5. ⏳ Test the `/admin` route after deployment

