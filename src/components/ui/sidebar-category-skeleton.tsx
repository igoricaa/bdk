import { cn } from '@/src/lib/utils';

interface SidebarCategorySkeletonProps {
  className?: string;
  forPosts?: boolean;
}

const SidebarCategorySkeleton = ({
  className,
  forPosts = false,
}: SidebarCategorySkeletonProps) => {
  return (
    <>
      {forPosts && (
        <div className='lg:hidden py-2.5 md:py-5'>
          <div className='flex items-center justify-between text-lg py-0'>
            <div className='h-5 md:h-6 bg-gray-200 rounded w-32 animate-pulse shimmer'></div>
            <div className='size-6 md:size-8 bg-gray-200 rounded animate-pulse shimmer'></div>
          </div>
        </div>
      )}

      <div
        className={cn(
          'flex flex-col gap-2.5 h-fit',
          forPosts ? 'hidden lg:block' : '',
          className
        )}
      >
        <div className='px-4 py-2.5'>
          <div className='h-6 2xl:h-7 bg-gray-200 rounded w-40 animate-pulse shimmer'></div>
        </div>

        <div className='flex flex-col gap-2.5'>
          <div>
            <div className='py-2.5 pl-4 pr-2.5 2xl:py-3.25 2xl:pl-5 2xl:pr-3 bg-light-blue/15 flex items-center justify-between'>
              <div className='h-5 2xl:h-6 bg-gray-200 rounded w-32 animate-pulse shimmer'></div>
              <div className='size-6 2xl:size-8 bg-gray-200 rounded animate-pulse shimmer'></div>
            </div>

            <div className='pl-13 2xl:pl-15 py-4 2xl:py-8'>
              <div className='space-y-4 2xl:space-y-4.75'>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className='flex items-center gap-x-2'>
                    <div
                      className={cn(
                        'h-4 2xl:h-5 bg-gray-200 rounded animate-pulse shimmer',
                        index === 0 ? 'w-28' : index === 1 ? 'w-24' : 'w-32'
                      )}
                    ></div>
                    <div className='size-5 bg-gray-200 rounded animate-pulse shimmer'></div>
                  </div>
                ))}

                <div className='ml-4'>
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex items-center gap-x-2',
                        index > 0 && 'mt-4 2xl:mt-4.75'
                      )}
                    >
                      <div
                        className={cn(
                          'h-4 2xl:h-5 bg-gray-200 rounded animate-pulse shimmer',
                          index === 0 ? 'w-20' : 'w-26'
                        )}
                      ></div>
                      <div className='size-5 bg-gray-200 rounded animate-pulse shimmer'></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className='py-2.5 pl-4 pr-2.5 2xl:py-3.25 2xl:pl-5 2xl:pr-3 bg-light-blue/15 flex items-center justify-between'>
              <div className='h-5 2xl:h-6 bg-gray-200 rounded w-28 animate-pulse shimmer'></div>
              <div className='size-6 2xl:size-8 bg-gray-200 rounded animate-pulse shimmer'></div>
            </div>
          </div>

          <div>
            <div className='py-2.5 pl-4 pr-2.5 2xl:py-3.25 2xl:pl-5 2xl:pr-3 bg-light-blue/15 flex items-center justify-between'>
              <div className='h-5 2xl:h-6 bg-gray-200 rounded w-36 animate-pulse shimmer'></div>
              <div className='size-6 2xl:size-8 bg-gray-200 rounded animate-pulse shimmer'></div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .shimmer {
          background: linear-gradient(
            90deg,
            #f1f5f9 25%,
            #e2e8f0 50%,
            #f1f5f9 75%
          );
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

export default SidebarCategorySkeleton;
