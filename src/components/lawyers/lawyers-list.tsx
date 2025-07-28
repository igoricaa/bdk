'use client';

import LawyerCard from './lawyers-card';
import { cn, ComputedLawyersData } from '@/src/lib/utils';
import { useIsMobile } from '@/src/lib/hooks/use-mobile';
import LawyersCarousel from './lawyers-carousel';
import LawyersNavbar from './lawyers-navbar';
import { normalizeString } from '@/src/lib/utils/normalize-string';
import { useMemo, useState } from 'react';
import { AnimateInView } from '../animations/animate-in-view';
import { AnimatePresence } from 'motion/react';

const LawyersList = ({
  computedLawyersData,
  gridLimit = 6,
  className,
  listClassName,
}: {
  computedLawyersData: ComputedLawyersData;
  gridLimit?: number;
  className?: string;
  listClassName?: string;
}) => {
  const isMobile = useIsMobile({ breakpoint: 1024 });
  const [activeCategory, setActiveCategory] = useState<string>('partner');
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
    <div className={className}>
      <LawyersNavbar
        categories={computedLawyersData.filterOptions}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchTerm}
        searchBarClassName='md:w-full md:max-w-[calc((100%-40px)/3)] lg:max-w-[calc((100vw-var(--padding-side)+20px)*0.23-20px)] 2xl:max-w-[calc((100vw-var(--padding-side)+32px)*0.23-32px)] pr-side md:pr-0'
        className='md:max-[890px]:flex-col md:max-[890px]:items-start'
      />
      {isMobile ? (
        <div
          className={cn(
            'grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5',
            listClassName
          )}
        >
          <AnimatePresence mode='wait'>
            {displayedLawyers.slice(0, gridLimit).map((lawyer, index) => (
              <AnimateInView
                key={`${lawyer.slug.current}`}
                className='w-fit'
                duration={0.2}
              >
                <LawyerCard
                  key={`${lawyer.slug.current}-${index}`}
                  lawyer={lawyer as any}
                />
              </AnimateInView>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <LawyersCarousel
          lawyers={displayedLawyers as any[]}
          className={listClassName}
        />
      )}
    </div>
  );
};

export default LawyersList;
