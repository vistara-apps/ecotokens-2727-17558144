/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['wallet-api-production.s3.amazonaws.com', 'd3r81g40ycuhqg.cloudfront.net'],
  },
}

export default nextConfig
