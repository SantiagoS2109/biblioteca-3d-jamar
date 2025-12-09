/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.jamar.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "xadmunjbkvgnhlswupdv.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
