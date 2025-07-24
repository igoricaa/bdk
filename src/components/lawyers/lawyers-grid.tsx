'use client';

import { cn, ComputedLawyersData } from '@/src/lib/utils';
import LawyersNavbar from './lawyers-navbar';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import { BlurFade } from '../animations/blur-fade';
import LawyerCardGrid from './lawyers-card-grid';
import { normalizeString } from '@/src/lib/utils/normalize-string';

const LawyersGrid = ({
  computedLawyersData,
  className,
}: {
  computedLawyersData: ComputedLawyersData;
  className?: string;
}) => {
  const [activeCategory, setActiveCategory] = useQueryState('category', {
    defaultValue: 'all',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const displayedLawyers = useMemo(() => {
    const categoryFilteredLawyers =
      activeCategory === 'all'
        ? computedLawyersData.allLawyers
        : computedLawyersData.lawyersByCategory[activeCategory] || [];

    if (!searchTerm || searchTerm.trim() === '') {
      return categoryFilteredLawyers;
    }

    const normalizedSearchTerm = normalizeString(searchTerm);
    return categoryFilteredLawyers.filter((lawyer) =>
      normalizeString(lawyer.name).includes(normalizedSearchTerm)
    );
  }, [activeCategory, searchTerm, computedLawyersData]);

  return (
    <section className={cn(className)}>
      <LawyersNavbar
        categories={computedLawyersData.filterOptions}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchTerm}
        className='md:max-[890px]:flex-col md:max-[890px]:items-start'
        searchBarClassName='md:max-w-[calc((100vw-2*var(--padding-side)-40px)/3)] 2xl:max-w-[calc((1550px-2*var(--padding-side)-84px)/4)] min-[1800px]:max-w-[calc((1800px-2*var(--padding-side)-84px)/4)]!'
      />

      <ul
        key={activeCategory}
        className='px-side grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 xl:gap-x-6 xl:gap-y-12 2xl:gap-x-7 2xl:gap-y-13 mt-8 md:mt-10 xl:mt-11 2xl:mt-12.5 lg:has-[li:hover]:[&>li]:blur-xxs'
      >
        {displayedLawyers.map((lawyer) => (
          <li
            key={lawyer.slug.current}
            className='col-span-1 duration-300 transition-blur hover:!blur-none'
          >
            <BlurFade delay={0.1} data-cursor-zone='lawyers-card'>
              <LawyerCardGrid lawyer={lawyer} />
            </BlurFade>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LawyersGrid;
