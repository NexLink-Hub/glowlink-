# Deployment & Build Guide — GlowLink

This document explains how to test locally and deploy the web app (Vite) to Vercel/Netlify and how to build the native app using Expo (EAS).

## Quick local checks

1. Install dependencies (if you haven't already):

```powershell
npm install
```

2. Run tests:

```powershell
npm run test:run
```

3. Generate placeholder icons (optional — creates PNG placeholders used for web and native):

```powershell
npm run generate:icons
```

4. Start the dev server:

```powershell
npm run dev
```

Open http://localhost:8080/ to test locally.

If you are testing payments locally, start the Stripe prototype server as well:

```powershell
npm run start:stripe
```


## Generate production build (web)

```powershell
npm run build
```

The output is placed in `dist/`. You can preview it with `npm run preview`.


## Deploying to Vercel

1. Push your repository to GitHub.
2. Create a new project on Vercel and import your GitHub repo.
3. Set build settings (Vercel usually detects Vite):
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variables under Project Settings → Environment Variables:
   - `STRIPE_SECRET_KEY` = your Stripe secret key (for server-side code)
5. Deploy. Vercel will run the build and publish your site.

Notes: If you used the prototype Express Stripe server, deploy that server separately (Render, Heroku, or a serverless function) and set its URL in your frontend config.


## Deploying to Netlify

1. Push repository to GitHub.
2. In Netlify, create a new site from Git.
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Add environment variables (like `STRIPE_SECRET_KEY`) in Site Settings → Build & deploy → Environment.
5. Deploy.


## Expo / EAS (Native builds)

1. Install `eas-cli` if you plan to use EAS for production builds:

```powershell
npm install -g eas-cli
```

2. Ensure `glowlink-native/app.json` contains your `name`, `slug` and `icon` entries. A placeholder icon can be generated with the script above.

3. Login and build:

```powershell
eas login
# Android
eas build --platform android
# iOS (requires Apple credentials)
eas build --platform ios
```

4. Follow EAS prompts to set credentials or configure builds in the EAS dashboard.


## Notes & Best Practices

- Replace the placeholder icons with your real PNGs (192x192, 512x512 for web; 1024x1024 for native icon).
- Never commit production secrets. Use environment variables on your hosting provider.
- For Stripe production, use server-side Checkout/session creation. Do not expose `STRIPE_SECRET_KEY` to the client.
- If you want me to handle deploying the server for Stripe Checkout sessions, tell me which host (Render, Heroku, Vercel serverless function) you prefer and I can scaffold a minimal deploy target.


## Commands Summary

```powershell
npm install
npm run generate:icons   # optional placeholder icons
npm run test:run
npm run dev             # dev server
npm run build           # production build
npm run start:stripe    # run prototype Stripe server (if testing payments locally)
```
