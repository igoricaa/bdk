import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import {
  getGeneralInfoData,
  getServicesData,
} from '@/sanity/lib/cached-queries';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface NavigationRouteBase {
  label: string;
  illustration?: {
    desktop?: any;
    tablet?: any;
    mobile?: any;
  };
}

export interface HrefRoute extends NavigationRouteBase {
  href: string;
  subRoutes?: never;
}

export interface SubRoutesRoute extends NavigationRouteBase {
  href?: string;
  subRoutes: NavigationRoute[];
}

export type NavigationRoute = HrefRoute | SubRoutesRoute;

export const getHeaderData = async (): Promise<{
  navigationRoutes: NavigationRoute[];
  logo: {
    logoBlack: SanityImageSource | null;
    logoWhite: SanityImageSource | null;
  };
  blinkdraftLogo: SanityImageSource | null;
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
}> => {
  const [{ industries, practices, foreignDesks }, { generalInfo, blinkdraft }] =
    await Promise.all([getServicesData(), getGeneralInfoData()]);

  if (!industries && !practices && !foreignDesks && !generalInfo) {
    return {
      navigationRoutes: [],
      logo: {
        logoBlack: null,
        logoWhite: null,
      },
      blinkdraftLogo: null,
      socials: [],
    };
  }

  const routes: NavigationRoute[] = [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'About Us',
      subRoutes: [
        {
          label: 'Our Firm',
          href: '/about-us',
        },
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
      illustration: {
        mobile: generalInfo?.servicesCategoryIllustrations
          .servicesIllustration as NonNullable<
          GENERAL_INFO_QUERYResult['generalInfo']
        >['servicesCategoryIllustrations']['servicesIllustration'],
      },
      subRoutes: [
        {
          label: 'Practices',
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
    logo: {
      logoBlack: generalInfo?.logo?.logoBlack as SanityImageSource,
      logoWhite: generalInfo?.logo?.logoWhite as SanityImageSource,
    },
    blinkdraftLogo: blinkdraft?.logo as SanityImageSource,
    socials: generalInfo?.socials as NonNullable<
      GENERAL_INFO_QUERYResult['generalInfo']
    >['socials'],
  };
};
