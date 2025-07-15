import { cn } from '@/src/lib/utils';
import { CheckIcon } from 'lucide-react';

const CheckmarkIcon = ({
  className,
  checkmarkClassName,
}: {
  className?: string;
  checkmarkClassName?: string;
}) => {
  return (
    <div
      className={cn(
        'bg-light-blue text-white rounded-full flex items-center justify-center min-w-5 min-h-5 size-5 sm:min-w-6 sm:min-h-6 sm:size-6 2xl:min-w-8 2xl:min-h-8 2xl:size-8',
        className
      )}
    >
      <CheckIcon
        size={16}
        className={cn('size-4 sm:size-5 2xl:size-6 stroke-1', checkmarkClassName)}
      />
    </div>
  );
};

export default CheckmarkIcon;
