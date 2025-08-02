import { cn } from '@/src/lib/utils';

interface FilterButtonsSkeletonProps {
  variant?: 'dark' | 'light';
  className?: string;
  count?: number;
}

const FilterButtonsSkeleton = ({ 
  variant = 'light', 
  className,
  count = 4 
}: FilterButtonsSkeletonProps) => {
  return (
    <>
      <div
        className={cn(
          'flex gap-1 2xl:gap-2.5',
          className
        )}
      >
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'rounded-full h-7.5 2xl:h-10 animate-pulse shimmer',
              // Different widths to simulate different button text lengths
              index === 0 ? 'w-16' : 
              index === 1 ? 'w-20' : 
              index === 2 ? 'w-14' : 'w-18',
              variant === 'dark' 
                ? 'bg-gray-200 border border-gray-300' 
                : 'bg-gray-200'
            )}
          />
        ))}
      </div>
      
      <style jsx>{`
        .shimmer {
          background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
          background-size: 200% 100%;
          animation: shimmer 2.75s infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </>
  );
};

export default FilterButtonsSkeleton;