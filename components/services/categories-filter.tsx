'use client';

import FilterButtons from '@/components/ui/filter-buttons';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface CategoriesFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  variant?: 'dark' | 'light';
}

export default function CategoriesFilter({
  categories,
  activeCategory,
  onCategoryChange,
  variant = 'light',
}: CategoriesFilterProps) {
  return (
    <FilterButtons
      options={categories}
      activeOption={activeCategory}
      onOptionChange={onCategoryChange}
      variant={variant}
      minOptionsToShow={1}
    />
  );
}
