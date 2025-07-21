import { POSTS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import { TransitionLink } from '@/src/components/transition-link';
import ArrowUpRight from '../ui/arrow-up-right';
import { cn, formatDate } from '@/src/lib/utils';
import { urlFor } from '@/src/sanity/lib/image';
import { Image } from 'next-sanity/image';

const PostCard = ({
  post,
  className,
}: {
  post: POSTS_BY_CATEGORY_QUERYResult['posts'][number];
  className?: string;
}) => {
  const featuredMediaUrl = post.featuredMedia
    ? urlFor(post.featuredMedia).url()
    : '';

  return (
    <article
      className={cn(
        'group relative bg-white rounded-br-[2.5rem] xl:rounded-br-[3rem] overflow-hidden min-h-[calc(354/362*(100vw-2*var(--padding-side)))] sm:min-h-auto md:aspect-[367/350] xl:aspect-[397/350] hover:rounded-none transition-all duration-300',
        className
      )}
    >
      {featuredMediaUrl && (
        <div className='absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 before:absolute before:inset-0 before:bg-light-blue/70 before:z-10'>
          <Image
            src={featuredMediaUrl}
            alt={post.title}
            fill
            className='object-cover object-center inset-0'
            sizes='(max-width: 1024px) 600px, 1000px'
          />
        </div>
      )}
      <TransitionLink
        href={`/${post.slug.current}`}
        pageName={post.title}
        className='relative z-10 flex flex-col gap-8 md:gap-7.5 2xl:gap-13 justify-between h-full px-side py-7 md:px-5 md:py-7.5 2xl:py-10 2xl:px-7'
      >
        <div className='flex flex-col'>
          <p className='text-light-blue text-xxs 2xl:text-base group-hover:text-white transition-colors duration-300'>
            {formatDate(post.date)}
          </p>
          <h3 className='mt-5 text-dark-blue text-2xl 2xl:text-3xl group-hover:text-white transition-colors duration-300'>
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
                    className='flex items-center justify-center whitespace-nowrap text-xxs 2xl:text-sm text-dark-blue bg-dark-blue/20 rounded-[500px] h-7.5 px-3 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300'
                  >
                    {category.name}
                  </span>
                )
              )}
          </div>
        </div>

        <ArrowUpRight />
      </TransitionLink>
    </article>
  );
};

export default PostCard;
