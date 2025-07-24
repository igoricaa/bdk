import { ArrowLeft as ArrowIcon } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const ArrowLeft = ({
  className,
  strokeColor = '#fff',
  variant = 'light',
}: {
  className?: string;
  strokeColor?: string;
  variant?: 'light' | 'dark';
}) => {
  return (
    <div
      className={cn(
        ' text-white rounded-full flex items-center justify-center min-w-9 min-h-9 w-9 h-9 2xl:text-2xl transition-colors duration-300',
        variant === 'dark' && 'bg-dark-blue group-hover:bg-light-blue',
        variant === 'light' && 'bg-light-blue group-hover:bg-dark-blue',
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
