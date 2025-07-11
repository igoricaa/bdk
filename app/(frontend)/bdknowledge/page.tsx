import { Post } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';
import { FilterOption } from '@/components/ui/filter-buttons';
import { getPostsByCategory } from '@/sanity/lib/cached-queries';

const BDKnowledgePage = async () => {
  const [{ featuredPosts, allPosts }] = await Promise.all([
    getPostsByCategory('bdknowledge'),
  ]);

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
