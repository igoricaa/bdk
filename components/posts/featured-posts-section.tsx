import { Post } from '@/sanity.types';
import FeaturedPostsCarousel from './featured-posts-carousel';

const FeaturedPostsSection = ({ featuredPosts }: { featuredPosts: Post[] }) => {
  return (
    <section className='px-side'>
      <FeaturedPostsCarousel featuredPosts={featuredPosts as Post[]} />
    </section>
  );
};

export default FeaturedPostsSection;