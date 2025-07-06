'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  label: string;
  count: number;
}

interface CategoriesFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoriesFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoriesFilterProps) {
  const availableCategories = categories.filter((cat) => cat.count > 0);

  if (availableCategories.length <= 1) {
    return null;
  }

  return (
    <div className='flex gap-1'>
      {availableCategories.map((category) => (
        <Button
          key={category.id}
          size='sm'
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            'transition-all duration-200 text-white text-sm rounded-full h-7.5 px-4 2xl:h-10 2xl:px-6 cursor-pointer',
            activeCategory === category.id
              ? 'bg-light-blue hover:bg-light-blue/80'
              : 'bg-white/10 hover:bg-white/20'
          )}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
