import { Post } from '@/sanity.types';
import FeaturedPostsCarousel from './featured-posts-carousel';

const FeaturedPostsSection = ({ featuredPosts }: { featuredPosts: Post[] }) => {
  return (
    <section className='px-side pb-19 md:pb-21 xl:pb-30 2xl:pb-41'>
      <FeaturedPostsCarousel featuredPosts={featuredPosts as Post[]} />
    </section>
  );
};

export default FeaturedPostsSection;
