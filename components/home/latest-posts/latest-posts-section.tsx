import ArrowUpRight from '@/components/ui/arrow-up-right';
import SectionHeading from '@/components/ui/section-heading';
import SectionParagraph from '@/components/ui/section-paragraph';
import Subtitle from '@/components/ui/subtitle';
import { urlFor } from '@/sanity/lib/image';

interface LatestPostsSectionProps {
  subtitle: string;
  heading: string;
  description: string;
  blogIllustrationUrl: any;
  digitalWatchIllustrationUrl: any;
  insightsIllustrationUrl: any;
  publicationsIllustrationUrl: any;
}

const LatestPostsSection = ({
  subtitle,
  heading,
  description,
  blogIllustrationUrl,
  digitalWatchIllustrationUrl,
  insightsIllustrationUrl,
  publicationsIllustrationUrl,
}: LatestPostsSectionProps) => {
  const posts = [
    {
      title: 'Blog',
      imageUrl: blogIllustrationUrl,
      alt: 'BDK - Blog',
    },
    {
      title: 'Digital Watch',
      imageUrl: digitalWatchIllustrationUrl,
      alt: 'BDK - Digital Watch',
    },
    {
      title: 'Insights',
      imageUrl: insightsIllustrationUrl,
      alt: 'BDK - Insights',
    },
    {
      title: 'Publications',
      imageUrl: publicationsIllustrationUrl,
      alt: 'BDK - Publications',
    },
  ];

  return (
    <section className='px-side rounded-t-[2.5rem] py-19 md:pt-23 md:pb-28 xl:pt-30 xl:pb-35 2xl:py-43 xl:grid xl:grid-cols-12 xl:gap-4'>
      <div className='flex flex-col md:flex-row gap-4 md:justify-between md:items-center md:gap-14 xl:col-span-4 xl:flex-col xl:gap-8 xl:justify-normal'>
        <div className='flex flex-col gap-6 md:gap-5 xl:gap-8 2xl:gap-10'>
          <Subtitle variation='dark'>{subtitle}</Subtitle>
          <SectionHeading colorVariant='dark'>{heading}</SectionHeading>
        </div>
        <SectionParagraph
          colorVariant='dark'
          className='text-start md:text-end xl:text-start'
        >
          {description}
        </SectionParagraph>
      </div>

      <div className='mt-6 md:mt-8 xl:col-span-7 xl:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 xl:gap-8'>
        {posts.map((item, index) => {
          const borderRadius =
            index === 0 || index === 3
              ? 'rounded-bl-[3rem] rounded-tr-[3rem]'
              : 'rounded-tl-[3rem] rounded-br-[3rem]';

          const bgImgClasses =
            index === 0
              ? 'h-full aspect-[156/309] right-12 top-0'
              : index === 1
                ? 'bottom-0 right-15 w-47 2xl:w-58 aspect-[234/193]'
                : index === 2
                  ? 'w-55 2xl:w-67 aspect-[271/151] right-0 bottom-0'
                  : 'w-50 2xl:w-62 aspect-[251/231] right-0 top-1/2 -translate-y-1/2';

          return (
            <article
              key={item.title}
              className={`relative bg-dark-blue ${borderRadius} overflow-hidden p-8 2xl:p-10 h-62 2xl:h-77 flex flex-col justify-between`}
            >
              <img
                src={urlFor(item.imageUrl).url()}
                alt={item.alt}
                className={`absolute object-cover ${bgImgClasses}`}
              />
              <h3 className='text-2xl 2xl:text-[2rem] text-white'>
                {item.title}
              </h3>
              <ArrowUpRight />
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default LatestPostsSection;
