import type { NextConfig } from 'next';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

const config: NextConfig = {
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/docs',
      destination: '/docs/knowledgebase',
      permanent: false,
    },
  ],
};

export default withMDX(config);
