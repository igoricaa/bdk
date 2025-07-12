import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import Link from 'next/link';
import ArrowUpRight from '../ui/arrow-up-right';
import { cn, formatDate } from '@/lib/utils';

const PostCard = ({
  post,
  className,
}: {
  post: POSTS_BY_CATEGORY_QUERYResult['posts'][number];
  className?: string;
}) => {
  return (
    <article
      className={cn(
        // aspect-[520/467]
        // sm:max-h-[calc(367/350*100%)]
        'bg-white rounded-br-[2.5rem] xl:rounded-br-[3rem] overflow-hidden min-h-[calc(354/362*(100vw-2*var(--padding-side)))] sm:min-h-auto md:aspect-[367/350] xl:aspect-[397/350]',
        className
      )}
    >
      <Link
        href={`/${post.slug.current}`}
        className='flex flex-col gap-8 md:gap-7.5 2xl:gap-13 justify-between h-full px-side py-7 md:px-5 md:py-7.5 2xl:py-10 2xl:px-7'
      >
        <div className='flex flex-col'>
          <p className='text-light-blue text-xxs 2xl:text-base'>
            {formatDate(post.date)}
          </p>
          <h3 className='mt-5 text-dark-blue text-2xl 2xl:text-3xl'>
            {post.title}
          </h3>
          <div className='mt-5 flex gap-2 flex-wrap'>
            {post.categories
              .slice(0, 3)
              .map(
                (category: {
                  _id: string;
                  name: string;
                  slug: { current: string };
                }) => (
                  <span
                    key={category._id}
                    className='flex items-center justify-center whitespace-nowrap text-xxs 2xl:text-sm text-dark-blue bg-dark-blue/20 rounded-[500px] h-7.5 px-3'
                  >
                    {category.name}
                  </span>
                )
              )}
          </div>
        </div>

        <ArrowUpRight />
      </Link>
    </article>
  );
};

export default PostCard;
