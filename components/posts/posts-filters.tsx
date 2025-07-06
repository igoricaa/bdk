'use client';

import FilterButtons from '@/components/ui/filter-buttons';

interface FIlterOption {
  name: string;
  slug: {
    current: string;
  };
}

interface PostsFiltersProps {
  options: FIlterOption[];
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  variant?: 'dark' | 'light';
}

export default function PostsFilters({
  options,
  activeCategory,
  onCategoryChange,
  variant = 'light',
}: PostsFiltersProps) {
  const filterOptions = options.map((option) => ({
    id: option.slug.current,
    label: option.name,
  }));

  return (
    <FilterButtons
      options={filterOptions}
      activeOption={activeCategory}
      onOptionChange={onCategoryChange}
      variant={variant}
    />
  );
}
