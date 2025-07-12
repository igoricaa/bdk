import { cn } from '@/lib/utils';
import Link from 'next/link';

const MenuFooter = ({ className }: { className?: string }) => {
  return (
    <footer
      className={cn(
        'flex justify-between items-center gap-8 border-t border-lightest-blue py-5 mt-auto',
        className
      )}
    >
      <Link href='/privacy-notice' className='text-grey-light text-sm'>
        Privacy Notice
      </Link>
      <Link href='/cookie-policy' className='text-grey-light text-sm'>
        Cookie Policy
      </Link>
    </footer>
  );
};

export default MenuFooter;
