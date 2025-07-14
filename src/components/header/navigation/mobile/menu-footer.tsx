import { cn } from '@/src/lib/utils';
import { TransitionLink } from '@/src/components/transition-link';

const MenuFooter = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn(
        'flex justify-between items-center gap-8 border-t border-lightest-blue py-5 mt-auto',
        className
      )}
    >
      <TransitionLink
        href='/privacy-notice'
        className='text-grey-light text-sm'
      >
        Privacy Notice
      </TransitionLink>
      <TransitionLink href='/cookie-policy' className='text-grey-light text-sm'>
        Cookie Policy
      </TransitionLink>
    </footer>
  );
};

export default MenuFooter;
