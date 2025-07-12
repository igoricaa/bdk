import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import {
  getGeneralInfoData,
  getServicesData,
} from '@/sanity/lib/cached-queries';

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

export const getHeaderData = async (): Promise<{
  navigationRoutes: NavigationRoute[];
  logo: any;
  blinkdraftLogo: any;
}> => {
  const [{ industries, practices, foreignDesks }, { generalInfo, blinkdraft }] =
    await Promise.all([getServicesData(), getGeneralInfoData()]);

  if (!industries && !practices && !foreignDesks && !generalInfo) {
    return {
      navigationRoutes: [],
      logo: null,
      blinkdraftLogo: null,
    };
  }

  const routes: NavigationRoute[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About Us',
      href: '/about-us',
      subRoutes: [
        {
          label: 'Career',
          href: '/career',
        },
      ],
    },
    {
      label: 'People',
      href: '/people',
    },
    {
      label: 'Services',
      href: '/services',
      illustration: {
        mobile: generalInfo?.servicesCategoryIllustrations
          .servicesIllustration as NonNullable<
          GENERAL_INFO_QUERYResult['generalInfo']
        >['servicesCategoryIllustrations']['servicesIllustration'],
      },
      subRoutes: [
        {
          label: 'Practices',
          href: '/practices',
          illustration: {
            mobile: generalInfo?.servicesCategoryIllustrations
              .practicesIllustration as NonNullable<
              GENERAL_INFO_QUERYResult['generalInfo']
            >['servicesCategoryIllustrations']['practicesIllustration'],
          },
          subRoutes: practices.map((practice) => ({
            label: practice.title,
            href: `/practices/${practice.slug.current}`,
            illustration: {
              mobile: practice.illustration.mobile,
            },
          })),
        },
        {
          label: 'Industries',
          href: '/industries',
          illustration: {
            mobile: generalInfo?.servicesCategoryIllustrations
              .industriesIllustration as NonNullable<
              GENERAL_INFO_QUERYResult['generalInfo']
            >['servicesCategoryIllustrations']['industriesIllustration'],
          },
          subRoutes: industries.map((industry) => ({
            label: industry.title,
            href: `/industries/${industry.slug.current}`,
            illustration: {
              mobile: industry.illustration.mobile,
            },
          })),
        },
        {
          label: 'Foreign Desks',
          href: '/foreign-desks',
          illustration: {
            mobile: generalInfo?.servicesCategoryIllustrations
              .foreignDesksIllustration as NonNullable<
              GENERAL_INFO_QUERYResult['generalInfo']
            >['servicesCategoryIllustrations']['foreignDesksIllustration'],
          },
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

  return {
    navigationRoutes: routes,
    logo: generalInfo?.logo || null,
    blinkdraftLogo: blinkdraft?.logo || null,
  };
};
