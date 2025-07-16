'use client';

import { GENERAL_INFO_QUERYResult, Industry, Practice } from '@/sanity.types';
import ServicesAccordion from './services-accordion';
import { urlFor } from '@/src/sanity/lib/image';
import { useState } from 'react';

const ServicesSection = ({
  industries,
  practices,
  servicesCategoryIllustrations,
}: {
  industries: Industry[];
  practices: Practice[];
  servicesCategoryIllustrations: NonNullable<
    GENERAL_INFO_QUERYResult['generalInfo']
  >['servicesCategoryIllustrations'];
}) => {
  const [activeService, setActiveService] = useState({
    title: 'Services',
    illustration: {
      mobile: servicesCategoryIllustrations.servicesIllustration,
    },
  });

  return (
    <section className='bg-white rounded-t-main pt-4 pb-25 md:pt-20 md:pb-37 xl:py-37 2xl:py-43 px-side flex md:gap-4 xl:gap-18 2xl:gap-24 justify-between'>
      <ServicesAccordion
        className='w-full md:w-7/12'
        industries={industries as Industry[]}
        practices={practices as Practice[]}
        servicesCategoryIllustrations={servicesCategoryIllustrations}
        setActiveService={setActiveService}
      />
      {activeService?.illustration?.mobile && (
        <div className='hidden md:block w-full max-w-[37.5%] h-fit bg-dark-blue rounded-bl-[100px] md:rounded-bl-[120px] xl:rounded-bl-[150px] overflow-hidden'>
          <img
            src={urlFor(activeService.illustration.mobile).url()}
            alt={`BDK Advokati - ${activeService.title} Illustration`}
            className='object-cover w-full h-full'
          />
        </div>
      )}
    </section>
  );
};

export default ServicesSection;
