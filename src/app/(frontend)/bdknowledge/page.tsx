import { Post } from '@/sanity.types';
import { AnimateOnLoad } from '@/src/components/animations/animate-on-load';
import FeaturedPostsSection from '@/src/components/posts/featured-posts-section';
import PostsGrid from '@/src/components/posts/posts-grid';
import { FilterOption } from '@/src/components/ui/filter-buttons';
import {
  getGlobalFeaturedPosts,
  getPostsByCategory,
} from '@/src/sanity/lib/cached-queries';
import { Suspense } from 'react';

const BDKnowledgePage = async () => {
  const slug = 'all';
  const [featuredPosts, { posts }] = await Promise.all([
    getGlobalFeaturedPosts(slug),
    getPostsByCategory(slug),
  ]);

  if (!featuredPosts || !posts) {
    return <div>No posts found</div>;
  }

  const categoryFilterOptions: FilterOption[] = [
    { slug: 'all', label: 'All' },
    { slug: 'blog', label: 'Blog' },
    { slug: 'digital-watch', label: 'Digital Watch' },
    { slug: 'insights', label: 'Insights' },
    { slug: 'publications', label: 'Publications' },
  ];

  return (
    <main id='blogPage' className='pt-header'>
      <AnimateOnLoad>
        <FeaturedPostsSection
          featuredPosts={featuredPosts as Post[]}
          className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 '
        />
      </AnimateOnLoad>

      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsGrid
          heading='BDKnowledge'
          initialPosts={posts}
          showSidebar={false}
          categoryFilterOptions={categoryFilterOptions}
          initialCategory='all'
          initialYear='all'
        />
      </Suspense>
    </main>
  );
};

export default BDKnowledgePage;
