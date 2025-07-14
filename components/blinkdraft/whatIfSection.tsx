import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import Section from '../ui/section';
import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';
import { Plus } from 'lucide-react';

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
      <WhatIsAccordion descriptions={descriptions} />
    </Section>
  );
};

const WhatIsAccordion = ({
  className,
  descriptions,
}: {
  className?: string;
  descriptions: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['whatIsSection']['description'];
}) => {
  return (
    <Accordion
      type='single'
      collapsible
      className={cn(className, 'flex flex-col gap-3 md:gap-4')}
      defaultValue={`item-${descriptions[0]._key}`}
    >
      {descriptions.map((description) => (
        <WhatIsAccordionItem
          key={description._key}
          descriptionItem={description}
        />
      ))}
    </Accordion>
  );
};
const WhatIsAccordionItem = ({
  descriptionItem,
}: {
  descriptionItem: NonNullable<
    BLINKDRAFT_PAGE_QUERYResult['blinkdraftPage']
  >['whatIsSection']['description'][number];
}) => {
  return (
    <AccordionItem
      value={`item-${descriptionItem._key}`}
      className='bg-lightest-blue/25 rounded-2xl'
    >
      <AccordionTrigger
        className='text-dark-blue text-2xl md:text-3xl 2xl:text-4xl relative cursor-pointer p-5 pr-11 md:p-5 2xl:p-7.5'
        icon={<PlusIcon />}
      >
        {descriptionItem.title}
      </AccordionTrigger>
      <AccordionContent className='text-balance pb-6 md:pb-10 flex flex-col md:flex-row-reverse p-5 2xl:px-7.5'>
        <p className='text-grey-text text-lg 2xl:text-2xl leading-snug'>
          {descriptionItem.description}
        </p>
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

export default WhatIfSection;
