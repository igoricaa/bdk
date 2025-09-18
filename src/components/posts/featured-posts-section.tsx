import { Post } from '@/sanity.types';
import FeaturedPostsCarousel from './featured-posts-carousel';
import { cn } from '@/src/lib/utils';

const FeaturedPostsSection = ({
  featuredPosts,
  className,
}: {
  featuredPosts: Post[];
  className?: string;
}) => {
  return (
    <section
    // pb-19 md:pb-21 xl:pb-30 2xl:pb-41
      className={cn('pb-19 xl:pb-0 flex flex-col justify-center', className)}
    >
      <FeaturedPostsCarousel featuredPosts={featuredPosts as Post[]} />
    </section>
  );
};

export default FeaturedPostsSection;
