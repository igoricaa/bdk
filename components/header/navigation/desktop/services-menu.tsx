'use client';

import { NavigationRoute } from '@/lib/utils/navigation-routes';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Image } from 'next-sanity/image';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuItemLink from './menu-item-link';

const navMenuTriggerClasses = cn(
  'group inline-flex h-9 gap-x-1 w-max items-center justify-center rounded-md bg-background text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-light-blue-bg data-[state=open]:text-light-blue data-[state=open]:focus:bg-light-blue-bg data-[state=open]:bg-light-blue-bg/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1'
);

const ServicesMenu = ({
  servicesRoute,
}: {
  servicesRoute: NavigationRoute;
}) => {
  const pathname = usePathname();
  const [activeService, setActiveService] = useState<NavigationRoute>({
    label: 'Services',
    href: '',
    illustration: {
      mobile: servicesRoute.illustration?.mobile,
    },
  });

  const isServicesActive = () => {
    return (
      pathname.startsWith('/practices') ||
      pathname.startsWith('/industries') ||
      pathname.startsWith('/foreign-desks') ||
      pathname.startsWith('/services')
    );
  };

  return (
    <NavigationMenuItem value='Services'>
      <NavigationMenuTrigger
        className={cn(
          navMenuTriggerClasses,
          isServicesActive() && 'bg-light-blue-bg text-light-blue'
        )}
      >
        {servicesRoute.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className='fixed! left-1/2 -translate-x-1/2 top-24! mt-0!'>
        <div className='grid gap-5 min-w-7xl w-7xl lg:grid-cols-[270px_1fr_1fr_1fr_180px] h-full'>
          {/* Column 1: Featured Illustration */}
          <div className='row-span-3'>
            <NavigationMenuLink asChild>
              <Link
                className='flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-light-blue-bg/50 to-light-blue-bg p-6 no-underline outline-none focus:shadow-md'
                href={activeService?.href || ''}
              >
                {activeService.illustration?.mobile && (
                  <div className='mb-4 bg-dark-blue aspect-[231/256] rounded-bl-[70px] overflow-hidden'>
                    <Image
                      src={urlFor(activeService.illustration?.mobile).url()}
                      alt='Services'
                      width={231}
                      height={256}
                      className='w-full h-full object-contain'
                    />
                  </div>
                )}
                <div className='mb-2 mt-4 text-lg font-medium'>
                  {activeService.label}
                </div>
                {/* <p className='text-sm leading-tight text-muted-foreground'>
                Comprehensive legal solutions across all practice areas
                and industries.
              </p> */}
              </Link>
            </NavigationMenuLink>
          </div>

          {/* Column 2: Practices - Two Columns */}
          {(() => {
            const practicesSection = servicesRoute.subRoutes?.find(
              (sub) => sub.label === 'Practices'
            );

            if (!practicesSection?.subRoutes) return null;

            return (
              <>
                <ServiceSection
                  setActiveItem={setActiveService}
                  sectionLabel='Practices'
                  subRoutes={practicesSection.subRoutes.slice(0, 6)}
                />

                <ServiceSection
                  setActiveItem={setActiveService}
                  subRoutes={practicesSection.subRoutes.slice(6, 12)}
                />
              </>
            );
          })()}

          {/* Column 4: Industries */}
          {servicesRoute.subRoutes?.find(
            (sub) => sub.label === 'Industries'
          ) && (
            <ServiceSection
              setActiveItem={setActiveService}
              sectionLabel='Industries'
              subRoutes={
                servicesRoute.subRoutes.find(
                  (sub) => sub.label === 'Industries'
                )?.subRoutes || []
              }
            />
          )}

          {/* Column 5: Foreign Desks */}
          {servicesRoute.subRoutes?.find(
            (sub) => sub.label === 'Foreign Desks'
          ) && (
            <ServiceSection
              setActiveItem={setActiveService}
              sectionLabel='Foreign Desks'
              subRoutes={
                servicesRoute.subRoutes.find(
                  (sub) => sub.label === 'Foreign Desks'
                )?.subRoutes || []
              }
            />
          )}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

function ServiceSection({
  sectionLabel,
  subRoutes,
  setActiveItem,
}: {
  sectionLabel?: string;
  subRoutes: NavigationRoute[];
  setActiveItem: (item: NavigationRoute) => void;
}) {
  return (
    <div className='space-y-5 pt-6 pl-2'>
      <div className='h-8'>
        {sectionLabel && (
          <p className='text-lg text-dark-blue block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-transparent focus:bg-transparent'>
            {sectionLabel}
          </p>
        )}
      </div>
      <ul>
        {subRoutes?.map((subRoute) => (
          <li key={subRoute.href}>
            <MenuItemLink
              href={subRoute.href}
              label={subRoute.label}
              onMouseEnter={() => {
                setActiveItem(subRoute);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServicesMenu;
