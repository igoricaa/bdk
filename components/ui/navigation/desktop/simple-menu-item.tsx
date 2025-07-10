'use client';

import { NavigationRoute } from '@/lib/utils/navigation-routes';
import { NavigationMenuItem, NavigationMenuLink } from '../../navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SimpleNavigationItem = ({ route }: { route: NavigationRoute }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <NavigationMenuItem key={route.href}>
      <NavigationMenuLink
        asChild
        className={cn(
          'inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
          isActive(route.href) && 'bg-light-blue-bg text-light-blue'
        )}
      >
        <Link href={route.href}>{route.label}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

export default SimpleNavigationItem;
