import { Post } from '@/sanity.types';
import FeaturedPostsCarousel from './featured-posts-carousel';
import { cn } from '@/lib/utils';

const FeaturedPostsSection = ({
  featuredPosts,
  className,
}: {
  featuredPosts: Post[];
  className?: string;
}) => {
  return (
    <section
      className={cn('px-side pb-19 md:pb-21 xl:pb-30 2xl:pb-41', className)}
    >
      <FeaturedPostsCarousel featuredPosts={featuredPosts as Post[]} />
    </section>
  );
};

export default FeaturedPostsSection;
