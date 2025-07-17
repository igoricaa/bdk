import { cn } from '@/src/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import Section from '../ui/section';
import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';
import { Plus } from 'lucide-react';
import { SimpleAccordion } from '../ui/accordions/simple-accordion';

const WhatIfSection = ({
  heading,
  descriptions,
}: {
  heading: string;
  descriptions: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['whatIsSection']['description'];
}) => {
  return (
    <Section
      variant='light'
      underColor='bg-dark-blue'
      className='flex flex-col lg:flex-row gap-8 lg:gap-21 2xl:gap-35'
    >
      <h2 className='text-dark-blue whitespace-nowrap text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl'>
        {heading}
      </h2>
      <SimpleAccordion items={descriptions} />
    </Section>
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

export default WhatIfSection;
