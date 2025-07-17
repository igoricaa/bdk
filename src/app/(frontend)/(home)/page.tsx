import {
  GENERAL_INFO_QUERYResult,
  Industry,
  Post,
  Practice,
} from '@/sanity.types';
import {
  getHomePageData,
  getLawyersByCategory,
  getPostsPreviewByCategory,
  getServicesData,
  getGeneralInfoData,
} from '@/src/sanity/lib/cached-queries';
import { urlFor } from '@/src/sanity/lib/image';
import PortableText from '@/src/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Subtitle from '@/src/components/ui/subtitle';
import { TransitionLink } from '@/src/components/transition-link';
import { TextGradientScroll } from '@/src/components/ui/text-gradient-scroll';
import LawyersList from '@/src/components/lawyers/lawyers-list';
import ArrowUpRight from '@/src/components/ui/arrow-up-right';
import LatestPostsSection from '@/src/components/home/latest-posts/latest-posts-section';
import ServicesSection from '@/src/components/home/services/services-section';
import SectionHeader from '@/src/components/ui/section-header/section-header';
import NewsroomSection from '@/src/components/home/newsroom-section';
import Section from '@/src/components/ui/section';
import Hero from '@/src/components/home/hero';
import { ComputedLawyersData, getComputedLawyersData } from '@/src/lib/utils';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { Image } from 'next-sanity/image';
import { AnimatedText } from '@/src/components/ui/animated-text';

export default async function Home() {
  const [
    homePageResult,
    servicesResult,
    lawyersResult,
    newsroomPostsResult,
    generalInfoResult,
  ] = await Promise.all([
    getHomePageData(),
    getServicesData(),
    getLawyersByCategory(),
    getPostsPreviewByCategory('newsroom', 4),
    getGeneralInfoData(),
  ]);

  const { homePage: homePageData, blinkdraft: blinkdraftData } = homePageResult;
  const { categories } = lawyersResult;
  const { industries, practices } = servicesResult;
  const { posts: newsroomPosts } = newsroomPostsResult;
  const { generalInfo } = generalInfoResult;

  if (!homePageData) {
    return <div>No home page data found</div>;
  }

  const computedLawyersData = getComputedLawyersData({ categories });

  return (
    <main id='home'>
      <Hero
        heading={homePageData.hero.heading}
        description={homePageData.hero.description}
        bgImages={homePageData.hero.bgImages}
      />

      {/* About us */}
      <section className='px-side pt-12 md:pt-24 xl:py-30 2xl:py-43 bg-dark-blue rounded-t-main -mt-10 overflow-hidden relative z-10'>
        <Subtitle>{homePageData.about.subtitle}</Subtitle>

        <div className='flex flex-col items-start justify-end pointer-events-auto mt-6 xl:mt-10 2xl:mt-15 2xl:max-w-10/12'>
          <TextGradientScroll
            text={homePageData.about.animatedText}
            className='text-white'
          />
        </div>
        <div className='mt-8 xl:mt-12 2xl:mt-12 relative pb-72 md:pb-[60vw] xl:pb-0'>
          <PortableText
            className='text-lightest-blue xl:w-1/2 xl:max-w-3xl relative z-10'
            paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6 text-lightest-blue'
            value={homePageData.about.description as PortableTextBlock[]}
          />
          <TransitionLink
            href='/about-us'
            pageName='About us'
            className='text-light-blue mt-10 2xl:mt-15 flex items-center gap-5.5 w-fit text-lg 2xl:text-2xl relative z-10 group'
          >
            <ArrowUpRight />
            {homePageData.about.buttonText}
          </TransitionLink>
          <div className='aspect-[936/622] absolute -z-0 -bottom-8 sm:-bottom-40 xl:top-0 2xl:-top-8 3xl:-top-[4vw] -right-[20vw] xl:-right-[var(--padding-side)] w-[calc(120vw)] xl:w-[calc(43vw)] 2xl:w-[calc(48vw-2rem)]'>
            <img
              src={urlFor(homePageData.about.backgroundIllustration).url()}
              alt='Background Illustration'
              className='w-full h-full'
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <ServicesSection
        industries={industries as Industry[]}
        practices={practices as Practice[]}
        servicesCategoryIllustrations={
          generalInfo?.servicesCategoryIllustrations as NonNullable<
            GENERAL_INFO_QUERYResult['generalInfo']
          >['servicesCategoryIllustrations']
        }
      />

      {/* Team */}
      <section className='pb-22 md:pb-40 xl:pb-38 2xl:pb-42 bg-white'>
        <SectionHeader
          heading={homePageData.team.heading}
          description={homePageData.team.description}
          className='px-side'
          headingClassName='xl:max-w-1/2'
          descriptionClassName='xl:max-w-1/3'
          colorVariant='dark'
        />

        <LawyersList
          computedLawyersData={computedLawyersData}
          gridLimit={6}
          className='mt-4 md:mt-8 xl:mt-9 2xl:mt-18'
          listClassName='px-side lg:px-0 mt-4 md:mt-5 xl:mt-8 2xl:mt-16'
        />
      </section>

      {/* Newsroom */}
      <NewsroomSection
        heading={homePageData.newsroom.heading}
        description={homePageData.newsroom.description}
        subtitle={homePageData.newsroom.subtitle}
        newsroomPosts={newsroomPosts as Post[]}
      />

      {/* Latest posts */}
      <LatestPostsSection
        subtitle={homePageData.latestPosts.subtitle}
        heading={homePageData.latestPosts.heading}
        description={homePageData.latestPosts.description}
        blogIllustrationUrl={
          generalInfo?.postCategoriesIllustrations
            .blogIllustration as SanityImageSource
        }
        digitalWatchIllustrationUrl={
          generalInfo?.postCategoriesIllustrations
            .digitalWatchIllustration as SanityImageSource
        }
        insightsIllustrationUrl={
          generalInfo?.postCategoriesIllustrations
            .insightsIllustration as SanityImageSource
        }
        publicationsIllustrationUrl={
          generalInfo?.postCategoriesIllustrations
            .publicationsIllustration as SanityImageSource
        }
      />

      {/* Blinkdraft */}
      <Section
        variant='blue'
        underColor='bg-white'
        className='flex flex-col items-center'
      >
        {blinkdraftData && (
          <div className='w-28 md:w-34 2xl:w-45'>
            <Image
              src={urlFor(
                generalInfo?.blinkdraftLogo as SanityImageSource
              ).url()}
              alt='BDK - Blinkdraft'
              width={454}
              height={144}
              className='w-full h-full object-cover'
              unoptimized={true}
            />
          </div>
        )}

        <h2 className='text-center mt-5 md:mt-10 xl:mt-12.5 2xl:mt-15 text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl'>
          {homePageData.blinkdraft.heading}
        </h2>
        <PortableText
          value={homePageData.blinkdraft.description as PortableTextBlock[]}
          className='mt-4 text-center text-grey-text md:text-xl xl:text-2xl 2xl:text-3xl md:mt-7.5 xl:max-w-1/2'
        />
        <div className='flex gap-3 mt-4 md:mt-9 xl:mt-11 2xl:mt-18'>
          <TransitionLink
            href='/blinkdraft/en'
            className='text-lg md:text-xl text-light-blue border border-light-blue rounded-full flex gap-2.5 items-center w-35.25 justify-between sm:w-auto sm:justify-normal pl-5 md:pl-7.5 pr-1.5 md:pr-5 py-1.25 md:py-2.5 group'
          >
            <AnimatedText text='English' />
            <ArrowUpRight className='bg-light-blue transition-transform duration-700 group-hover:rotate-45' />
          </TransitionLink>
          <TransitionLink
            href='/blinkdraft/sr'
            className='text-lg md:text-xl text-light-blue border border-light-blue rounded-full flex gap-2.5 items-center w-35.25 justify-between sm:w-auto sm:justify-normal pl-5 md:pl-7.5 pr-1.5 md:pr-5 py-1.25 md:py-2.5 group'
          >
            <AnimatedText text='Serbian' />
            <ArrowUpRight className='bg-light-blue transition-transform duration-700 group-hover:rotate-45' />
          </TransitionLink>
        </div>
      </Section>
    </main>
  );
}
