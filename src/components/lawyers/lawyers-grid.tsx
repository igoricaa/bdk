'use client';

import { LAWYERS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import { Image } from 'next-sanity/image';
import { urlForWithHotspot } from '@/src/sanity/lib/image';
import { TransitionLink } from '@/src/components/transition-link';
import { cn, ComputedLawyersData } from '@/src/lib/utils';
import LawyersNavbar from './lawyers-navbar';
import LinkedinIcon from '../ui/icons/linkedin-icon';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BlurFade } from '../animations/blur-fade';

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
            <BlurFade delay={0.1}>
              <LawyerCard lawyer={lawyer} />
            </BlurFade>
          </li>
        ))}
      </ul>
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
    <article data-cursor-hover='true' data-cursor-text='View Profile'>
      <TransitionLink
        href={`/people/${lawyer.slug.current}`}
        pageName={lawyer.name}
        className='block'
      >
        <div className='w-full rounded-lg md:rounded-2xl overflow-hidden aspect-[314/323]'>
          <Image
            src={urlForWithHotspot(lawyer.picture, 471, 485).url() || ''}
            alt={lawyer.name}
            width={471}
            height={485}
            className='w-full object-cover'
          />
        </div>
      </TransitionLink>
      <div className='py-5 md:py-3 md:px-2.5 xl:py-5 xl:px-4'>
        <div className='flex items-start gap-2 justify-between'>
          <TransitionLink
            href={`/people/${lawyer.slug?.current}`}
            pageName={lawyer.name}
            className='block'
          >
            <h2 className='text-dark-blue text-lg xl:text-xl 2xl:text-[22px]'>
              {lawyer.name}
            </h2>
          </TransitionLink>
          {lawyer.contactInfo?.linkedin && (
            <Link
              href={lawyer.contactInfo.linkedin}
              target='_blank'
              className='hidden md:block'
              data-cursor-exempt='true'
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
            data-cursor-exempt='true'
          >
            <LinkedinIcon className='w-4 h-4' />
          </Link>
        )}
      </div>
    </article>
  );
};
