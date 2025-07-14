'use client';

import FilterButtons, { FilterOption } from '@/src/components/ui/filter-buttons';

interface CategoriesFilterProps {
  options: FilterOption[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  variant?: 'dark' | 'light';
}

export default function CategoriesFilter({
  options,
  activeCategory,
  onCategoryChange,
  variant = 'light',
}: CategoriesFilterProps) {
  return (
    <FilterButtons
      options={options}
      activeOption={activeCategory}
      onOptionChange={onCategoryChange}
      variant={variant}
    />
  );
}
