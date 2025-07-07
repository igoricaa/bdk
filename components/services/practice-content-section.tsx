import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import { PRACTICE_QUERYResult } from '@/sanity.types';
import Sidebar from './sidebar';

interface PracticeContentSectionProps {
  currentPractice: NonNullable<PRACTICE_QUERYResult['currentPractice']>;
  otherPractices: NonNullable<PRACTICE_QUERYResult['otherPractices']>;
  industries: NonNullable<PRACTICE_QUERYResult['industries']>;
  foreignDesks: NonNullable<PRACTICE_QUERYResult['foreignDesks']>;
}

const PracticeContentSection = ({
  currentPractice,
  otherPractices,
  industries,
  foreignDesks,
}: PracticeContentSectionProps) => {
  return (
    <section className='px-side pt-12 pb-28 md:pt-25 md:pb-39 xl:pt-38 xl:pb-21 2xl:pt-44 2xl:pb-40 relative xl:flex xl:gap-x-18 2xl:gap-x-34'>
      <Sidebar
        currentPractice={currentPractice}
        otherPractices={otherPractices}
        industries={industries}
        foreignDesks={foreignDesks}
      />
      <div>
        <PortableText
          value={currentPractice.description as PortableTextBlock[]}
          className=''
          paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6'
        />
      </div>
    </section>
  );
};

export default PracticeContentSection;
