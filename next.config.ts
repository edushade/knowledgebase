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
      source: '/docs',
      destination: '/docs/knowledgebase',
      permanent: false,
    },
  ],
};

export default withMDX(config);
