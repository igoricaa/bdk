'use client';

import { NavigationRoute } from '@/src/lib/utils/navigation-routes';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '@/src/components/ui/navigation-menu';
import { Image } from 'next-sanity/image';
import { cn } from '@/src/lib/utils';
import { urlFor } from '@/src/sanity/lib/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MenuItemLink from './menu-item-link';
import { TransitionLink } from '@/src/components/transition-link';

const navMenuTriggerClasses = cn(
  'group inline-flex h-9 gap-x-1 w-max items-center justify-center rounded-md text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-light-blue-bg data-[state=open]:text-light-blue data-[state=open]:focus:bg-light-blue-bg data-[state=open]:bg-light-blue-bg/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1'
);

const BDKnowledgeMenu = ({
  bdknowledgeRoute,
}: {
  bdknowledgeRoute: NavigationRoute;
}) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] =
    useState<NavigationRoute>(bdknowledgeRoute.subRoutes?.[0] as NavigationRoute);

  const isBDKnowledgeActive = () => {
    return (
      pathname.startsWith('/bdknowledge') ||
      pathname.startsWith('/blog') ||
      pathname.startsWith('/digital-watch') ||
      pathname.startsWith('/insights') ||
      pathname.startsWith('/publications')
    );
  };

  const isRouteActive = (route: NavigationRoute) => {
    return activeItem.label === route.label;
  };

  return (
    <NavigationMenuItem value='BDKnowledge'>
      <NavigationMenuTrigger
        className={cn(
          navMenuTriggerClasses,
          isBDKnowledgeActive() && 'bg-light-blue-bg text-light-blue'
        )}
      >
        {bdknowledgeRoute.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent className='absolute! top-19! right-0 left-auto mt-0! bg-white'>
        <div className='grid gap-5 w-lg lg:grid-cols-[270px_1fr] h-full'>
          <div className='row-span-3'>
            <NavigationMenuLink asChild>
              <TransitionLink
                className='flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-light-blue-bg/50 to-light-blue-bg p-6 no-underline outline-none focus:shadow-md'
                href={activeItem?.href || ''}
              >
                {activeItem.illustration?.desktop && (
                  <div className='mb-4 bg-dark-blue aspect-[231/256] rounded-bl-[70px] overflow-hidden'>
                    <Image
                      src={urlFor(activeItem.illustration?.desktop).url()}
                      alt='BDKnowledge'
                      width={231}
                      height={256}
                      className='w-full h-full object-contain'
                    />
                  </div>
                )}
                <div className='mb-2 mt-4 text-lg font-medium'>
                  {activeItem.label}
                </div>
              </TransitionLink>
            </NavigationMenuLink>
          </div>

          {/* Column 2: Practices - Two Columns */}
          <div className='space-y-5 pt-6 pl-2'>
            <ul>
              {/* <MenuItemLink
                href={bdknowledgeRoute.href}
                label={bdknowledgeRoute.label}
                onMouseEnter={() => {
                  setActiveItem(bdknowledgeRoute);
                }}
                isActive={isRouteActive(bdknowledgeRoute)}
              /> */}
              {bdknowledgeRoute.subRoutes?.map((subRoute) => (
                <li key={subRoute.href}>
                  <MenuItemLink
                    href={subRoute.href}
                    label={subRoute.label}
                    onMouseEnter={() => {
                      setActiveItem(subRoute);
                    }}
                    isActive={isRouteActive(subRoute)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default BDKnowledgeMenu;
