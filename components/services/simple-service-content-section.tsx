import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import { ServiceData } from '@/types/service';
import Sidebar from './sidebar';

interface SimpleServiceContentSectionProps {
  currentService: ServiceData;
  otherServices: Array<{ title: string; slug: { current: string } }>;
  practices: Array<{ title: string; slug: { current: string } }>;
  industries: Array<{ title: string; slug: { current: string } }>;
  foreignDesks: Array<{ title: string; slug: { current: string } }>;
  serviceType: 'practice' | 'industry';
}

const SimpleServiceContentSection = ({
  currentService,
  otherServices,
  practices,
  industries,
  foreignDesks,
  serviceType,
}: SimpleServiceContentSectionProps) => {
  if (!currentService) {
    return <div>No service found</div>;
  }

  // Determine which services to pass as "otherPractices" based on service type
  const otherPractices = serviceType === 'practice' ? otherServices : practices;

  return (
    <section className='px-side pt-0 pb-28 md:pb-39 xl:pt-38 xl:pb-21 2xl:pt-44 2xl:pb-40 relative xl:flex xl:gap-x-18 2xl:gap-x-34'>
      <Sidebar
        currentService={currentService}
        otherServices={otherServices}
        services={industries}
        foreignDesks={foreignDesks}
        className='hidden xl:block h-fit'
      />
      <div className='mt-12 md:mt-25 xl:mt-0'>
        <PortableText
          value={currentService.description as PortableTextBlock[]}
          className=''
          paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6'
        />
      </div>
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
