/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * `next dev` and `next build` both write to .next, so building while the dev
   * server is running corrupts the output (it fails with PageNotFoundError on
   * /_document and similar). Setting NEXT_DIST_DIR lets a build use its own
   * folder instead, e.g. NEXT_DIST_DIR=.next-build npm run build.
   */
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
