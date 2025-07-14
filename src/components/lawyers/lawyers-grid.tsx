'use client';

import { LAWYERS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import { Image } from 'next-sanity/image';
import { urlForWithHotspot } from '@/src/sanity/lib/image';
import { TransitionLink } from '@/src/components/transition-link';
import { motion, AnimatePresence } from 'motion/react';
import { cn, ComputedLawyersData } from '@/src/lib/utils';
import LawyersNavbar from './lawyers-navbar';
import LinkedinIcon from '../ui/icons/linkedin-icon';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import Link from 'next/link';

// type SearchedLawyer = NonNullable<
//   LAWYERS_BY_CATEGORY_QUERYResult['categories'][0]['orderedLawyers']
// >[0];

// const fetchSearchedLawyers = async (
//   query: string,
//   category: string
// ): Promise<SearchedLawyer[]> => {
//   if (!query || query.trim().length < 2) {
//     return [];
//   }
//   const response = await fetch(
//     `/api/search/lawyers?q=${query}&category=${category}`
//   );
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

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

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return categoryFilteredLawyers.filter((lawyer) =>
      lawyer.name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [activeCategory, searchTerm, computedLawyersData]);

  // const currentLawyers =
  //   activeCategory === 'all'
  //     ? computedLawyersData.allLawyers
  //     : computedLawyersData.lawyersByCategory[activeCategory] || [];

  // const {
  //   data: searchedLawyers,
  //   isLoading,
  //   isError,
  // } = useQuery<SearchedLawyer[]>({
  //   // The queryKey now uses the local searchTerm state
  //   queryKey: ['lawyers', 'search', searchTerm, activeCategory],
  //   queryFn: () => fetchSearchedLawyers(searchTerm, activeCategory),
  //   enabled: isSearching,
  // });

  // let currentLawyers: SearchedLawyer[];
  // if (isSearching) {
  //   currentLawyers = searchedLawyers || [];
  // } else {
  //   currentLawyers =
  //     activeCategory === 'all'
  //       ? computedLawyersData.allLawyers
  //       : computedLawyersData.lawyersByCategory[activeCategory] || [];
  // }

  return (
    <section className={cn(className)}>
      <LawyersNavbar
        categories={computedLawyersData.filterOptions}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchTerm}
      />

      <AnimatePresence mode='wait'>
        <motion.div
          key={activeCategory}
          className='px-side grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-5 xl:gap-x-6 xl:gap-y-12 2xl:gap-x-7 2xl:gap-y-13 mt-8 md:mt-10 xl:mt-11 2xl:mt-12.5'
          layout
          initial='hidden'
          animate='visible'
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {displayedLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.slug.current} lawyer={lawyer} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default LawyersGrid;

const LawyerCard = ({
  lawyer,
}: {
  lawyer: NonNullable<
    LAWYERS_BY_CATEGORY_QUERYResult['categories'][0]['orderedLawyers']
  >[0];
}) => {
  return (
    <motion.article
      className='col-span-1'
      layout
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.4,
        },
      }}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 120,
        duration: 0.6,
      }}
    >
      <TransitionLink
        href={`/people/${lawyer.slug.current}`}
        pageName={lawyer.name}
        className='block'
      >
        <motion.div
          className='w-full rounded-lg md:rounded-2xl overflow-hidden aspect-[314/323]'
          transition={{ duration: 0.3 }}
        >
          <Image
            src={urlForWithHotspot(lawyer.picture, 471, 485, 'top').url() || ''}
            alt={lawyer.name}
            width={471}
            height={485}
            className='w-full h-full'
          />
        </motion.div>
      </TransitionLink>
      <motion.div
        className='py-5 md:py-3 md:px-2.5 xl:py-5 xl:px-4'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className='flex items-start gap-2 justify-between'>
          <TransitionLink
            href={`/people/${lawyer.slug?.current}`}
            pageName={lawyer.name}
            className='block'
          >
            <h2 className='text-dark-blue text-lg 2xl:text-xl'>
              {lawyer.name}
            </h2>
          </TransitionLink>
          {lawyer.contactInfo?.linkedin && (
            <Link
              href={lawyer.contactInfo.linkedin}
              target='_blank'
              className='hidden md:block'
            >
              <LinkedinIcon className='min-w-5 min-h-5 w-5 h-5 2xl:w-5.5 2xl:h-5.5 2xl:min-w-5.5 2xl:min-h-5.5' />
            </Link>
          )}
        </div>

        <p className='mt-2 md:mt-3 text-grey-text text-xxs md:text-sm 2xl:text-base'>
          {lawyer.title}
        </p>
        {lawyer.contactInfo?.linkedin && (
          <Link
            href={lawyer.contactInfo.linkedin}
            target='_blank'
            className='block mt-4 md:hidden'
          >
            <LinkedinIcon className='w-4 h-4' />
          </Link>
        )}
      </motion.div>
    </motion.article>
  );
};
