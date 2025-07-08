'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { NavigationRoute } from '@/lib/utils/navigation-routes';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';

function DesktopMenu({ routes }: { routes: NavigationRoute[] }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const isServicesActive = () => {
    return (
      pathname.startsWith('/practices') ||
      pathname.startsWith('/industries') ||
      pathname.startsWith('/foreign-desks') ||
      pathname.startsWith('/services')
    );
  };

  const isBDKnowledgeActive = () => {
    return (
      pathname.startsWith('/bdknowledge') ||
      pathname.startsWith('/blog') ||
      pathname.startsWith('/digital-watch') ||
      pathname.startsWith('/insights') ||
      pathname.startsWith('/publications')
    );
  };

  const servicesRoute = routes.find((route) => route.label === 'Services');
  const bdknowledgeRoute = routes.find(
    (route) => route.label === 'BDKnowledge'
  );

  // if (routes.length === 0)
  //   return <div className='text-white'>Loading routes...</div>;
  if (routes.length === 0) return null;

  return (
    <NavigationMenu
      viewport={false}
      className='hidden lg:flex'
      // value='Services'
    >
      <NavigationMenuList className='gap-5 justify-start'>
        {/* Simple Navigation Items */}
        {routes
          .filter((route) => !route.subRoutes)
          .map((route) => (
            <NavigationMenuItem key={route.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
                  isActive(route.href) && 'bg-light-blue-bg text-light-blue'
                )}
              >
                <Link href={route.href}>{route.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}

        {/* Services Dropdown - 4 Column Layout */}
        {servicesRoute && (
          // value='Services'
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-light-blue-bg data-[state=open]:text-light-blue data-[state=open]:focus:bg-light-blue-bg data-[state=open]:bg-light-blue-bg/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
                isServicesActive() && 'bg-light-blue-bg text-light-blue'
              )}
            >
              {servicesRoute.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent className='fixed left-1/2 -translate-x-1/2 top-18!'>
              <div className='grid gap-5 min-w-7xl w-7xl lg:grid-cols-[.75fr_1fr_1fr_1fr]'>
                {/* Column 1: Featured Illustration */}
                <div className='row-span-3'>
                  <NavigationMenuLink asChild>
                    <Link
                      className='flex h-full w-full select-none flex-col rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                      href='/services'
                    >
                      {servicesRoute.subRoutes?.[0]?.subRoutes?.[0]
                        ?.illustration?.desktop && (
                        <div className='mb-4 bg-dark-blue aspect-[231/256] rounded-bl-[70px] overflow-hidden'>
                          <Image
                            src={urlFor(
                              servicesRoute.subRoutes[0].subRoutes[0]
                                .illustration.desktop
                            ).url()}
                            alt='Services'
                            width={231}
                            height={256}
                            className='w-full h-full object-cover'
                          />
                        </div>
                      )}
                      <div className='mb-2 mt-4 text-lg font-medium'>
                        Services
                      </div>
                      <p className='text-sm leading-tight text-muted-foreground'>
                        Comprehensive legal solutions across all practice areas
                        and industries.
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>

                {/* Column 2: Practices */}
                {servicesRoute.subRoutes?.find(
                  (sub) => sub.label === 'Practices'
                ) && (
                  <ServiceSection
                    section={
                      servicesRoute.subRoutes.find(
                        (sub) => sub.label === 'Practices'
                      )!
                    }
                    showIllustrations={true}
                  />
                )}

                {/* Column 3: Industries */}
                {servicesRoute.subRoutes?.find(
                  (sub) => sub.label === 'Industries'
                ) && (
                  <ServiceSection
                    section={
                      servicesRoute.subRoutes.find(
                        (sub) => sub.label === 'Industries'
                      )!
                    }
                    showIllustrations={true}
                  />
                )}

                {/* Column 4: Foreign Desks */}
                {servicesRoute.subRoutes?.find(
                  (sub) => sub.label === 'Foreign Desks'
                ) && (
                  <ServiceSection
                    section={
                      servicesRoute.subRoutes.find(
                        (sub) => sub.label === 'Foreign Desks'
                      )!
                    }
                    showIllustrations={false}
                  />
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}

        {/* BDKnowledge Dropdown - Simple Layout */}
        {bdknowledgeRoute && (
          <NavigationMenuItem>
            <NavigationMenuTrigger
              className={cn(
                'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-light-blue-bg data-[state=open]:text-light-blue data-[state=open]:focus:bg-light-blue-bg data-[state=open]:bg-light-blue-bg/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
                isBDKnowledgeActive() && 'bg-light-blue-bg text-light-blue'
              )}
            >
              {bdknowledgeRoute.label}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className='grid w-[300px] gap-5'>
                <li>
                  <NavigationMenuLink asChild>
                    <Link
                      href={bdknowledgeRoute.href}
                      className='block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                    >
                      <div className='text-sm font-medium'>
                        {bdknowledgeRoute.label}
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                {bdknowledgeRoute.subRoutes?.map((subRoute) => (
                  <li key={subRoute.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={subRoute.href}
                        className='block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
                      >
                        <div className='text-sm font-medium'>
                          {subRoute.label}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface ServiceSectionProps {
  section: NavigationRoute;
  showIllustrations: boolean;
}

function ServiceSection({ section, showIllustrations }: ServiceSectionProps) {
  return (
    <div className='space-y-5'>
      <div>
        <NavigationMenuLink asChild>
          <Link
            href={section.href}
            className='block select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
          >
            <div className='text-sm font-medium'>{section.label}</div>
          </Link>
        </NavigationMenuLink>
      </div>
      <div className='space-y-5'>
        {section.subRoutes?.map((subRoute) => (
          <NavigationMenuLink asChild key={subRoute.href}>
            <Link
              href={subRoute.href}
              className='mb-0 gap-3 select-none rounded-md leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground'
            >
              <div className='text-sm'>{subRoute.label}</div>
            </Link>
          </NavigationMenuLink>
        ))}
      </div>
    </div>
  );
}

export default DesktopMenu;
