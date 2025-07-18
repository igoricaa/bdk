'use client';

import { HrefRoute } from '@/src/lib/utils/navigation-routes';
import { NavigationMenuItem } from '@/src/components/ui/navigation-menu';
import { cn } from '@/src/lib/utils';
import { usePathname } from 'next/navigation';
import { TransitionLink } from '@/src/components/transition-link';

const SimpleNavigationItem = ({ route }: { route: HrefRoute }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <NavigationMenuItem key={route.href}>
      <TransitionLink
        href={route.href}
        pageName={route.label}
        className={cn(
          'inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1',
          isActive(route.href) && 'bg-light-blue-bg text-light-blue'
        )}
      >
        {route.label}
      </TransitionLink>
    </NavigationMenuItem>
  );
};

export default SimpleNavigationItem;
