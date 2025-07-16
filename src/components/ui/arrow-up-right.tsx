import { ArrowUpRight as ArrowIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ArrowUpRight = ({
  className,
  arrowClassName,
}: {
  className?: string;
  arrowClassName?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-light-blue text-white rounded-full flex items-center justify-center size-9 2xl:size-11 hover:rotate-45 transition-transform duration-300 group-hover:rotate-45',
        className
      )}
    >
      <ArrowIcon
        size={32}
        strokeWidth={1}
        className={cn('size-8 2xl:size-11', arrowClassName)}
      />
    </div>
  );
};

export default ArrowUpRight;
