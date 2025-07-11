import { POSTS_BY_CATEGORY_QUERY } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/client';
import { Post, POSTS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';
import { FilterOption } from '@/components/ui/filter-buttons';

const BDKnowledgePage = async () => {
  const { featuredPosts, allPosts }: POSTS_BY_CATEGORY_QUERYResult =
    await sanityFetch({
      query: POSTS_BY_CATEGORY_QUERY,
      params: {
        slug: 'bdknowledge',
      },
      tags: ['posts', 'bdknowledge'],
    });

  if (!featuredPosts || !allPosts) {
    return <div>No posts found</div>;
  }

  const filterOptions: FilterOption[] = [
    { slug: 'all', label: 'All' },
    { slug: 'blog', label: 'Blog' },
    { slug: 'digital-watch', label: 'Digital Watch' },
    { slug: 'insights', label: 'Insights' },
    { slug: 'publications', label: 'Publications' },
  ];

  return (
    <main id='blogPage' className='pt-header'>
      <FeaturedPostsSection
        featuredPosts={featuredPosts as Post[]}
        className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 '
      />
      <PostsGrid
        heading='BDKnowledge'
        filterOptions={filterOptions}
        initialPosts={allPosts}
        allPostsCount={allPosts.length}
      />
    </main>
  );
};

export default BDKnowledgePage;
