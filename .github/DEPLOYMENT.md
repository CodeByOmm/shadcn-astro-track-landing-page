# GitHub Actions Deployment Setup

This repository is configured to automatically deploy to Vercel using GitHub Actions when you push commits or create pull requests.

## Workflow Overview

The GitHub Actions workflow (`.github/workflows/deploy.yml`) handles:

1. **Testing**: Linting, type checking, and Astro validation
2. **Preview Deployments**: For pull requests
3. **Production Deployments**: For commits to the `main` branch

## Required Setup

### 1. Vercel Token

You need to add a Vercel token to your GitHub repository secrets:

1. Go to [Vercel Dashboard](https://vercel.com/account/tokens)
2. Create a new token with appropriate permissions
3. Go to your GitHub repository → Settings → Secrets and variables → Actions
4. Add a new secret named `VERCEL_TOKEN` with your token value

### 2. Vercel Project Configuration

Make sure your Vercel project is properly configured:

1. Link your GitHub repository to Vercel
2. Set up your project in Vercel dashboard
3. **Important**: Disable automatic deployments in Vercel to prevent conflicts:
   - Go to your project settings in Vercel
   - Navigate to "Git" settings
   - Turn OFF "Automatic deployments from Git"

### 3. Environment Setup

The workflow uses:

- **Node.js 20**: Latest LTS version
- **pnpm**: For package management
- **Vercel CLI**: For deployment

## Deployment Process

### Production Deployment

- Triggers on push to `main` branch
- Runs all tests and checks
- Builds and deploys to production
- Creates deployment status updates

### Preview Deployment

- Triggers on pull requests
- Runs all tests and checks
- Creates preview deployment
- Comments on PR with preview URL

### Manual Deployment

- Can be triggered manually from GitHub Actions tab
- Uses "workflow_dispatch" event

## Build Process

The build process includes:

1. **Pre-build automation** (`automation/deploy-setup.js`)
   - Detects environment (production vs development)
   - Sets appropriate robots.txt configuration
   - Creates environment flags
2. **Astro build** with optimized production settings
3. **Vercel deployment** with proper environment targeting

## Local Development

For local development and testing:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build locally (without production flags)
pnpm build:local

# Preview production build
pnpm preview

# Run linting and checks
pnpm lint
pnpm check-types
pnpm astro check
```

## Troubleshooting

### Common Issues

1. **Deployment fails with auth error**
   - Check that `VERCEL_TOKEN` secret is correctly set
   - Verify token permissions in Vercel dashboard

2. **Build fails**
   - Check the logs in GitHub Actions
   - Ensure all dependencies are properly listed in `package.json`
   - Run build locally to debug: `pnpm build`

3. **Preview deployment not working**
   - Ensure the workflow has necessary permissions
   - Check that PR is from a branch in the same repository

### Environment Variables

The automation script detects production environment through:

- `VERCEL=true` (set by Vercel)
- `GITHUB_ACTIONS=true` (set by GitHub Actions)
- `CI=true` (set by most CI environments)
- `NODE_ENV=production`

## Security Considerations

- Never commit sensitive tokens or secrets
- Use GitHub repository secrets for all sensitive data
- The workflow only runs on main repository (not forks) for security
- Production deployments require successful tests to pass first

## Workflow Customization

You can customize the workflow by:

- Adding more test steps in the `test` job
- Modifying environment variables
- Adding notifications (Slack, Discord, etc.)
- Changing deployment conditions

For questions or issues, check the GitHub Actions logs or contact the development team.
