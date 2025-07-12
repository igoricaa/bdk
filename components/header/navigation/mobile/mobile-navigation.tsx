'use client';

import { cn } from '@/lib/utils';
import { NavigationRoute, SubRoutesRoute } from '@/lib/utils/navigation-routes';
import Burger from '../../burger';
import { useEffect, useState } from 'react';
import Logo from '@/components/ui/logo';
import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import BackToButton from '@/components/ui/buttons/back-to-button';
import Socials from './socials';
import MenuFooter from './menu-footer';
import { useLenis } from 'lenis/react';

const MobileNavigation = ({
  className,
  navigationRoutes,
  socials,
  logo,
}: {
  className?: string;
  navigationRoutes: NavigationRoute[];
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
  logo: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const lenis = useLenis();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setOpenAccordion(null);
  };

  const handleToggle = (label: string) => {
    setOpenAccordion(openAccordion === label ? null : label);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) {
        lenis.stop();
      }
    } else {
      document.body.style.overflow = '';
      if (lenis) {
        lenis.start();
      }
    }

    return () => {
      document.body.style.overflow = '';
      if (lenis) {
        lenis.start();
      }
    };
  }, [isOpen, lenis]);

  return (
    <>
      <Burger onClickHandler={toggleMenu} />

      <nav
        className={cn(
          'h-screen w-screen px-side bg-dark-blue flex flex-col fixed inset-0 z-100 transition-all duration-300 overflow-y-auto',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
      >
        <header className='h-15 flex items-center'>
          <Logo logo={logo} className='w-24' />
        </header>

        <div className='pt-8 sm:pt-12'>
          <div className='border-b border-lightest-blue pb-4'>
            <div className='flex items-center justify-center w-10 h-10 border border-white rounded-full'>
              <Search className='w-4.5 h-4.5' strokeWidth={1.5} stroke='#fff' />
            </div>
          </div>

          <ul>
            {navigationRoutes.map((route) => (
              <MobileNavigationItem
                route={route}
                key={route.label}
                toggleMenu={toggleMenu}
                openAccordion={openAccordion}
                onToggle={handleToggle}
                socials={socials}
              />
            ))}
          </ul>

          {socials && socials.length > 0 && (
            <Socials socials={socials} className='pt-4' />
          )}
        </div>

        <MenuFooter />
      </nav>
    </>
  );
};

export default MobileNavigation;

const MobileNavigationItem = ({
  route,
  toggleMenu,
  openAccordion,
  onToggle,
  socials,
}: {
  route: NavigationRoute;
  toggleMenu: () => void;
  openAccordion: string | null;
  onToggle: (label: string) => void;
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
}) => {
  const sharedClasses =
    'w-full text-white text-2xl flex justify-between items-center cursor-pointer';

  return (
    <li className='py-4 border-b border-lightest-blue'>
      {route.subRoutes && route.subRoutes.length > 0 ? (
        <MobileNavigationAccordionItem
          route={route}
          className={sharedClasses}
          toggleMenu={toggleMenu}
          openAccordion={openAccordion}
          onToggle={onToggle}
          socials={socials}
        />
      ) : (
        <Link
          href={route.href || ''}
          className={sharedClasses}
          onClick={toggleMenu}
        >
          {route.label}
        </Link>
      )}
    </li>
  );
};

const MobileNavigationAccordionItem = ({
  route,
  className,
  toggleMenu,
  openAccordion,
  onToggle,
  socials,
}: {
  route: SubRoutesRoute;
  className: string;
  toggleMenu: () => void;
  openAccordion: string | null;
  onToggle: (label: string) => void;
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
}) => {
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
                socials={socials}
              />
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const MobileNavigationDropdownSubItem = ({
  route,
  toggleMenu,
  socials,
}: {
  route: NavigationRoute;
  toggleMenu: () => void;
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
}) => {
  const [isSubNavigationOpen, setIsSubNavigationOpen] = useState(false);

  const sharedClasses =
    'flex justify-between text-lightest-blue text-2xl py-2.5 px-4 bg-lightest-blue/10 rounded-md w-full cursor-pointer';

  const handleLinkClick = () => {
    setIsSubNavigationOpen(false);
    toggleMenu();
  };

  return (
    <li>
      {route.subRoutes && route.subRoutes.length > 0 ? (
        <>
          <button
            className={sharedClasses}
            onClick={() => setIsSubNavigationOpen(!isSubNavigationOpen)}
          >
            {route.label}
          </button>
          <MobileSubNavigation
            route={route}
            isOpen={isSubNavigationOpen}
            toggleMenu={handleLinkClick}
            backButtonClick={() => setIsSubNavigationOpen(false)}
            socials={socials}
          />
        </>
      ) : (
        <Link
          href={route.href || ''}
          className={sharedClasses}
          onClick={toggleMenu}
        >
          {route.label}
        </Link>
      )}
    </li>
  );
};

const MobileSubNavigation = ({
  route,
  isOpen,
  toggleMenu,
  backButtonClick,
  socials,
}: {
  route: SubRoutesRoute;
  isOpen: boolean;
  toggleMenu: () => void;
  backButtonClick: () => void;
  socials: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['socials'];
}) => {
  return (
    <div
      className={cn(
        'h-[calc(100vh-60px)] px-side pt-8 w-screen flex flex-col bg-dark-blue fixed top-15 left-0 z-105 transition-all duration-300 overflow-y-auto',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
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
              <Link
                href={subRoute.href || ''}
                className='block text-xl leading-7 text-lightest-blue py-2'
                onClick={toggleMenu}
              >
                {subRoute.label}
              </Link>
            </li>
          ))}
        </ul>
        {socials && socials.length > 0 && (
          <Socials socials={socials} className='mt-4' />
        )}
      </div>
      <MenuFooter />
    </div>
  );
};
