import { BDKNOWLEDGE_POSTS_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { BDKNOWLEDGE_POSTS_QUERYResult, Post } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';

const BDKnowledgePage = async () => {
  const { featuredPosts, allPosts, categories }: BDKNOWLEDGE_POSTS_QUERYResult =
    await sanityFetch({
      query: BDKNOWLEDGE_POSTS_QUERY,
      params: {
        slug: 'bdknowledge',
      },
      tags: ['bdknowledge'],
    });

  if (!featuredPosts || !allPosts) {
    return <div>No posts found</div>;
  }

  return (
    <main id='blogPage' className='pt-7.5 md:pt-11 xl:pt-18  2xl:pt-35 '>
      <FeaturedPostsSection featuredPosts={featuredPosts as Post[]} />
      {categories && categories.length > 0 && (
        <PostsGrid
          categories={categories || []}
          initialPosts={allPosts}
          allPostsCount={allPosts.length}
        />
      )}
    </main>
  );
};

export default BDKnowledgePage;
