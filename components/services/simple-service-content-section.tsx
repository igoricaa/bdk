import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import { ServiceData } from '@/types/service';
import Sidebar from './sidebar';
import { FOREIGN_DESK_QUERYResult } from '@/sanity.types';

interface SimpleServiceContentSectionProps {
  currentService: ServiceData;
  practices: Array<{ title: string; slug: { current: string } }>;
  industries: Array<{ title: string; slug: { current: string } }>;
  foreignDesks: Array<{ title: string; slug: { current: string } }>;
  serviceType: 'practice' | 'industry' | 'foreign-desk';
}

const SimpleServiceContentSection = ({
  currentService,
  practices,
  industries,
  foreignDesks,
  serviceType,
}: SimpleServiceContentSectionProps) => {
  if (!currentService) {
    return <div>No service found</div>;
  }

  return (
    <section className='px-side pt-0 pb-28 md:pb-39 xl:pt-38 xl:pb-21 2xl:pt-44 2xl:pb-40 relative xl:flex xl:gap-x-18 2xl:gap-x-34'>
      <Sidebar
        currentService={currentService}
        practices={practices}
        industries={industries}
        foreignDesks={foreignDesks}
        serviceType={serviceType}
        className='hidden xl:block h-fit'
      />
      {serviceType === 'foreign-desk' && (
        <div>
          <div className='mt-12 md:mt-25 xl:mt-0'>
            <PortableText
              value={
                (currentService as FOREIGN_DESK_QUERYResult['currentForeignDesk'])!
                  .description?.nativeDescription as PortableTextBlock[]
              }
              className=''
              paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6'
            />
          </div>
          <div className='my-12 md:my-16 2xl:my-20'>
            <hr className='border-t border-gray-200' />
          </div>
          <div className='mt-12 md:mt-25 xl:mt-0'>
            <PortableText
              value={
                (currentService as FOREIGN_DESK_QUERYResult['currentForeignDesk'])!
                  .description?.englishDescription as PortableTextBlock[]
              }
              className=''
              paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6'
            />
          </div>
        </div>
      )}
      {serviceType !== 'foreign-desk' && (
        <div className='mt-12 md:mt-25 xl:mt-0'>
          <PortableText
            value={currentService.description as PortableTextBlock[]}
            className=''
            paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6'
          />
        </div>
      )}
    </section>

    // <section className='px-side pt-0 pb-28 md:pb-39 xl:pt-38 xl:pb-21 2xl:pt-44 2xl:pb-40'>
    //   <div className='max-w-4xl mx-auto'>
    //     <PortableText
    //       value={currentService.description as PortableTextBlock[]}
    //       className=''
    //       paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6'
    //     />
    //   </div>
    // </section>
  );
};

export default SimpleServiceContentSection;
