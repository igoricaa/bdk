'use client';

import { NavigationRoute } from '@/lib/utils/navigation-routes';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import MenuItemLink from './menu-item-link';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

const SimpleMenuDropdown = ({ route }: { route: NavigationRoute }) => {
  const pathname = usePathname();

  const isRouteActive = (href: string) => {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  const isActive = (route: NavigationRoute) => {
    if (!route) return false;

    if (route.href) {
      return isRouteActive(route.href);
    }

    return route.subRoutes?.some(
      (subRoute) => subRoute.href && isRouteActive(subRoute.href)
    );
  };

  return (
    <NavigationMenuItem className='relative' value={route.label}>
      <NavigationMenuTrigger
        className={cn(
          'group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-light-blue-bg data-[state=open]:text-light-blue data-[state=open]:focus:bg-light-blue-bg data-[state=open]:bg-light-blue-bg/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',

          isActive(route) && 'bg-light-blue-bg text-light-blue'
        )}
      >
        {route.label}
      </NavigationMenuTrigger>

      <NavigationMenuContent className='absolute top-18.5! mt-0! left-0 pl-3'>
        <ul className='grid w-[200px]'>
          {route.subRoutes?.map((subRoute) => (
            <li key={subRoute.href}>
              <MenuItemLink href={subRoute.href} label={subRoute.label} />
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default SimpleMenuDropdown;
