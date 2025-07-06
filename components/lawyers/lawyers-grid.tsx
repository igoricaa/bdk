'use client';

import { SearchIcon } from 'lucide-react';
import LawyersFilter from './lawyers-filter';
import { PEOPLE_PAGE_QUERYResult } from '@/sanity.types';
import { useMemo, useState } from 'react';
import { FilterOption } from '../ui/filter-buttons';
import { Image } from 'next-sanity/image';
import { urlForUncropped } from '@/sanity/lib/image';
import Link from 'next/link';

const LawyersGrid = ({
  lawyersByCategory,
  categories,
}: {
  lawyersByCategory: Record<
    string,
    { lawyers: PEOPLE_PAGE_QUERYResult['lawyers'] }
  >;
  categories: FilterOption[];
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const currentLawyers = useMemo(() => {
    if (activeCategory === 'all') {
      return Object.values(lawyersByCategory).flatMap(
        (category) => category.lawyers
      );
    }
    return lawyersByCategory[activeCategory].lawyers;
  }, [activeCategory, lawyersByCategory]);

  return (
    // mt-14 md:mt-30 xl:mt-18 2xl:mt-40
    <section>
      <div className='flex flex-col md:flex-row gap-4 md:gap-5 xl:gap-10 md:justify-between md:items-center'>
        <SearchBar />
        <LawyersFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          variant='dark'
        />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 xl:gap-x-6 xl:gap-y-12 2xl:gap-x-7 2xl:gap-y-13 mt-4 md:mt-5 xl:mt-11 2xl:mt-12.5'>
        {currentLawyers.map((lawyer) => (
          <LawyerCard key={lawyer._id} lawyer={lawyer} />
        ))}
      </div>
    </section>
  );
};

export default LawyersGrid;

const SearchBar = () => {
  return (
    <div className='rounded-[500px] flex items-center gap-16 justify-between bg-lightest-blue/25 h-12.5 md:h-7.5 2xl:h-10 px-6'>
      <span className='text-grey-text md:text-sm'>Search for people</span>
      <SearchIcon
        className='w-4 h-4'
        strokeWidth={1}
        stroke='hsl(var(--grey-text))'
      />
    </div>
  );
};

const LawyerCard = ({
  lawyer,
}: {
  lawyer: PEOPLE_PAGE_QUERYResult['lawyers'][number];
}) => {
  return (
    <article className='col-span-1'>
      <Link href={`/people/${lawyer.slug?.current || ''}`} className='block'>
        <div className='w-full rounded-lg md:rounded-2xl overflow-hidden aspect-[314/323]'>
          <Image
            src={urlForUncropped(lawyer.picture).url() || ''}
            alt={lawyer.name}
            width={471}
            height={485}
            className='w-full h-full object-cover object-top'
          />
        </div>
        <div className='py-5 md:py-3 md:px-2.5 xl:py-5 xl:px-4'>
          <h2 className='text-dark-blue text-lg 2xl:text-xl'>{lawyer.name}</h2>
          <p className='mt-2 md:mt-3 text-grey-text text-xxs md:text-sm 2xl:text-base'>
            {lawyer.title}
          </p>
        </div>
      </Link>
    </article>
  );
};
