import Burger from './burger';
import { cn } from '@/src/lib/utils';

const DesktopScrollBurger = () => {
  return (
    <div
      id='desktopScrollBurger'
      className={cn(
        'fixed top-6 right-[var(--padding-side)] z-80 hidden xl:block',
        'opacity-0 pointer-events-none transition-all duration-300'
      )}
    >
      <Burger isOpen={false} className='xl:flex' />
    </div>
  );
};

export default DesktopScrollBurger;
