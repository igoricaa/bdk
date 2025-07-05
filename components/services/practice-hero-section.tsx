import { urlFor } from '@/sanity/lib/image';
import { PRACTICE_QUERYResult } from '@/sanity.types';

interface PracticeHeroSectionProps {
  currentPractice: NonNullable<PRACTICE_QUERYResult['currentPractice']>;
}

const PracticeHeroSection = ({ currentPractice }: PracticeHeroSectionProps) => {
  return (
    <section className='bg-dark-blue flex rounded-b-main px-side pb-12 md:pb-24 2xl:pb-34 relative aspect-[393/550] md:aspect-[834/500] xl:aspect-[1440/600] 2xl:aspect-[1920/800] overflow-hidden'>
      <img
        src={urlFor(currentPractice.illustration).url()}
        alt={`BDK Advokati - ${currentPractice.title}`}
        // -top-3/20
        className='w-full object-cover absolute top-0 sm:-top-[5%] xl:-top-1/2 right-0 max-w-full md:max-w-3/5'
      />
      <h1 className='text-white text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mt-auto'>
        {currentPractice.title}
      </h1>
    </section>
  );
};

export default PracticeHeroSection;
