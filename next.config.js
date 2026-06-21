/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ternynck",
  images: {
    loaderFile: "./src/imageLoader.ts",
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
