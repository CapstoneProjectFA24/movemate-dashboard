/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  // },
  // images: {
  //     domains: ['utfs.io'],
  //   },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
