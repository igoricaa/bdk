import { FilterOption } from '../ui/filter-buttons';
import SearchBar from '../ui/search-bar';
import LawyersFilter from './lawyers-filter';

const LawyersNavbar = ({
  categories,
  activeCategory,
  onCategoryChange,
}: {
  categories: FilterOption[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}) => {
  return (
    <div className='pl-side md:px-side flex flex-col md:flex-row gap-4 xl:gap-10 md:justify-between md:items-center'>
      <div className='lg:w-full lg:max-w-[calc((100%-2*20px)/3)] xl:max-w-[calc((100%-2*24px)/3)] 2xl:max-w-[calc((100%-3*28px)/4)] pr-side md:pr-0'>
        <SearchBar />
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
