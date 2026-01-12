# GitHub Pages Deployment Guide

This guide explains how to deploy the Rock Band Artist Portal to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed locally
- Repository created on GitHub

## Deployment Options

### Option 1: Custom Domain or Username.github.io (Recommended)

If you're deploying to:
- A custom domain (e.g., `www.therenegades.com`)
- Your user/organization site (e.g., `username.github.io`)

**No additional configuration needed!** The site is already configured for this.

### Option 2: Repository Subdirectory (e.g., username.github.io/repo-name)

If deploying to a repository page (e.g., `username.github.io/rock-band-portal`):

1. **Update GitHub Actions workflow** (`.github/workflows/deploy.yml`):
   
   Uncomment line 45 and update it:
   ```yaml
   NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
   ```

2. **For local testing**, set the environment variable:
   ```bash
   export NEXT_PUBLIC_BASE_PATH=/your-repo-name
   npm run build
   npm run serve
   ```

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Rock Band Portal"

# Add remote (replace with your repository URL)
git remote add origin https://github.com/username/repo-name.git

# Push to main branch
git branch -M main
git push -u origin main
```

### 2. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select:
   - Source: **GitHub Actions**
4. Save the settings

### 3. Automatic Deployment

The GitHub Actions workflow will automatically:
- Trigger on every push to the `main` branch
- Install dependencies
- Build the static site
- Deploy to GitHub Pages

You can monitor the deployment:
1. Go to the **Actions** tab in your repository
2. Watch the "Deploy to GitHub Pages" workflow

### 4. Access Your Site

After successful deployment (usually 1-3 minutes):

- **Custom domain**: Configure in Settings → Pages → Custom domain
- **Username site**: `https://username.github.io`
- **Repository site**: `https://username.github.io/repo-name`

## Local Testing

Test the static build locally before deploying:

```bash
# Build the static site
npm run build

# Serve the static files
npm run serve

# Open http://localhost:3000 in your browser
```

The `out` directory contains the static files that will be deployed.

## Custom Domain Setup

To use a custom domain (e.g., `www.therenegades.com`):

1. **Add CNAME file** to `public/` directory:
   ```
   www.therenegades.com
   ```

2. **Configure DNS** with your domain provider:
   - Add a CNAME record pointing to `username.github.io`
   - Or add A records pointing to GitHub's IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

3. **Enable HTTPS** in GitHub Pages settings (recommended)

## Troubleshooting

### Build Fails

- Check the Actions tab for error messages
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility (20.x recommended)

### 404 Errors

- Ensure GitHub Pages source is set to "GitHub Actions"
- Check that the workflow completed successfully
- Verify the `basePath` configuration matches your deployment type

### Images Not Loading

- All images should use relative paths or be in the `public/` directory
- External images (Unsplash) require internet connection
- For production, replace with local images in `public/images/`

### Styles Not Applied

- Clear browser cache
- Check browser console for errors
- Verify all CSS files are being generated in the `out` directory

## Environment Variables

For repository subdirectory deployment:

```bash
# .env.local (for local testing)
NEXT_PUBLIC_BASE_PATH=/your-repo-name
```

## Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the site
npm run build

# The 'out' directory contains static files
# Upload these to any static hosting service
```

## Updating the Site

Simply push changes to the main branch:

```bash
git add .
git commit -m "Update content"
git push
```

GitHub Actions will automatically rebuild and redeploy.

## Performance Optimization

For production:

1. **Replace placeholder images** with optimized local images
2. **Minimize external dependencies**
3. **Enable caching** in your hosting configuration
4. **Use WebP format** for images when possible

## Support

For issues or questions:
- Check GitHub Actions logs
- Review Next.js static export documentation
- Verify GitHub Pages settings

---

**Note**: The first deployment may take a few minutes. Subsequent deployments are usually faster.

