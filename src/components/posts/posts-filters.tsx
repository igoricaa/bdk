import FilterButtons, { FilterOption } from '@/src/components/ui/filter-buttons';

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
      className='w-full pl-side md:pl-0 lg:w-fit'
    />
  );
}
