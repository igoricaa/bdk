import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    reactCompiler: true,
  },
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

// module.exports = withBundleAnalyzer(nextConfig)
