import { Industry, Practice } from '@/sanity.types';
import ServicesAccordion from './services-accordion';
import { urlFor } from '@/sanity/lib/image';

const ServicesSection = ({
  industries,
  practices,
  practicesIllustration,
  industriesIllustration,
}: {
  industries: Industry[];
  practices: Practice[];
  practicesIllustration: any;
  industriesIllustration: any;
}) => {
  return (
    <section className='group rounded-t-[2.5rem] pt-4 pb-25 md:pt-20 md:pb-37 xl:py-37 2xl:py-43 px-side flex md:gap-4 xl:gap-18 2xl:gap-24'>
      <ServicesAccordion
        className='w-7/12'
        industries={industries as Industry[]}
        practices={practices as Practice[]}
      />
      <div className='hidden md:block w-auto bg-dark-blue rounded-bl-[150px] overflow-hidden'>
        <img
          src={urlFor(practicesIllustration).url()}
          alt='Practices Illustration'
          className='object-cover w-full h-full group-has-[.accordion-practices[data-state="closed"]]:hidden'
        />
        <img
          src={urlFor(industriesIllustration).url()}
          alt='Industries Illustration'
          className='hidden object-cover w-full h-full group-has-[.accordion-industries[data-state="open"]]:block'
        />
      </div>
    </section>
  );
};

export default ServicesSection;
