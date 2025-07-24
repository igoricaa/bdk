'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Burger from '../../burger';
import { cn } from '@/src/lib/utils';
import { NavigationRoute } from '@/src/lib/utils/navigation-routes';
import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { useIsMobile } from '@/src/lib/hooks/use-mobile';
import { AnimatePresence } from 'motion/react';

const DynamicMobileMenu = dynamic(
  () => import('./mobile-menu').then((mod) => mod.MobileMenu),
  { ssr: false }
);

const MobileNavigation = ({
  className,
  navigationRoutes,
  socials,
  logo,
  blinkdraftLogo,
}: {
  className?: string;
  navigationRoutes: NavigationRoute[];
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
  logo: SanityImageSource;
  blinkdraftLogo: SanityImageSource;
}) => {
  const isMobile = useIsMobile({ breakpoint: 1280 }); // xl breakpoint
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  if (!isMobile) {
    return null;
  }

  return (
    <div className={cn(className)}>
      <Burger onClickHandler={toggleMenu} isOpen={isMenuOpen} />

      <AnimatePresence>
        {isMenuOpen && (
          <DynamicMobileMenu
            isOpen={isMenuOpen}
            onClose={toggleMenu}
            navigationRoutes={navigationRoutes}
            socials={socials}
            logo={logo}
            blinkdraftLogo={blinkdraftLogo}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavigation;
