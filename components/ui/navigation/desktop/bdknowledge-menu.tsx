'use client';

import { Image } from 'next-sanity/image';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from '../../navigation-menu';
import Link from 'next/link';
import { NavigationRoute } from '@/lib/utils/navigation-routes';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navMenuTriggerClasses = cn(
  'group inline-flex h-9 gap-x-1 w-max items-center justify-center rounded-md bg-background text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-light-blue-bg data-[state=open]:text-light-blue data-[state=open]:focus:bg-light-blue-bg data-[state=open]:bg-light-blue-bg/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1'
);

const BDKnowledgeMenu = ({
  bdknowledgeRoute,
}: {
  bdknowledgeRoute: NavigationRoute;
}) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<NavigationRoute>({
    label: 'BDKnowledge',
    href: '',
    subRoutes: [],
  });

  const isBDKnowledgeActive = () => {
    return (
      pathname.startsWith('/bdknowledge') ||
      pathname.startsWith('/blog') ||
      pathname.startsWith('/digital-watch') ||
      pathname.startsWith('/insights') ||
      pathname.startsWith('/publications')
    );
  };

  return (
    <NavigationMenuItem value='BDKnowledge'>
      <NavigationMenuTrigger
        className={cn(
          navMenuTriggerClasses,
          isBDKnowledgeActive() && 'bg-light-blue-bg text-light-blue'
        )}
      >
        <Link href={bdknowledgeRoute.href}>{bdknowledgeRoute.label}</Link>
      </NavigationMenuTrigger>
      <NavigationMenuContent className='fixed! left-1/2 -translate-x-1/2 top-24! mt-0!'>
        <div className='grid gap-5 min-w-3xl w-3xl lg:grid-cols-[270px_1fr_1fr]'>
          {/* Column 1: Featured Illustration */}
          <div className='row-span-3'>
            <NavigationMenuLink asChild>
              <Link
                className='flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                href='/bdknowledge'
              >
                {activeItem?.illustration?.desktop && (
                  <div className='mb-4 bg-dark-blue aspect-[231/256] rounded-bl-[70px] overflow-hidden'>
                    <Image
                      src={urlFor(activeItem?.illustration?.mobile).url()}
                      alt='BDKnowledge'
                      width={231}
                      height={256}
                      className='w-full h-full object-cover'
                    />
                  </div>
                )}
                <div className='mb-2 mt-4 text-lg font-medium'>
                  {activeItem?.label}
                </div>
                <p className='text-sm leading-tight text-muted-foreground'>
                  Comprehensive legal solutions across all practice areas and
                  industries.
                </p>
              </Link>
            </NavigationMenuLink>
          </div>

          <div className='row-span-3'>
            <ul className='grid gap-5 h-full'>
              {/* <li>
                <NavigationMenuLink asChild>
                  <Link href={bdknowledgeRoute.href}>
                    {bdknowledgeRoute.label}
                  </Link>
                </NavigationMenuLink>
              </li> */}
              {bdknowledgeRoute.subRoutes?.slice(0, 2).map((subRoute) => (
                <li key={subRoute.href} className=''>
                  <NavigationMenuLink asChild>
                    <Link href={subRoute.href}>{subRoute.label}</Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>

          <div className='row-span-3'>
            <ul className='grid gap-5 h-full'>
              {bdknowledgeRoute.subRoutes?.slice(2, 4).map((subRoute) => (
                <li key={subRoute.href}>
                  <NavigationMenuLink asChild>
                    <Link href={subRoute.href}>{subRoute.label}</Link>
                  </NavigationMenuLink>
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
