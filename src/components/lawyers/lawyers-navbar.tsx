import { FilterOption } from '../ui/filter-buttons';
import SearchBar from '../ui/search-bar';
import LawyersFilter from './lawyers-filter';

const LawyersNavbar = ({
  categories,
  activeCategory,
  onCategoryChange,
  onSearchChange,
}: {
  categories: FilterOption[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearchChange: (query: string) => void;
}) => {
  return (
    <div className='pl-side md:px-side flex flex-col md:flex-row gap-4 xl:gap-10 md:justify-between md:items-center'>
      <div className='md:w-full md:max-w-[calc((100%-60px)/3)] lg:max-w-[calc((100vw-var(--padding-side)+20px)*0.23-20px)] 2xl:max-w-[calc((100vw-var(--padding-side)+32px)*0.23-32px)] pr-side md:pr-0'>
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
