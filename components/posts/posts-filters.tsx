'use client';

import FilterButtons from '@/components/ui/filter-buttons';

interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  count: number | null;
}

interface PostsFiltersProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  allPostsCount: number;
  variant?: 'dark' | 'light';
}

export default function PostsFilters({
  categories,
  activeCategory,
  onCategoryChange,
  allPostsCount,
  variant = 'light',
}: PostsFiltersProps) {
  // Transform categories to generic filter options
  const filterOptions = categories
    .filter((cat) => cat.count && cat.count > 0)
    .map((cat) => ({
      id: cat.slug.current,
      label: cat.name,
      count: cat.count || 0,
    }));

  return (
    <FilterButtons
      options={filterOptions}
      activeOption={activeCategory}
      onOptionChange={onCategoryChange}
      variant={variant}
      showAllOption={{
        label: 'All',
        count: allPostsCount,
      }}
      minOptionsToShow={0}
    />
  );
}
