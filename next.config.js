/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
// IMPORTANT: Update this with your actual repository name
// If your GitHub Pages URL is: https://username.github.io/REPO_NAME
// Then set basePath to: '/REPO_NAME'
// If your GitHub Pages URL is: https://username.github.io (user pages)
// Then set basePath to: ''
const REPO_NAME = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'GenoLink'
const basePath = isProd ? (REPO_NAME.includes('.github.io') ? '' : `/${REPO_NAME}`) : ''

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: true,
}

module.exports = nextConfig