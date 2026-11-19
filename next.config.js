const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: path.resolve(__dirname, ".."),
  },
};

module.exports = nextConfig;
