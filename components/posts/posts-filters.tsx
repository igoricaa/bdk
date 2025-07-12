import FilterButtons, { FilterOption } from '@/components/ui/filter-buttons';

interface PostsFiltersProps {
  options: FilterOption[];
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
  return (
    <FilterButtons
      options={options}
      activeOption={activeCategory}
      onOptionChange={onCategoryChange}
      variant={variant}
    />
  );
}
