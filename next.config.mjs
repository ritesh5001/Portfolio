/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // No host redirect here: Vercel's own Domains settings already redirect the
  // apex (riteshgiri.dev) -> www at the platform level. An app-level redirect
  // in the opposite direction previously caused an infinite redirect loop
  // (ERR_TOO_MANY_REDIRECTS) fighting that platform redirect. SITE_URL in
  // src/lib/seo.js is the single source of truth for the canonical host and
  // must stay in sync with whichever domain Vercel treats as primary.
};

export default nextConfig;
