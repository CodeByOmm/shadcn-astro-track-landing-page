# Deployment Automation

This folder contains scripts that automatically configure the site for production deployment.

## How it works

### Development (Local)

- Robots meta tags: `index, follow`
- robots.txt: Allows all crawling
- Normal SEO behavior

### Production (Vercel/Netlify)

- Robots meta tags: `noindex, nofollow`
- robots.txt: Disallows all crawling
- Demo/staging site behavior

## Files

- `deploy-setup.js` - Main automation script that runs before build
- Automatically detects deployment environment using `VERCEL`, `NETLIFY`, or `NODE_ENV=production`

## Build Commands

- `pnpm run build` - Production build with automation (for deployment)
- `pnpm run build:local` - Local build without automation
- `pnpm run dev` - Development server

## Environment Detection

The system detects production environment using:

- `process.env.VERCEL` (Vercel deployment)
- `process.env.NETLIFY` (Netlify deployment)
- `process.env.NODE_ENV === 'production'` (General production)

When any of these are true, the site automatically switches to `noindex, nofollow` mode.
