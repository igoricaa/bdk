'use client';

import { SearchIcon } from 'lucide-react';
import LawyersFilter from './lawyers-filter';
import { PEOPLE_PAGE_QUERYResult } from '@/sanity.types';
import { useMemo, useState } from 'react';
import { FilterOption } from '../ui/filter-buttons';
import { Image } from 'next-sanity/image';
import { urlForUncropped } from '@/sanity/lib/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import SearchBar from '../ui/search-bar';

const LawyersGrid = ({
  lawyersByCategory,
  categories,
  className,
}: {
  lawyersByCategory: Record<
    string,
    { lawyers: PEOPLE_PAGE_QUERYResult['lawyers'] }
  >;
  categories: FilterOption[];
  className?: string;
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const currentLawyers = useMemo(() => {
    return lawyersByCategory[activeCategory]?.lawyers || [];
  }, [activeCategory, lawyersByCategory]);

  return (
    <section className={cn(className)}>
      <div className='pl-side md:px-side flex flex-col md:flex-row gap-4 xl:gap-10 md:justify-between md:items-center'>
        <div className='lg:w-full lg:max-w-[calc((100%-2*20px)/3)] xl:max-w-[calc((100%-2*24px)/3)] 2xl:max-w-[calc((100%-3*28px)/4)] pr-side md:pr-0'>
          <SearchBar />
        </div>
        <LawyersFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          variant='dark'
        />
      </div>

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
          {currentLawyers.map((lawyer, index) => (
            <LawyerCard key={lawyer._id} lawyer={lawyer} index={index} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default LawyersGrid;

const LawyerCard = ({
  lawyer,
  index,
}: {
  lawyer: PEOPLE_PAGE_QUERYResult['lawyers'][number];
  index: number;
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
      <Link href={`/people/${lawyer.slug?.current || ''}`} className='block'>
        <motion.div
          className='w-full rounded-lg md:rounded-2xl overflow-hidden aspect-[314/323]'
          transition={{ duration: 0.3 }}
        >
          <Image
            src={urlForUncropped(lawyer.picture).url() || ''}
            alt={lawyer.name}
            width={471}
            height={485}
            className='w-full h-full object-cover object-top'
          />
        </motion.div>
        <motion.div
          className='py-5 md:py-3 md:px-2.5 xl:py-5 xl:px-4'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          <h2 className='text-dark-blue text-lg 2xl:text-xl'>{lawyer.name}</h2>
          <p className='mt-2 md:mt-3 text-grey-text text-xxs md:text-sm 2xl:text-base'>
            {lawyer.title}
          </p>
        </motion.div>
      </Link>
    </motion.article>
  );
};
