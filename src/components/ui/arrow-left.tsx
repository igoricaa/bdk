import { ArrowLeft as ArrowIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ArrowLeft = ({
  className,
  strokeColor = '#fff',
}: {
  className?: string;
  strokeColor?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-light-blue text-white rounded-full flex items-center justify-center w-9 h-9 2xl:text-2xl',
        className
      )}
    >
      <ArrowIcon
        size={32}
        strokeWidth={1}
        className='w-8 h-8'
        stroke={strokeColor}
      />
    </div>
  );
};

export default ArrowLeft;
