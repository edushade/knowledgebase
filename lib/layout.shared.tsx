import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from '@/components/logo';
import { SITE_ORIGIN } from '@/lib/site';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo />,
      url: '/',
    },
    // The only links on this site pointed at itself — not one went back to
    // edushade.com, not even the logo. This host draws roughly three quarters
    // of the crawl budget for the domain and earns more search impressions
    // than the blog does, and none of that reached the pages that sell the
    // product. A link in the nav is on every page here.
    links: [
      {
        text: 'Edushade',
        url: SITE_ORIGIN,
        external: true,
      },
      {
        text: 'Pricing',
        url: `${SITE_ORIGIN}/pricing`,
        external: true,
      },
    ],
  };
}
