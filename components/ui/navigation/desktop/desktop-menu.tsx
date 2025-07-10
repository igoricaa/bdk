'use client';

import {
  NavigationMenu,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import { NavigationRoute } from '@/lib/utils/navigation-routes';
import ServicesMenu from './services-menu';
import BDKnowledgeMenu from './bdknowledge-menu';
import SimpleNavigationItem from './simple-menu-item';

function DesktopMenu({ routes }: { routes: NavigationRoute[] }) {
  // if (routes.length === 0)
  //   return <div className='text-white'>Loading routes...</div>;
  if (routes.length === 0) return null;

  return (
    <NavigationMenu
      viewport={false}
      className='hidden lg:flex'
      // value='Services'
      // value='BDKnowledge'
    >
      <NavigationMenuList className='gap-5 justify-start'>
        {routes.map((route) => {
          if (route.label === 'Services') {
            return <ServicesMenu key={route.href} servicesRoute={route} />;
          }
          if (route.label === 'BDKnowledge') {
            return (
              <BDKnowledgeMenu key={route.href} bdknowledgeRoute={route} />
            );
          }
          return <SimpleNavigationItem key={route.href} route={route} />;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default DesktopMenu;
