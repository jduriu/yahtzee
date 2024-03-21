/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      }
    ]
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  env: {
    YAHTZEE_API_HOST: process.env.YAHTZEE_API_HOST,
    ACCOUNTS_API_HOST: process.env.ACCOUNTS_API_HOST
  },
}

module.exports = nextConfig
