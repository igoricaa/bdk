'use client';

import { cn } from '@/src/lib/utils';
import {
  NavigationRoute,
  SubRoutesRoute,
} from '@/src/lib/utils/navigation-routes';
import Burger from '../../burger';
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
import BackToButton from '@/src/components/ui/buttons/back-to-button';
import Socials from './socials';
import MenuFooter from './menu-footer';
import { AnimatePresence, motion } from 'motion/react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { MainSearchMobile } from '@/src/components/search/search-main-mobile';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/src/sanity/lib/image';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [activeSubNavigationRoute, setActiveSubNavigationRoute] =
    useState<SubRoutesRoute | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null!);

  const handleSearchToggle = () => {
    setIsSearchActive(!isSearchActive);

    if (!isSearchActive) {
      menuRef.current?.classList.add('no-scroll');
    } else {
      menuRef.current?.classList.remove('no-scroll');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setOpenAccordion(null);
    setActiveSubNavigationRoute(null);
    setIsSearchActive(false);
    menuRef.current?.classList.remove('no-scroll');
  };

  const handleToggle = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  const handleSubmenuHide = () => {
    setActiveSubNavigationRoute(null);
    menuRef.current?.classList.toggle('no-scroll');
  };

  useEffect(() => {
    const body = document.body as HTMLElement;
    body.style.overflow = isMenuOpen ? 'hidden' : '';

    if (isMenuOpen) {
      body.setAttribute('data-lenis-prevent', 'true');
    } else {
      body.removeAttribute('data-lenis-prevent');
    }
  }, [isMenuOpen]);

  return (
    <>
      <Burger onClickHandler={toggleMenu} isOpen={isMenuOpen} />

      <nav
        ref={menuRef}
        className={cn(
          'h-dvh w-screen px-side bg-dark-blue flex flex-col fixed inset-0 z-100 transition-all duration-300 overflow-x-hidden',
          isMenuOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
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
                <MainSearchMobile
                  toggleMenu={toggleMenu}
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
                toggleMenu={toggleMenu}
                openAccordion={openAccordion}
                onToggle={handleToggle}
                setActiveSubNavigationRoute={setActiveSubNavigationRoute}
                menuRef={menuRef}
              />
            ))}
            <li className='py-4 border-b border-lightest-blue/50'>
              <TransitionLink href='/blinkdraft/en' onClick={toggleMenu}>
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
      </nav>

      <AnimatePresence>
        {activeSubNavigationRoute && (
          <MobileSubNavigation
            route={activeSubNavigationRoute}
            toggleMenu={toggleMenu}
            backButtonClick={handleSubmenuHide}
            socials={socials}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default MobileNavigation;

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
        <>
          <button className={sharedClasses} onClick={handleSubmenuShow}>
            {route.label}
          </button>
        </>
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

const MobileSubNavigation = ({
  route,
  toggleMenu,
  backButtonClick,
  socials,
}: {
  route: SubRoutesRoute;
  toggleMenu: () => void;
  backButtonClick: () => void;
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
}) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      className='h-[calc(100dvh-60px)] w-screen px-side pt-8 flex flex-col bg-dark-blue fixed top-15 left-0 z-105 overflow-y-auto overflow-x-hidden transform'
    >
      <BackToButton
        onClick={backButtonClick}
        text='Back to Main Menu'
        iconClassName='bg-transparent border border-light-blue w-10 h-10'
        iconStrokeColor='hsl(var(--light-blue))'
        className='text-light-blue'
      />
      <div className='pt-4 mt-4 border-t border-lightest-blue'>
        <p className='text-white text-2xl'>{route.label}</p>

        <ul className='px-2.5 mt-4'>
          {route.subRoutes.map((subRoute) => (
            <li key={subRoute.label}>
              <TransitionLink
                href={subRoute.href as string}
                pageName={subRoute.label}
                className='block text-xl leading-7 text-lightest-blue py-2'
                onClick={toggleMenu}
              >
                {subRoute.label}
              </TransitionLink>
            </li>
          ))}
        </ul>
        {socials && socials.length > 0 && (
          <Socials socials={socials} className='mt-4' />
        )}
      </div>
      <MenuFooter />
    </motion.div>
  );
};
