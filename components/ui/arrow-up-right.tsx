import { ArrowUpRight as ArrowIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ArrowUpRight = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'bg-light-blue text-white rounded-full flex items-center justify-center w-9 h-9 2xl:w-11 2xl:h-11',
        className
      )}
    >
      <ArrowIcon
        size={32}
        strokeWidth={1}
        className='w-8 h-8 2xl:w-11 2xl:h-11'
      />
    </div>
  );
};

export default ArrowUpRight;
