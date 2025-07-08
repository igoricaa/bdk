import { cn } from '@/lib/utils';
import DesktopMenu from './desktop-menu';
import { NavigationRoute } from '@/lib/utils/navigation-routes';

const DesktopNavigation = async ({
  className,
  navigationRoutes,
}: {
  className?: string;
  navigationRoutes: NavigationRoute[];
}) => {
  return (
    <nav className={cn('', className)}>
      <DesktopMenu routes={navigationRoutes} />
    </nav>
  );
};

export default DesktopNavigation;
