import FilterButtons, { FilterOption } from '@/components/ui/filter-buttons';
import { cn } from '@/lib/utils';

interface LawyersFilterProps {
  categories: FilterOption[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  variant?: 'dark' | 'light';
  className?: string;
}

export default function LawyersFilter({
  categories,
  activeCategory,
  onCategoryChange,
  variant = 'light',
  className,
}: LawyersFilterProps) {
  return (
    <FilterButtons
      options={categories}
      activeOption={activeCategory}
      onOptionChange={onCategoryChange}
      variant={variant}
      className={cn('gap-0!', className)}
    />
  );
}
