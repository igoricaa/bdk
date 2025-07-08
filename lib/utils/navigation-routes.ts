import { SERVICES_QUERYResult } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/client';
import { SERVICES_QUERY } from '@/sanity/lib/queries';

export interface NavigationRoute {
  label: string;
  href: string;
  subRoutes?: NavigationRoute[];
  illustration?: {
    desktop?: any;
    tablet?: any;
    mobile?: any;
  };
}

export const getNavigationRoutes = async (): Promise<NavigationRoute[]> => {
  const { industries, practices, foreignDesks }: SERVICES_QUERYResult =
    await sanityFetch({
      query: SERVICES_QUERY,
    });

  if (!industries && !practices && !foreignDesks) {
    return [];
  }

  const routes: NavigationRoute[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About Us',
      href: '/about-us',
    },
    {
      label: 'People',
      href: '/people',
    },
    {
      label: 'Services',
      href: '/services',
      subRoutes: [
        {
          label: 'Practices',
          href: '/practices',
          subRoutes: practices.map((practice) => ({
            label: practice.title,
            href: `/practices/${practice.slug.current}`,
            illustration: practice.illustration,
          })),
        },
        {
          label: 'Industries',
          href: '/industries',
          subRoutes: industries.map((industry) => ({
            label: industry.title,
            href: `/industries/${industry.slug.current}`,
            illustration: industry.illustration,
          })),
        },
        {
          label: 'Foreign Desks',
          href: '/foreign-desks',
          subRoutes: foreignDesks.map((foreignDesk) => ({
            label: foreignDesk.title,
            href: `/foreign-desks/${foreignDesk.slug.current}`,
          })),
        },
      ],
    },
    {
      label: 'Newsroom',
      href: '/newsroom',
    },
    {
      label: 'BDKnowledge',
      href: '/bdknowledge',
      subRoutes: [
        {
          label: 'Blog',
          href: '/blog',
        },
        {
          label: 'Digital Watch',
          href: '/digital-watch',
        },
        {
          label: 'Insights',
          href: '/insights',
        },
        {
          label: 'Publications',
          href: '/publications',
        },
      ],
    },
  ];

  return routes;
};
