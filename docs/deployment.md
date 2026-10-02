# Deployment

The site is hosted on **Vercel** and deploys automatically on every push to `main`.

Live URL: `https://estrid.my` (Vercel project: **estrid-web**)

---

## How It Works

1. Push to `main` → Vercel's Git integration starts a production build
2. Vercel runs `yarn build`; Next.js generates a static export (`output: 'export'`)
3. The static files are served from the domain root — no server code

Pushing any other branch creates a **preview deployment** with its own URL — handy for checking changes on a phone before merging to `main`.

Deployment status per commit is visible on GitHub (commit checks → "Vercel") or in the Vercel dashboard.

---

## Environment Variables

Set in **Vercel → estrid-web → Settings → Environment Variables** (Production):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | Web3Forms key for the contact form |

`NEXT_PUBLIC_*` variables are baked in at **build time** — after adding or changing one, **redeploy** (Deployments → latest → Redeploy) or the live site keeps the old value.

---

## Local Build Test

```bash
yarn build          # generates /out
npx serve out       # serves at http://localhost:3000
```

If the build fails with a strange `PageNotFoundError` after switching branches, delete the stale cache: `rm -rf .next`.
