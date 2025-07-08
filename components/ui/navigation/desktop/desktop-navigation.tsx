import { cn } from '@/lib/utils';
import DesktopMenu from './desktop-menu';

const DesktopNavigation = async ({ className }: { className?: string }) => {
  return (
    <nav className={cn('', className)}>
      <DesktopMenu />
    </nav>
  );
};

export default DesktopNavigation;
