import { cn } from '@/src/lib/utils';

const PostSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'bg-white rounded-br-[2.5rem] xl:rounded-br-[3rem] overflow-hidden w-full min-h-[calc(354/362*(100vw-2*var(--padding-side)))] sm:min-h-auto md:aspect-[367/350] xl:aspect-[397/350]',
      className
    )}
  >
    <div className='flex flex-col gap-8 md:gap-7.5 2xl:gap-13 justify-between h-full px-side py-7 md:px-5 md:py-7.5 2xl:py-10 2xl:px-7'>
      <div className='flex flex-col'>
        {/* Date skeleton */}
        <div className='h-3 2xl:h-4 bg-gray-200 rounded w-16 animate-pulse shimmer'></div>
        
        {/* Title skeleton */}
        <div className='mt-5 space-y-2'>
          <div className='h-6 2xl:h-8 bg-gray-200 rounded animate-pulse shimmer'></div>
          <div className='h-6 2xl:h-8 bg-gray-200 rounded w-3/4 animate-pulse shimmer'></div>
        </div>
        
        {/* Categories skeleton */}
        <div className='mt-6 xl:mt-5 flex gap-2 flex-wrap'>
          <div className='h-7.5 bg-gray-200 rounded-[500px] w-16 animate-pulse shimmer'></div>
          <div className='h-7.5 bg-gray-200 rounded-[500px] w-20 animate-pulse shimmer'></div>
          <div className='h-7.5 bg-gray-200 rounded-[500px] w-14 animate-pulse shimmer'></div>
        </div>
      </div>

      {/* Arrow icon skeleton */}
      <div className='size-9 2xl:size-11 bg-gray-200 rounded-full animate-pulse shimmer'></div>
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
  </div>
);

export default PostSkeleton;
