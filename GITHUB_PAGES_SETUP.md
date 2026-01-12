# Quick Start: GitHub Pages Deployment

## 🚀 5-Minute Setup

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `rock-band-portal` or `yourusername.github.io`)
3. **Do NOT** initialize with README (we already have one)

### Step 2: Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Rock Band Portal"

# Add your GitHub repository as remote
# Replace USERNAME and REPO-NAME with your values
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Build and deployment**:
   - Source: Select **GitHub Actions**
5. That's it! No need to save, it's automatic.

### Step 4: Wait for Deployment

1. Go to the **Actions** tab in your repository
2. You'll see "Deploy to GitHub Pages" workflow running
3. Wait 1-3 minutes for it to complete (green checkmark)

### Step 5: View Your Site

Your site will be available at:

- **Repository page**: `https://USERNAME.github.io/REPO-NAME/`
- **User/Org page**: `https://USERNAME.github.io/` (if repo is named `USERNAME.github.io`)

## 📝 Important Notes

### For Repository Pages (username.github.io/repo-name)

If your site is at `username.github.io/repo-name`, you need to:

1. **Edit `.github/workflows/deploy.yml`**:
   - Find line 45 (around line 45)
   - Uncomment this line:
     ```yaml
     NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
     ```

2. **Commit and push**:
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Configure base path for repository deployment"
   git push
   ```

### For User/Org Pages or Custom Domain

If deploying to:
- `username.github.io` (user/org site)
- Custom domain (e.g., `www.yourband.com`)

**No changes needed!** The default configuration works.

## 🔄 Updating Your Site

Every time you push to the `main` branch, GitHub Actions will automatically rebuild and deploy:

```bash
# Make your changes to the code
# Then:
git add .
git commit -m "Update content"
git push
```

Wait 1-3 minutes and your changes will be live!

## 🌐 Custom Domain Setup

To use your own domain (e.g., `www.therenegades.com`):

1. **Create `public/CNAME` file**:
   ```
   www.therenegades.com
   ```

2. **Configure DNS** with your domain provider:
   
   **Option A - CNAME (Recommended for www subdomain):**
   ```
   Type: CNAME
   Name: www
   Value: USERNAME.github.io
   ```

   **Option B - A Records (For apex domain):**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

3. **Enable HTTPS** in GitHub Pages settings (wait for DNS to propagate first)

## ✅ Verification Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to `main` branch
- [ ] GitHub Pages enabled (Source: GitHub Actions)
- [ ] Workflow completed successfully (green checkmark in Actions tab)
- [ ] Site accessible at GitHub Pages URL
- [ ] All sections working (Hero, About, Music, Tour, Gallery, News, Contact)
- [ ] Navigation working smoothly
- [ ] Responsive on mobile/tablet/desktop

## 🐛 Troubleshooting

### Build Failed
- Check the Actions tab for error details
- Ensure all dependencies are installed
- Verify `package.json` is correct

### 404 Error
- Ensure GitHub Pages source is "GitHub Actions"
- Check workflow completed successfully
- For repository pages, verify `NEXT_PUBLIC_BASE_PATH` is set

### Blank Page
- Check browser console for errors
- Verify `basePath` configuration
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Images Not Loading
- External images (Unsplash) require internet
- For production, use local images in `public/images/`

## 📚 More Information

- **Full deployment guide**: [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Project README**: [README.md](./README.md)
- **GitHub Pages docs**: https://docs.github.com/pages

## 🎉 Success!

Once deployed, share your site:
- Add the URL to your repository description
- Share on social media
- Add to your band's bio

---

**Need help?** Check the [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting.

