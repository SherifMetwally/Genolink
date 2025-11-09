/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repository name is not 'GenoLink', update basePath:
  // basePath: '/YOUR_REPO_NAME',
  // trailingSlash: true,
}

module.exports = nextConfig