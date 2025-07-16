import { cn } from '@/src/lib/utils';
import { FilterOption } from '../ui/filter-buttons';
import SearchBar from '../ui/search-bar';
import LawyersFilter from './lawyers-filter';

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
      <LawyersFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
        variant='dark'
      />
    </div>
  );
};

export default LawyersNavbar;
