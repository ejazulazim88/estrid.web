# GitHub Pages Deployment Flow

## Overview

This document explains how the automated deployment process works for the Rock Band Portal.

## Deployment Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     LOCAL DEVELOPMENT                            │
├─────────────────────────────────────────────────────────────────┤
│  1. Developer makes changes to code                              │
│  2. Test locally: npm run dev                                    │
│  3. Build locally: npm run build                                 │
│  4. Test static build: npm run serve                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ git push origin main
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        GITHUB REPOSITORY                         │
├─────────────────────────────────────────────────────────────────┤
│  • Code stored in main branch                                    │
│  • Triggers GitHub Actions workflow                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Workflow triggered
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      GITHUB ACTIONS (CI/CD)                      │
├─────────────────────────────────────────────────────────────────┤
│  BUILD JOB:                                                      │
│  1. Checkout code                                                │
│  2. Setup Node.js 20                                             │
│  3. Install dependencies (npm ci)                                │
│  4. Build static site (npm run build)                            │
│  5. Upload artifact (out/ directory)                             │
│                                                                  │
│  DEPLOY JOB:                                                     │
│  6. Download artifact                                            │
│  7. Deploy to GitHub Pages                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Deployment complete
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         GITHUB PAGES                             │
├─────────────────────────────────────────────────────────────────┤
│  • Static files served via CDN                                   │
│  • HTTPS enabled                                                 │
│  • Global distribution                                           │
│  • Available at: username.github.io/repo-name                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Users access
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                            END USERS                             │
├─────────────────────────────────────────────────────────────────┤
│  • View site in browser                                          │
│  • Fast loading via CDN                                          │
│  • Responsive on all devices                                     │
└─────────────────────────────────────────────────────────────────┘
```

## Detailed Workflow Steps

### 1. Code Changes (Local)

```bash
# Developer workflow
npm run dev          # Develop and test
npm run build        # Build static site
npm run serve        # Test static build
git add .            # Stage changes
git commit -m "..."  # Commit changes
git push             # Push to GitHub
```

### 2. GitHub Actions Trigger

When code is pushed to `main` branch:
- `.github/workflows/deploy.yml` is triggered
- Workflow runs automatically
- No manual intervention needed

### 3. Build Process

```yaml
# Simplified workflow steps
- Checkout code from repository
- Setup Node.js environment
- Install dependencies (npm ci)
- Build Next.js static export
- Generate files in out/ directory
```

**Build Output:**
```
out/
├── index.html           # Home page
├── 404.html            # Error page
├── _next/              # Next.js assets
│   ├── static/         # CSS, JS bundles
│   └── ...
└── ...
```

### 4. Deployment

```yaml
# Deployment steps
- Upload build artifact
- Deploy to GitHub Pages
- Update live site
```

### 5. Live Site

- **URL**: `https://username.github.io/repo-name/`
- **CDN**: Distributed globally
- **HTTPS**: Automatically enabled
- **Updates**: Automatic on each push

## Configuration Files

### next.config.ts

```typescript
{
  output: 'export',           // Enable static export
  basePath: basePath,         // Set base path
  images: { unoptimized: true }, // Disable image optimization
  trailingSlash: true,        // Add trailing slashes
  assetPrefix: basePath       // Set asset prefix
}
```

### .github/workflows/deploy.yml

```yaml
on:
  push:
    branches: ["main"]        # Trigger on main branch

jobs:
  build:                      # Build job
    - Install dependencies
    - Build static site
    - Upload artifact
  
  deploy:                     # Deploy job
    - Download artifact
    - Deploy to Pages
```

## Deployment Timeline

```
Push to GitHub
    │
    ├─ 0:00 - Workflow triggered
    │
    ├─ 0:30 - Dependencies installed
    │
    ├─ 1:00 - Build started
    │
    ├─ 1:30 - Build completed
    │
    ├─ 2:00 - Artifact uploaded
    │
    ├─ 2:30 - Deployment started
    │
    └─ 3:00 - Site live! ✅
```

**Average deployment time**: 2-3 minutes

## Environment Variables

### Development
```bash
# .env.local (not committed)
NEXT_PUBLIC_BASE_PATH=/repo-name
```

### Production (GitHub Actions)
```yaml
env:
  NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
  NODE_ENV: production
```

## Deployment Types

### Type 1: User/Organization Site
- **Repository**: `username.github.io`
- **URL**: `https://username.github.io/`
- **Base Path**: None (empty)
- **Configuration**: Default (no changes needed)

### Type 2: Repository Site
- **Repository**: `repo-name`
- **URL**: `https://username.github.io/repo-name/`
- **Base Path**: `/repo-name`
- **Configuration**: Set `NEXT_PUBLIC_BASE_PATH` in workflow

### Type 3: Custom Domain
- **Repository**: Any name
- **URL**: `https://www.yourdomain.com/`
- **Base Path**: None (empty)
- **Configuration**: Add CNAME file, configure DNS

## Monitoring Deployment

### GitHub Actions Tab
1. Go to repository → Actions
2. View workflow runs
3. Check build logs
4. Monitor deployment status

### Status Indicators
- 🟡 **Yellow dot**: In progress
- ✅ **Green checkmark**: Success
- ❌ **Red X**: Failed

### Logs
- Click on workflow run
- View detailed logs
- Debug any issues

## Rollback Process

If deployment fails or has issues:

```bash
# Option 1: Revert last commit
git revert HEAD
git push

# Option 2: Reset to previous commit
git reset --hard <commit-hash>
git push --force

# Option 3: Re-run workflow
# Go to Actions → Failed workflow → Re-run jobs
```

## Performance Optimization

### Build Optimization
- Static HTML generation
- CSS/JS minification
- Asset optimization
- Tree shaking

### Delivery Optimization
- GitHub CDN
- Global distribution
- HTTPS/2
- Caching headers

## Security

### HTTPS
- Automatically enabled
- Free SSL certificate
- Enforced by default

### Content Security
- Static files only
- No server-side code
- No database
- Client-side only

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Test locally
npm run build
npm run serve

# Deploy
git push
```

### Monitoring
- Check Actions tab regularly
- Monitor site uptime
- Review error logs
- Test after each deployment

---

**Next Steps:**
1. Review [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) for setup
2. Check [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) before deploying
3. Read [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide

