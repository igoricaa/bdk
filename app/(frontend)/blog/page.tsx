import { Post } from '@/sanity.types';
import FeaturedPostsSection from '@/components/posts/featured-posts-section';
import PostsGrid from '@/components/posts/posts-grid';
import { FilterOption } from '@/components/ui/filter-buttons';
import {
  getPostsByCategory,
  getYearsByCategory,
  getNestedCategories,
} from '@/sanity/lib/cached-queries';
import { buildCategoryTree, CategoryWithChildren } from '@/lib/utils';

interface BlogPageProps {
  searchParams?: Promise<{ category?: string }>;
}

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const params = await searchParams;
  const selectedCategory = params?.category || 'blog';

  const [{ featuredPosts, allPosts }, postDates, nestedCategoriesData] =
    await Promise.all([
      getPostsByCategory(selectedCategory),
      getYearsByCategory(selectedCategory),
      getNestedCategories('blog'),
    ]);

  if (!featuredPosts || !allPosts) {
    return <div>No posts found</div>;
  }

  // Build nested category tree
  const categoryTree = buildCategoryTree(
    nestedCategoriesData?.rootCategory || null,
    nestedCategoriesData?.allCategories || []
  );

  // Simple year filtering - fixed types
  const years = (postDates || [])
    .map((date: any) => new Date(date).getFullYear().toString())
    .filter((year: string) => parseInt(year) >= 2015);

  const availableYears = Array.from(new Set(years)).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const newestYear = availableYears[0] || new Date().getFullYear().toString();

  const filterOptions: FilterOption[] = [
    { slug: newestYear, label: 'Latest' },
    ...availableYears.slice(1).map((year: string) => ({
      slug: year,
      label: year,
    })),
  ];

  return (
    <main id='blogPage' className='pt-header'>
      <FeaturedPostsSection
        featuredPosts={featuredPosts as Post[]}
        className='mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35 '
      />

      <PostsGrid
        heading='Blog'
        filterOptions={filterOptions}
        initialPosts={allPosts}
        allPostsCount={allPosts.length}
        newestYear={newestYear}
        filterType='year'
        categorySlug={selectedCategory}
        categoryTree={categoryTree || undefined}
      />
    </main>
  );
};

export default BlogPage;
