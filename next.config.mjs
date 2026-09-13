/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Canonical host is the apex domain. Everything (canonical tags, JSON-LD @id,
  // sitemap, robots.txt) points at https://riteshgiri.dev, so www must redirect
  // rather than serve a parallel copy.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.riteshgiri.dev" }],
        destination: "https://riteshgiri.dev/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
