# Upload & Deploy Checklist

Follow this checklist to prepare the repository for upload (drag-and-drop to GitHub) and to deploy to Vercel safely.

1) Remove or ignore local secrets
 - Ensure you have a `.gitignore` containing at least:
   - `node_modules/`
   - `dist/`
   - `.env`
   - `.env.local`
   - `.env.*.local`
 - Do NOT include any real secret values in the repo. Use `.env.example` as a template.

2) Sanitize docs
 - Replace literal example passwords or secret tokens with placeholders like `<EXAMPLE_PASSWORD>`.
 - This repo has had test docs sanitized; double-check any new files before uploading.

3) Reduce upload size
 - Remove large folders (or exclude) before zipping: `node_modules/`, local build outputs like `dist/` or `.next/`.
 - Option A (recommended): create a clean zip excluding `node_modules`:

```powershell
# From repository root (Windows PowerShell)
Remove-Item -Recurse -Force node_modules
Compress-Archive -Path . -DestinationPath glowlink-upload.zip
```

 - Option B: Create a zipped copy of the repo directory and then delete `node_modules` from the zip (manual).

4) Create or push to a GitHub repo (drag-and-drop)
 - On GitHub, create a new repository (private or public as you prefer).
 - Drag-and-drop the sanitized project folder or the zip file into the repo creation UI.

5) Set environment variables on Vercel (or your host)
 - In Vercel dashboard -> Project -> Settings -> Environment Variables, set values from `.env.example` (use real secrets here).
 - Example variables to set:
   - `STRIPE_SECRET_KEY` (secret)
   - `STRIPE_WEBHOOK_SECRET` (secret)
   - `VITE_STRIPE_PUBLISHABLE_KEY` (public)
   - `VITE_API_URL` (if using an API on another host)

6) Deploying on Vercel
 - Connect the GitHub repository to Vercel and deploy, or use the Vercel CLI:

```powershell
npm i -g vercel
vercel login
vercel
```

 - After the initial deploy, verify the site, then configure webhooks in Stripe to point to your production webhook URL (e.g., `https://your-vercel-domain.vercel.app/webhook`).

7) Test payments in Stripe test mode
 - Create test Connect accounts and test customers in the Stripe Dashboard.
 - Use Stripe CLI locally to forward webhooks during testing: `stripe listen --forward-to localhost:4242/webhook`

8) Post-deploy checks
 - Confirm environment variables are set in the Vercel project.
 - Confirm webhook secret is configured in `STRIPE_WEBHOOK_SECRET` and the endpoint is reachable.
 - Run through booking → completion flows on the deployed URL using Stripe test cards.

If you want, I can:
 - Create a deploy-ready Vercel configuration (serverless functions) from the Express server.
 - Run a final repo scan to list any remaining files with potential secrets.
