# Quick Reference - Common Commands

## Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

## Building & Testing

```bash
# Build static site for GitHub Pages
npm run build

# Test the static build locally
npm run serve

# Lint code
npm run lint
```

## Git & Deployment

```bash
# Initial setup
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main

# Regular updates
git add .
git commit -m "Your commit message"
git push

# Check status
git status

# View commit history
git log --oneline
```

## GitHub Pages URLs

### Repository Page
```
https://USERNAME.github.io/REPO-NAME/
```

### User/Organization Page
```
https://USERNAME.github.io/
```

### Custom Domain
```
https://www.yourdomain.com/
```

## File Structure

```
rock-band-portal/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── app/
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page
├── components/
│   ├── Navigation.tsx          # Navigation bar
│   ├── Hero.tsx                # Hero section
│   ├── About.tsx               # About section
│   ├── Music.tsx               # Music section
│   ├── Tour.tsx                # Tour dates
│   ├── Gallery.tsx             # Photo gallery
│   ├── News.tsx                # News section
│   ├── Contact.tsx             # Contact form
│   └── Footer.tsx              # Footer
├── lib/
│   └── utils.ts                # Utility functions
├── public/
│   └── .nojekyll               # GitHub Pages config
├── out/                        # Build output (generated)
├── next.config.ts              # Next.js config
├── tailwind.config.ts          # Tailwind config
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## Configuration Files

### next.config.ts
- Static export configuration
- Base path settings
- Image optimization settings

### .github/workflows/deploy.yml
- Automated deployment workflow
- Triggers on push to main
- Builds and deploys to GitHub Pages

### package.json
- Project dependencies
- Build scripts
- Project metadata

## Environment Variables

### For Repository Subdirectory Deployment

Create `.env.local`:
```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name
```

Or set in GitHub Actions workflow:
```yaml
NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
```

## Customization Quick Tips

### Change Colors
Edit `tailwind.config.ts` and `app/globals.css`:
- Primary/Accent: `--accent`
- Background: `--background`
- Text: `--foreground`

### Update Content
- **Hero**: `components/Hero.tsx`
- **About**: `components/About.tsx`
- **Music**: `components/Music.tsx`
- **Tour**: `components/Tour.tsx`
- **Gallery**: `components/Gallery.tsx`
- **News**: `components/News.tsx`
- **Contact**: `components/Contact.tsx`

### Add Images
1. Place in `public/images/` directory
2. Reference as `/images/filename.jpg`
3. Update component imports

### Change Fonts
Edit `app/layout.tsx`:
```typescript
import { YourFont } from "next/font/google";
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next out node_modules
npm install
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Git Issues
```bash
# Reset to last commit
git reset --hard HEAD

# Discard local changes
git checkout -- .

# View remote URL
git remote -v
```

## Useful Links

- **GitHub Pages Docs**: https://docs.github.com/pages
- **Next.js Static Export**: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Framer Motion**: https://www.framer.com/motion/

## Support Files

- `README.md` - Full project documentation
- `DEPLOYMENT.md` - Detailed deployment guide
- `GITHUB_PAGES_SETUP.md` - Quick setup guide
- `DEPLOYMENT_CHECKLIST.md` - Pre-deployment checklist

## Quick Deployment Steps

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Settings → Pages → Source: GitHub Actions

3. **Wait for deployment**
   - Check Actions tab for progress

4. **Visit your site**
   - URL shown in Pages settings

---

**Pro Tip**: Bookmark this file for quick reference! 📌

