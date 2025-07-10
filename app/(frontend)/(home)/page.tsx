import { Industry, Post, Practice } from '@/sanity.types';
import {
  getHomePageData,
  getLawyersByCategory,
  getPostsByCategory,
  getServicesData,
} from '@/sanity/lib/cached-queries';
import { urlFor } from '@/sanity/lib/image';
import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Subtitle from '@/components/ui/subtitle';
import Link from 'next/link';
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll';
import LawyersList from '@/components/lawyers/lawyers-list';
import ArrowUpRight from '@/components/ui/arrow-up-right';
import LatestPostsSection from '@/components/home/latest-posts/latest-posts-section';
import ServicesSection from '@/components/home/services/services-section';
import SectionHeader from '@/components/ui/section-header/section-header';
import NewsroomSection from '@/components/home/newsroom-section';
import Section from '@/components/ui/section';
import Hero from '@/components/home/hero';
import { ComputedLawyersData, getComputedLawyersData } from '@/lib/utils';

export default async function Home() {
  const [homePageResult, servicesResult, lawyersResult, newsroomPostsResult] =
    await Promise.all([
      getHomePageData(),
      getServicesData(),
      getLawyersByCategory(),
      getPostsByCategory('newsroom', 4),
    ]);

  const { homePage: homePageData, blinkdraft: blinkdraftData } = homePageResult;
  const { categories } = lawyersResult;
  const { industries, practices } = servicesResult;
  const { posts: newsroomPosts } = newsroomPostsResult;

  if (!homePageData) {
    return <div>No home page data found</div>;
  }

  const computedLawyersData = getComputedLawyersData({ categories });

  return (
    <main id='home' className='bg-dark-blue pt-header'>
      <Hero
        heading={homePageData.hero.heading}
        description={homePageData.hero.description}
      />

      {/* About us */}
      <section className='px-side pt-12 pb-72 md:pt-24 md:pb-[28rem] xl:py-30 2xl:py-43 bg-dark-blue rounded-t-main -mt-10 relative overflow-hidden'>
        <Subtitle>{homePageData.about.subtitle}</Subtitle>

        <div className='flex flex-col items-start justify-end pointer-events-auto mt-6 xl:mt-10 2xl:mt-15 2xl:max-w-[1330px]'>
          <TextGradientScroll
            text={homePageData.about.animatedText}
            className='text-white'
          />
        </div>
        <PortableText
          className='text-lightest-blue mt-8 xl:mt-12 2xl:mt-12 xl:max-w-1/2'
          paragraphClassName='md:text-lg 2xl:text-2xl mt-4 md:mt-4.5 2xl:mt-6 text-lightest-blue'
          value={homePageData.about.description as PortableTextBlock[]}
        />
        <Link href='/about' className='text-white mt-10 2xl:mt-15 flex'>
          {homePageData.about.buttonText}
        </Link>
        <div className='absolute -bottom-8 sm:-bottom-40 xl:bottom-10 2xl:bottom-15 -right-[20vw] sm:right-0 2xl:-right-6 aspect-[936/622] w-[calc(120vw)] sm:w-screen xl:w-2/5 2xl:w-[45%]'>
          <img
            src={urlFor(homePageData.about.backgroundIllustration).url()}
            alt='Background Illustration'
            className='object-cover w-full h-full'
          />
        </div>
      </section>

      {/* Services */}
      <ServicesSection
        industries={industries as Industry[]}
        practices={practices as Practice[]}
        practicesIllustration={homePageData.services.practicesIllustration}
        industriesIllustration={homePageData.services.industriesIllustration}
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
          homePageData.latestPosts.illustrations.blogIllustration
        }
        digitalWatchIllustrationUrl={
          homePageData.latestPosts.illustrations.digitalWatchIllustration
        }
        insightsIllustrationUrl={
          homePageData.latestPosts.illustrations.insightsIllustration
        }
        publicationsIllustrationUrl={
          homePageData.latestPosts.illustrations.publicationsIllustration
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
            <img
              src={urlFor(blinkdraftData.logo).url()}
              alt='BDK - Blinkdraft'
              className='w-full h-full object-cover'
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
          <Link
            href='/blinkdraft'
            className='text-lg md:text-xl text-light-blue border border-light-blue rounded-full flex gap-2.5 items-center w-35.25 justify-between sm:w-auto sm:justify-normal pl-5 md:pl-7.5 pr-1.5 md:pr-5 py-1.25 md:py-2.5'
          >
            English <ArrowUpRight className='bg-light-blue' />
          </Link>
          <Link
            href='/blinkdraft/sr'
            className='text-lg md:text-xl text-light-blue border border-light-blue rounded-full flex gap-2.5 items-center w-35.25 justify-between sm:w-auto sm:justify-normal pl-5 md:pl-7.5 pr-1.5 md:pr-5 py-1.25 md:py-2.5'
          >
            Serbian <ArrowUpRight className='bg-light-blue' />
          </Link>
        </div>
      </Section>
    </main>
  );
}
