import { POSTS_QUERYResult } from '@/sanity.types';
import Link from 'next/link';
import ArrowUpRight from '../ui/arrow-up-right';
import { cn } from '@/lib/utils';

const PostCard = ({
  post,
  className,
}: {
  post: POSTS_QUERYResult['allPosts'][number];
  className?: string;
}) => {
  return (
    <article
      className={cn(
        'bg-white rounded-bl-[2.5rem] xl:rounded-bl-[3rem] overflow-hidden aspect-[520/467] flex flex-col gap-3.5 md:gap-7.5 2xl:gap-13 px-side py-7 md:px-5 md:py-7.5 2xl:py-10 2xl:px-7',
        className
      )}
    >
      <div className='flex flex-col'>
        <p className='text-light-blue text-xxs 2xl:text-base'>{post.date}</p>
        <h3 className='mt-5 text-dark-blue text-2xl 2xl:text-3xl'>
          {post.title}
        </h3>
        <div className='mt-5 flex gap-2 flex-wrap'>
          {post.categories.slice(0, 3).map((category) => (
            <span
              key={category._id}
              className='flex items-center justify-center whitespace-nowrap text-xxs 2xl:text-sm text-dark-blue bg-dark-blue/20 rounded-[500px] h-7.5 px-3'
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>

      <Link href={`/bdknowledge/${post.slug.current}`} className='mt-auto'>
        <ArrowUpRight />
      </Link>
    </article>
  );
};

export default PostCard;
