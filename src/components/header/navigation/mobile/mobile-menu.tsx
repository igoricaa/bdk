'use client';

import { cn } from '@/src/lib/utils';
import {
  NavigationRoute,
  SubRoutesRoute,
} from '@/src/lib/utils/navigation-routes';
import { useEffect, useRef, useState } from 'react';
import Logo from '@/src/components/ui/logo';
import { TransitionLink } from '@/src/components/transition-link';
import { ChevronDown, Search } from 'lucide-react';
import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import Socials from './socials';
import MenuFooter from './menu-footer';
import { AnimatePresence, motion } from 'motion/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/src/sanity/lib/image';
import dynamic from 'next/dynamic';

const DynamicMainSearchMobile = dynamic(
  () =>
    import('@/src/components/search/search-main-mobile').then(
      (mod) => mod.MainSearchMobile
    ),
  { ssr: false }
);

const DynamicMobileSubNavigation = dynamic(
  () =>
    import('./mobile-sub-navigation').then((mod) => mod.MobileSubNavigation),
  { ssr: false }
);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigationRoutes: NavigationRoute[];
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
  logo: SanityImageSource;
  blinkdraftLogo: SanityImageSource;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  navigationRoutes,
  socials,
  logo,
  blinkdraftLogo,
}: MobileMenuProps) => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeSubNavigationRoute, setActiveSubNavigationRoute] =
    useState<SubRoutesRoute | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const body = document.body as HTMLElement;
    body.style.overflow = 'hidden';
    body.setAttribute('data-lenis-prevent', 'true');

    return () => {
      body.style.overflow = '';
      body.removeAttribute('data-lenis-prevent');
    };
  }, []);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);
    menuRef.current?.classList.toggle('no-scroll', !isSearchActive);
  };

  const handleToggle = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  const handleSubmenuHide = () => {
    setActiveSubNavigationRoute(null);
    menuRef.current?.classList.remove('no-scroll');
  };

  const handleCloseAndReset = () => {
    setOpenAccordion(null);
    setActiveSubNavigationRoute(null);
    setIsSearchActive(false);
    onClose();
  };

  return (
    <>
      <motion.nav
        key='mobile-menu'
        ref={menuRef}
        className={cn(
          'h-dvh w-screen px-side bg-dark-blue flex flex-col fixed inset-0 z-100'
        )}
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ ease: 'easeOut', duration: 0.3 }}
      >
        <header className='min-h-15 h-15 flex items-center sticky top-0'>
          <Logo logo={logo} className='w-24' />
        </header>
        <div className='pt-8 sm:pt-12 overflow-y-auto flex flex-col h-full'>
          <div className='md:hidden border-b border-lightest-blue/50 pb-4'>
            <button
              className={cn(
                'bg-transparent border border-lightest-blue rounded-full min-w-10 min-h-10 size-10 flex items-center justify-center cursor-pointer'
              )}
              onClick={handleSearchToggle}
            >
              <Search
                className='w-4.5 h-4.5'
                strokeWidth={1.5}
                stroke='hsl(var(--lightest-blue))'
              />
            </button>
            <AnimatePresence>
              {isSearchActive && (
                <DynamicMainSearchMobile
                  toggleMenu={handleCloseAndReset}
                  backButtonClick={handleSearchToggle}
                />
              )}
            </AnimatePresence>
          </div>
          <ul>
            {navigationRoutes.map((route) => (
              <MobileNavigationItem
                route={route}
                key={route.label}
                toggleMenu={handleCloseAndReset}
                openAccordion={openAccordion}
                onToggle={handleToggle}
                setActiveSubNavigationRoute={setActiveSubNavigationRoute}
                menuRef={menuRef}
              />
            ))}
            <li className='py-4 border-b border-lightest-blue/50'>
              <TransitionLink
                href='/blinkdraft/en'
                onClick={handleCloseAndReset}
              >
                <Image
                  src={urlFor(blinkdraftLogo as SanityImageSource).url()}
                  alt='BDK - Blinkdraft'
                  width={454}
                  height={144}
                  className='w-25 h-full'
                  unoptimized={true}
                />
              </TransitionLink>
            </li>
          </ul>
          {socials && socials.length > 0 && (
            <Socials socials={socials} className='pt-4' />
          )}
          <MenuFooter />
        </div>
      </motion.nav>

      <AnimatePresence>
        {activeSubNavigationRoute && (
          <DynamicMobileSubNavigation
            key='mobile-sub-navigation'
            route={activeSubNavigationRoute}
            toggleMenu={handleCloseAndReset}
            backButtonClick={handleSubmenuHide}
            socials={socials}
          />
        )}
      </AnimatePresence>
    </>
  );
};

interface MobileNavigationItemProps {
  route: NavigationRoute;
  toggleMenu: () => void;
  openAccordion: string | null;
  onToggle: (label: string) => void;
  setActiveSubNavigationRoute: (route: SubRoutesRoute) => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MobileNavigationItem = ({
  route,
  toggleMenu,
  openAccordion,
  onToggle,
  setActiveSubNavigationRoute,
  menuRef,
}: MobileNavigationItemProps) => {
  const sharedClasses =
    'w-full text-white text-2xl flex justify-between items-center cursor-pointer';

  return (
    <li className='py-4 border-b border-lightest-blue/50'>
      {route.subRoutes && route.subRoutes.length > 0 ? (
        <MobileNavigationAccordionItem
          route={route}
          className={sharedClasses}
          toggleMenu={toggleMenu}
          openAccordion={openAccordion}
          onToggle={onToggle}
          setActiveSubNavigationRoute={setActiveSubNavigationRoute}
          menuRef={menuRef}
        />
      ) : (
        <TransitionLink
          href={route.href as string}
          pageName={route.label}
          className={sharedClasses}
          onClick={toggleMenu}
        >
          {route.label}
        </TransitionLink>
      )}
    </li>
  );
};

interface MobileNavigationAccordionItemProps {
  route: SubRoutesRoute;
  className: string;
  toggleMenu: () => void;
  openAccordion: string | null;
  onToggle: (label: string) => void;
  setActiveSubNavigationRoute: (route: SubRoutesRoute) => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MobileNavigationAccordionItem = ({
  route,
  className,
  toggleMenu,
  openAccordion,
  onToggle,
  setActiveSubNavigationRoute,
  menuRef,
}: MobileNavigationAccordionItemProps) => {
  return (
    <Accordion
      type='single'
      collapsible
      value={openAccordion === route.label ? route.label : ''}
      onValueChange={onToggle}
    >
      <AccordionItem value={route.label}>
        <AccordionTrigger
          className={cn(
            'rounded-none [&[data-state=open]>svg]:rotate-180 py-0',
            className
          )}
          icon={<ChevronDown className='text-lightest-blue' strokeWidth={1} />}
        >
          {route.label}
        </AccordionTrigger>
        <AccordionContent>
          <ul className='flex flex-col gap-y-2.5 mt-4'>
            {route.subRoutes.map((subRoute) => (
              <MobileNavigationDropdownSubItem
                key={subRoute.label}
                route={subRoute}
                toggleMenu={toggleMenu}
                setActiveSubNavigationRoute={setActiveSubNavigationRoute}
                menuRef={menuRef}
              />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

interface MobileNavigationDropdownSubItemProps {
  route: NavigationRoute;
  toggleMenu: () => void;
  setActiveSubNavigationRoute: (route: SubRoutesRoute) => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

const MobileNavigationDropdownSubItem = ({
  route,
  toggleMenu,
  setActiveSubNavigationRoute,
  menuRef,
}: MobileNavigationDropdownSubItemProps) => {
  const sharedClasses =
    'flex justify-between text-lightest-blue text-xl py-2 px-4 bg-lightest-blue/10 rounded-md w-full cursor-pointer';

  const handleSubmenuShow = () => {
    setActiveSubNavigationRoute(route as SubRoutesRoute);
    menuRef.current?.classList.toggle('no-scroll');
  };

  return (
    <li>
      {route.subRoutes && route.subRoutes.length > 0 ? (
        <button className={sharedClasses} onClick={handleSubmenuShow}>
          {route.label}
        </button>
      ) : (
        <TransitionLink
          href={route.href as string}
          pageName={route.label}
          className={sharedClasses}
          onClick={toggleMenu}
        >
          {route.label}
        </TransitionLink>
      )}
    </li>
  );
};
