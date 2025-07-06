'use client';

import FilterButtons, { FilterOption } from '@/components/ui/filter-buttons';

interface LawyersFilterProps {
  categories: FilterOption[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  variant?: 'dark' | 'light';
}

export default function LawyersFilter({
  categories,
  activeCategory,
  onCategoryChange,
  variant = 'light',
}: LawyersFilterProps) {
  return (
    <FilterButtons
      options={categories}
      activeOption={activeCategory}
      onOptionChange={onCategoryChange}
      variant={variant}
      className='gap-0!'
    />
  );
}
