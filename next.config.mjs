/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.jamar.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
