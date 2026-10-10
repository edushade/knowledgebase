import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';
import path from 'node:path';

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(__dirname),
  },
  redirects: async () => [
    {
      // Permanent, so the ranking signal moves. It answered 307 before, which
      // tells Google to keep indexing /docs and expect it back.
      source: '/docs',
      destination: '/docs/knowledgebase',
      permanent: true,
    },
  ],
};

export default withMDX(config);
