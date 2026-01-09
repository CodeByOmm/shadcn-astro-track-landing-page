#!/usr/bin/env node
/**
 * Deployment automation script
 * Automatically sets noindex, nofollow for production deployments
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const isProduction = process.env.VERCEL || process.env.NETLIFY || process.env.NODE_ENV === 'production'

console.log('🚀 Running deployment automation...')
console.log('Environment:', isProduction ? 'Production' : 'Development')

if (isProduction) {
  console.log('🔒 Setting up production SEO configuration (noindex, nofollow)')

  // Update robots.txt for production
  const robotsTxtPath = path.join(__dirname, '..', 'public', 'robots.txt')

  const productionRobotsTxt = `User-agent: *
Disallow: /

`

  fs.writeFileSync(robotsTxtPath, productionRobotsTxt)
  console.log('✅ Updated robots.txt for production')

  // Create environment flag file
  const envFlagPath = path.join(__dirname, '..', 'src', '.production-env')

  fs.writeFileSync(envFlagPath, 'PRODUCTION_DEPLOY=true')
  console.log('✅ Created production environment flag')
} else {
  console.log('🏠 Development environment - keeping default SEO settings')

  // Ensure robots.txt is development-friendly
  const robotsTxtPath = path.join(__dirname, '..', 'public', 'robots.txt')

  const devRobotsTxt = `User-agent: *
Allow: /

Sitemap: https://demo-astro-jocr.vercel.app/sitemap-index.xml`

  fs.writeFileSync(robotsTxtPath, devRobotsTxt)

  // Remove production flag if it exists
  const envFlagPath = path.join(__dirname, '..', 'src', '.production-env')

  if (fs.existsSync(envFlagPath)) {
    fs.unlinkSync(envFlagPath)
  }
}

console.log('✨ Deployment automation complete!')
