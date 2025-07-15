import SplitSection from '@/src/components/ui/split-section';
import type { CAREER_PAGE_QUERYResult } from '@/sanity.types';
import { getCareerPageData } from '@/src/sanity/lib/cached-queries';
import ArrowUpRight from '@/src/components/ui/arrow-up-right';
import Section from '@/src/components/ui/section';
import SectionHeader from '@/src/components/ui/section-header/section-header';
import { cn, getPdfUrl, PdfFile } from '@/src/lib/utils';
import { Clock } from 'lucide-react';
import { PortableTextBlock } from 'next-sanity';

type Course = {
  title: string;
  pdfFile: {
    asset: {
      _ref: string;
    };
  };
  readingTime: number;
};

const CareerPage = async () => {
  const {
    careerPage: careerPageData,
  }: { careerPage: CAREER_PAGE_QUERYResult['careerPage'] } =
    await getCareerPageData();

  if (!careerPageData) {
    return <div>No data</div>;
  }

  const coursesSectionData = careerPageData.coursesSection;

  return (
    <main className='pt-header'>
      <SplitSection
        heading={careerPageData.hero.heading}
        image={careerPageData.hero.backgroundImage}
        description={careerPageData.hero.description as PortableTextBlock[]}
        customComponent={<OpenPositions careerPageData={careerPageData} />}
        className='px-side'
      />

      {coursesSectionData &&
        coursesSectionData.courses &&
        coursesSectionData.courses.length > 0 && (
          <ProgrammesSection
            title={coursesSectionData.title || ''}
            subtitle={coursesSectionData.subtitle || ''}
            courses={coursesSectionData.courses as Array<Course>}
          />
        )}
    </main>
  );
};

export default CareerPage;

const ProgrammesSection = ({
  title,
  subtitle,
  courses,
}: {
  title: string;
  subtitle: string;
  courses: Array<Course>;
}) => {
  if (!courses || courses.length === 0) {
    return null;
  }

  return (
    <Section className='px-side'>
      <SectionHeader heading={title} subtitle={subtitle} />

      <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-9 mt-8 xl:mt-11 2xl:mt-17'>
        {courses.slice(0, 4).map((course, index) => {
          const pdfFile: PdfFile = course.pdfFile;

          if (!pdfFile) {
            return null;
          }

          const pdfUrl = getPdfUrl(pdfFile);

          if (!pdfUrl) {
            return null;
          }

          return (
            <li key={`${course.title}-${index}`}>
              <article
                className={cn(
                  'bg-white/5 rounded-br-[2.5rem] md:rounded-br-[50px] h-77 md:h-88 xl:h-77 2xl:h-103',
                  index === 3 && 'hidden sm:max-xl:block'
                )}
              >
                <a
                  href={pdfUrl}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                  className='block h-full py-8 pl-4 pr-12 md:py-9 md:pl-5 md:pr-4 xl:py-8 xl:pl-5 xl:pr-13 2xl:py-10 2xl:pl-6 2xl:pr-18'
                >
                  <div className='flex flex-col justify-between h-full'>
                    <div className='flex flex-col gap-5'>
                      <div className='flex items-center gap-2'>
                        <span className='text-light-blue text-xxs xl:text-sm 2xl:text-base flex items-center gap-2'>
                          <Clock className='w-4 h-4' />
                          {course.readingTime}
                          {course.readingTime === 1
                            ? ' minute read'
                            : ' minutes read'}
                        </span>
                      </div>
                      <h3 className='text-2xl 2xl:text-[2rem]'>
                        {course.title}
                      </h3>
                    </div>
                    <ArrowUpRight />
                  </div>
                </a>
              </article>
            </li>
          );
        })}
      </ul>
    </Section>
  );
};

const OpenPositions = ({
  careerPageData,
}: {
  careerPageData: CAREER_PAGE_QUERYResult['careerPage'];
}) => {
  if (!careerPageData) {
    return null;
  }

  return (
    <section className='mt-13'>
      <p className='text-dark-blue text-2xl 2xl:text-3xl border-b border-lightest-blue pb-7.5 md:pb-5 xl:pb-7.5 2xl:pb-10'>
        {careerPageData.hero.openPositionsSection.heading}
      </p>
      <ul>
        {careerPageData.hero.openPositionsSection.openPositions?.map(
          (openPosition) => {
            const pdfFile: PdfFile = openPosition.pdfFile as PdfFile;

            if (!pdfFile) {
              return null;
            }

            const pdfUrl = getPdfUrl(pdfFile);

            if (!pdfUrl) {
              return null;
            }

            return (
              <li
                key={`${openPosition.title}-${openPosition.location}`}
                className='py-7.5 md:py-5 xl:py-7.5 border-b border-lightest-blue relative'
              >
                <a
                  href={pdfUrl}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                  className='flex flex-col gap-4 '
                >
                  <p className='text-dark-blue text-2xl 2xl:text-3xl'>
                    {openPosition.title}
                  </p>
                  <p className='text-grey-text text-lg 2xl:text-2xl'>
                    {openPosition.location}
                  </p>
                  <ArrowUpRight className='absolute top-1/2 -translate-y-1/2 right-0' />
                </a>
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
};
