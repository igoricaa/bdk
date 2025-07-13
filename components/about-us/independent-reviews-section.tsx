import Section from '../ui/section';
import SectionHeader from '../ui/section-header/section-header';
import ArrowUpRight from '../ui/arrow-up-right';
import { ABOUT_US_PAGE_QUERYResult } from '@/sanity.types';
import Link from 'next/link';

const IndependentReviewsSection = ({
  heading,
  description,
  reviews,
}: {
  heading: string;
  description: string;
  reviews: NonNullable<
    ABOUT_US_PAGE_QUERYResult['aboutUsPage']
  >['independentReviews']['reviews'];
}) => {
  if (!reviews || reviews.length === 0) {
    return null;
  }

  return (
    <Section
      id='independentReviews'
      variant='dark'
      className='px-side grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 md:gap-6 xl:gap-10'
    >
      <SectionHeader
        heading={heading}
        description={description}
        className='md:col-span-4 md:max-w-lg xl:max-w-full md:flex-col md:gap-8 md:justify-normal md:items-start'
        descriptionClassName='md:text-start'
        headingClassName='xl:max-w-xs 2xl:max-w-sm'
        colorVariant='light'
      />

      <div className='mt-10 md:mt-15 xl:mt-0 col-span-full xl:col-span-7 xl:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-8 2xl:gap-10'>
        {reviews.map((item, index) => {
          const borderRadius =
            index === 0 || index === 3
              ? 'rounded-bl-[2.5rem] md:rounded-bl-[30px] xl:rounded-bl-[50px] rounded-tr-[2.5rem] md:rounded-tr-[30px] xl:rounded-tr-[50px]'
              : 'rounded-tl-[2.5rem] md:rounded-tl-[30px] xl:rounded-tl-[50px] rounded-br-[2.5rem] md:rounded-br-[30px] xl:rounded-br-[50px]';

          return (
            <Link
              href={item.link}
              className={`${borderRadius} overflow-hidden cursor-pointer flex flex-col bg-white/5 relative px-8 py-9 2xl:px-10 2xl:py-12`}
              target='_blank'
            >
              <article key={item.title}>
                <h3 className='text-2xl text-white'>{item.title}</h3>
                <p className='text-lg text-white mt-4 2xl:mt-5'>
                  {item.description}
                </p>
                <ArrowUpRight className='absolute top-8 2xl:top-10 right-8 2xl:right-10' />
              </article>
            </Link>
          );
        })}
      </div>
    </Section>
  );
};

export default IndependentReviewsSection;
