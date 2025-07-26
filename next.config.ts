/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignorar errores ESLint
  },
  typescript: {
    ignoreBuildErrors: true, // Ignorar errores de tipos TS en el build
  },
}

module.exports = nextConfig
