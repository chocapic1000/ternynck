/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ternynck",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/ternynck",
  },
};

module.exports = nextConfig;
