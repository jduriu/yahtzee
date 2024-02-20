/** @type {import('next').NextConfig} */
const nextConfig = {
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
