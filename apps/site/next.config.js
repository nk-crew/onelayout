/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  transpilePackages: ["onelayout"],
};

module.exports = nextConfig;
