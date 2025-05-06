/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["storage.garuthebat.cloud"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "storage.garuthebat.cloud",
    //     port: "",
    //     pathname: "/**",
    //     search: "",
    //   },
    // ],
  },
};

export default nextConfig;
