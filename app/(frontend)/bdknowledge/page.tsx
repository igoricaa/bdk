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
    <main id='blogPage' className='pt-header'>
      <FeaturedPostsSection
        featuredPosts={featuredPosts as Post[]}
        className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 '
      />
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
