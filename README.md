# Rock Band Artist Portal - The Renegades

A modern, responsive single-page web portal for rock band musicians and artists, built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## 🎸 Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Smooth Animations**: Powered by Framer Motion for engaging user experience
- **Dark Theme**: Professional dark theme with bold accent colors
- **SEO Optimized**: Built-in SEO optimization with Next.js
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for fast loading times

## 📋 Sections

1. **Hero Section** - Full-screen hero with call-to-action buttons
2. **About Section** - Band story and statistics
3. **Music Section** - Discography showcase with album covers and track listings
4. **Tour Dates** - Upcoming shows with ticket links
5. **Photo Gallery** - Image gallery with lightbox functionality
6. **News Section** - Latest updates and announcements
7. **Contact Section** - Contact form and information
8. **Footer** - Social media links and newsletter signup

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Colors

Edit the color scheme in `tailwind.config.ts` and `app/globals.css`:

- Primary/Accent color: `--accent` (default: red #c74735)
- Background: `--background`
- Foreground: `--foreground`

### Content

Update content in the component files:

- **Hero**: `components/Hero.tsx`
- **About**: `components/About.tsx`
- **Music**: `components/Music.tsx`
- **Tour**: `components/Tour.tsx`
- **Gallery**: `components/Gallery.tsx`
- **News**: `components/News.tsx`
- **Contact**: `components/Contact.tsx`

### Images

Replace placeholder images with your own:

- Update image URLs in component files
- Use Next.js Image component for optimization
- Recommended image sizes:
  - Hero: 1920x1080px
  - Album covers: 800x800px
  - Gallery: 1200x800px

### Fonts

Current fonts (Google Fonts):
- **Body**: Inter
- **Headings**: Montserrat

To change fonts, edit `app/layout.tsx`

## 📱 Responsive Breakpoints

- Mobile: 320px - 767px
- Tablet: 768px - 1199px
- Desktop: 1200px+

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge

## 📦 Build for Production

### Static Export (GitHub Pages)

```bash
# Build static site
npm run build

# Test locally
npm run serve
```

The static files will be generated in the `out` directory.

### Server-Side Rendering

```bash
npm run build
npm run start
```

## 🚢 Deployment

### GitHub Pages (Configured & Ready!)

This project is **pre-configured for GitHub Pages deployment** with automatic CI/CD.

**Quick Deploy:**

1. Push code to GitHub:
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

2. Enable GitHub Pages:
   - Go to repository **Settings** → **Pages**
   - Set Source to **GitHub Actions**

3. Your site will be live at:
   - `https://username.github.io/repo-name` (repository page)
   - `https://username.github.io` (user/org page)
   - Custom domain (if configured)

**📖 Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

**Key Features:**
- ✅ Automatic deployment on push to main
- ✅ Static site generation (no server required)
- ✅ Custom domain support
- ✅ HTTPS enabled
- ✅ Fast global CDN

### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Deploy with one click

### Other Platforms

- **Netlify**: Drag & drop the `out` folder
- **AWS Amplify**: Connect GitHub repository
- **Cloudflare Pages**: Connect GitHub repository
- **Render**: Static site deployment

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For questions or support, contact: info@therenegades.com

## 🎯 Future Enhancements

- [ ] CMS integration (Sanity/Contentful)
- [ ] E-commerce for merch
- [ ] Music player with streaming
- [ ] Blog functionality
- [ ] Member login area
- [ ] Event ticketing integration
- [ ] Analytics dashboard

---

Built with ❤️ for rock music lovers

