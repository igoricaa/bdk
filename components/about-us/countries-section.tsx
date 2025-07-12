'use client';

import { GENERAL_INFO_QUERYResult } from '@/sanity.types';
import { cn } from '@/lib/utils';
import { PortableTextBlock } from 'next-sanity';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import Subtitle from '../ui/subtitle';
import Section from '../ui/section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { urlFor } from '@/sanity/lib/image';
import PortableText from '../ui/portable-text';

export const CountriesSection = ({
  countries,
}: {
  countries: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['countries'];
}) => {
  const [activeCountry, setActiveCountry] = useState(countries[0]);

  return (
    <Section id='countries' variant='blue'>
      <Subtitle variation='dark'>Countries</Subtitle>

      <div className='flex xl:gap-18 2xl:gap-24 mt-6 md:mt-7.5 xl:mt-12 2xl:mt-17'>
        <CountriesAccordion
          countries={countries}
          setActiveCountry={setActiveCountry}
          className='w-full'
        />
        <div className='hidden xl:block w-full min-w-md max-w-[35%] aspect-[432/480] h-fit bg-dark-blue rounded-bl-[100px] md:rounded-bl-[120px] xl:rounded-bl-[150px] overflow-hidden'>
          <img
            src={urlFor(activeCountry.countryIllustration).url()}
            alt={`BDK Advokati - ${activeCountry.name}`}
            className='object-contain w-full h-full'
          />
        </div>
      </div>
    </Section>
  );
};

const CountriesAccordion = ({
  className,
  countries,
  setActiveCountry,
}: {
  className?: string;
  countries: NonNullable<GENERAL_INFO_QUERYResult['generalInfo']>['countries'];
  setActiveCountry: (
    country: NonNullable<
      GENERAL_INFO_QUERYResult['generalInfo']
    >['countries'][number]
  ) => void;
}) => {
  return (
    <Accordion
      type='single'
      collapsible
      className={cn(className, 'flex flex-col gap-3 md:gap-4')}
      defaultValue={`item-${countries[0]._id}`}
    >
      {countries.map((country) => (
        <CountriesAccordionItem
          key={country._id}
          country={country}
          setActiveCountry={setActiveCountry}
        />
      ))}
    </Accordion>
  );
};
const CountriesAccordionItem = ({
  country,
  setActiveCountry,
}: {
  country: NonNullable<
    GENERAL_INFO_QUERYResult['generalInfo']
  >['countries'][number];
  setActiveCountry: (
    country: NonNullable<
      GENERAL_INFO_QUERYResult['generalInfo']
    >['countries'][number]
  ) => void;
}) => {
  return (
    <AccordionItem
      value={`item-${country._id}`}
      className='bg-white rounded-2xl'
    >
      <AccordionTrigger
        className='text-dark-blue text-2xl md:text-3xl xl:text-[2.5rem] relative cursor-pointer px-5 py-4 md:py-5.5'
        icon={<PlusIcon />}
        onClick={() => setActiveCountry(country)}
      >
        {country.name}
      </AccordionTrigger>
      <AccordionContent className='text-balance pb-6 md:pb-10 flex flex-col md:flex-row-reverse px-5'>
        <div className='xl:hidden w-full h-fit bg-dark-blue rounded-bl-[100px] md:rounded-bl-[120px] overflow-hidden aspect-square md:aspect-[315/373] md:min-w-xs'>
          <img
            src={urlFor(country.countryIllustration).url()}
            alt={`BDK Advokati - ${country.name}`}
            className='object-contain w-full h-full'
          />
        </div>
        <PortableText
          className='text-grey-text mt-8 md:mt-0 2xl:mt-6 px-5 md:pl-0 md:pr-12'
          paragraphClassName='text-base leading-5 md:text-lg md:leading-6 md:mt-8'
          value={country.description as PortableTextBlock[]}
        />
      </AccordionContent>
    </AccordionItem>
  );
};

const PlusIcon = () => {
  return (
    <Plus
      className={cn(
        'absolute right-2 xl:right-1.5 top-1/2 -translate-y-1/2 text-light-blue pointer-events-none size-11 xl:size-14 shrink-0 transition-transform duration-200'
      )}
      strokeWidth={0.5}
    />
  );
};
