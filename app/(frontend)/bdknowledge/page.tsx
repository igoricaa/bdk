import { POSTS_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { Post, POSTS_QUERYResult } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';

const BDKnowledgePage = async () => {
  const { allPosts, featuredPosts }: POSTS_QUERYResult = await client.fetch(
    POSTS_QUERY,
    {
      slug: 'bdknowledge',
    }
  );

  if (!allPosts || !featuredPosts) {
    return <div>No posts found</div>;
  }

  return (
    <main className='pt-7.5 pb-19 md:pt-11 md:pb-21 xl:pt-18 xl:pb-30 2xl:pt-35 2xl:pb-40'>
      <FeaturedPostsSection featuredPosts={featuredPosts as Post[]} />
      <PostsGrid posts={allPosts as POSTS_QUERYResult['allPosts']} />
    </main>
  );
};

export default BDKnowledgePage;
