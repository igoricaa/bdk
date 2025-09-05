import { cn } from '@/src/lib/utils';
import { NavigationRoute } from '@/src/lib/utils/navigation-routes';
import {
  NavigationMenu,
  NavigationMenuList,
} from '@/src/components/ui/navigation-menu';
import BDKnowledgeMenu from './bdknowledge-menu';
import ServicesMenu from './services-menu';
import SimpleMenuDropdown from './simple-menu-dropdown';
import SimpleNavigationItem from './simple-menu-item';

const DesktopNavigation = async ({
  className,
  navigationRoutes,
}: {
  className?: string;
  navigationRoutes: NavigationRoute[];
}) => {
  if (navigationRoutes.length === 0)
    return <div className='text-white'>Loading routes...</div>;

  return (
    <nav id='desktopNav' className={cn('', className)}>
      <NavigationMenu
        viewport={false}
        className='hidden lg:flex'
        // value='About Us'
        // value='Expertise'
        // value='BDKnowledge'
      >
        <NavigationMenuList className='gap-5 justify-start'>
          {navigationRoutes.map((route) => {
            if (route.label === 'Expertise') {
              return <ServicesMenu key={route.label} servicesRoute={route} />;
            }
            if (route.label === 'BDKnowledge') {
              return (
                <BDKnowledgeMenu key={route.label} bdknowledgeRoute={route} />
              );
            }
            if (route.subRoutes) {
              return <SimpleMenuDropdown key={route.label} route={route} />;
            }
            return <SimpleNavigationItem key={route.label} route={route} />;
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default DesktopNavigation;
