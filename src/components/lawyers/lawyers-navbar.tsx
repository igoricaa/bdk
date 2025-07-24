import { cn } from '@/src/lib/utils';
import FilterButtons, { FilterOption } from '../ui/filter-buttons';
import SearchBar from '../ui/search-bar';

const LawyersNavbar = ({
  categories,
  activeCategory,
  onCategoryChange,
  onSearchChange,
  className,
  searchBarClassName,
}: {
  categories: FilterOption[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
  className?: string;
  searchBarClassName?: string;
}) => {
  return (
    <div
      className={cn(
        'flex flex-col md:flex-row gap-4 xl:gap-10 md:justify-between md:items-center pl-side md:px-side',
        className
      )}
    >
      <div className={cn('w-full', searchBarClassName)}>
        <SearchBar onSearchChange={onSearchChange} />
      </div>
      <FilterButtons
        options={categories}
        activeOption={activeCategory}
        onOptionChange={onCategoryChange}
        variant='dark'
        className={cn('gap-0!', className)}
      />
    </div>
  );
};

export default LawyersNavbar;
