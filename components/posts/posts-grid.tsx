import { POSTS_QUERYResult } from '@/sanity.types';
import SectionHeader from '../ui/section-header/section-header';
import PostCard from './post-card';
import { cn } from '@/lib/utils';

const PostsGrid = ({
  posts,
  className,
}: {
  posts: POSTS_QUERYResult['allPosts'];
  className?: string;
}) => {
  return (
    <section
      className={cn(
        'px-side pt-19 pb-25 md:pt-25 md:pb-28 xl:py-30 2xl:py-42 bg-light-blue-bg rounded-t-main',
        className
      )}
    >
      <SectionHeader heading='BDKnowledge' colorVariant='dark' />

      <div className='mt-12 md:mt-5 xl:mt-11 2xl:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6 xl:gap-9'>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostsGrid;
