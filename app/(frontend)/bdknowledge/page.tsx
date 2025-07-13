import { Post } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';
import { FilterOption } from '@/components/ui/filter-buttons';
import {
  getGlobalFeaturedPosts,
  getPostsByCategory,
} from '@/sanity/lib/cached-queries';
import { Suspense } from 'react';

const BDKnowledgePage = async () => {
  const slug = 'all';
  const [featuredPosts, { posts }] = await Promise.all([
    getGlobalFeaturedPosts(slug),
    getPostsByCategory('all'),
  ]);

  if (!featuredPosts || !posts) {
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
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsGrid
          heading='BDKnowledge'
          categorySlug={slug}
          filterOptions={filterOptions}
          initialPosts={posts}
        />
      </Suspense>
    </main>
  );
};

export default BDKnowledgePage;
