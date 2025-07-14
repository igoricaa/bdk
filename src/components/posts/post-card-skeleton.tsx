import { cn } from '@/src/lib/utils';

const PostSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      'bg-white rounded-br-[2.5rem] xl:rounded-br-[3rem] overflow-hidden aspect-[520/467] flex flex-col gap-3.5 md:gap-7.5 2xl:gap-13 px-side py-7 md:px-5 md:py-7.5 2xl:py-10 2xl:px-7 animate-pulse',
      className
    )}
  >
    <div className='h-48 bg-white/10 rounded-lg mb-4'></div>
    <div className='h-4 bg-white/10 rounded mb-2'></div>
    <div className='h-4 bg-white/10 rounded mb-2 w-3/4'></div>
    <div className='h-3 bg-white/10 rounded w-1/2'></div>
  </div>
);

export default PostSkeleton;
