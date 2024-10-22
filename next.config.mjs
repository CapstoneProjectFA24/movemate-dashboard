/** @type {import('next').NextConfig} */
const nextConfig = {
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
