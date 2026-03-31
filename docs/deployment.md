# Deployment

The site deploys automatically to GitHub Pages via GitHub Actions on every push to `main`.

Live URL: `https://ejazulazim88.github.io/estrid.web/`

---

## How It Works

1. Push to `main` triggers `.github/workflows/deploy.yml`
2. Workflow runs `yarn build` with `NEXT_PUBLIC_BASE_PATH=/estrid.web`
3. Next.js generates a static export into `/out`
4. `/out` is uploaded and deployed to GitHub Pages

No server required — the site is fully static HTML/CSS/JS.

---

## First-Time GitHub Pages Setup

1. Go to your repo on GitHub
2. **Settings → Pages**
3. Set Source to **GitHub Actions**
4. Push to `main` — the first deployment will run automatically

---

## Environment Variables for Production

Add these as repository secrets (**Settings → Secrets and variables → Actions**):

| Secret | Value |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key for contact form |

`NEXT_PUBLIC_BASE_PATH` is hardcoded in the workflow as `/estrid.web` — no secret needed.

---

## Local Build Test

To test the production build locally:

```bash
yarn build          # generates /out
npx serve out       # serves at http://localhost:3000
```

To test with the base path:

```bash
NEXT_PUBLIC_BASE_PATH=/estrid.web yarn build
npx serve out
```

---

## Custom Domain

To use a custom domain (e.g. `estrid.my`):

1. Set `NEXT_PUBLIC_BASE_PATH=` (empty) in the workflow
2. Add a `CNAME` file to `public/` containing your domain
3. Configure DNS with your registrar to point to GitHub Pages
4. Enable HTTPS in **Settings → Pages**
