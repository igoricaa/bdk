import Section from '../ui/section';
import { BLINKDRAFT_PAGE_QUERYResult } from '@/sanity.types';
import { SimpleAccordionWithScroll } from '../ui/accordions/simple-accordion-with-scroll';

const WhatIsSection = ({
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
      <SimpleAccordionWithScroll items={descriptions} />
    </Section>
  );
};

export default WhatIsSection;
