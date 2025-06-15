import { client } from '@/sanity/lib/client';
import {
  HOME_PAGE_QUERYResult,
  Industry,
  Lawyer,
  Practice,
} from '@/sanity.types';
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Subtitle from '@/components/ui/subtitle';
import Link from 'next/link';
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll';
import LawyersGrid from '@/components/lawyers/lawyers-grid';
import SectionHeading from '@/components/ui/section-heading';
import SectionParagraph from '@/components/ui/section-paragraph';
import { cn } from '@/lib/utils';
import ArrowUpRight from '@/components/ui/arrow-up-right';
import LatestPostsSection from '@/components/home/latest-posts/latest-posts-section';
import ServicesSection from '@/components/home/services/services-section';

export default async function Home() {
  const {
    homePage: homePageData,
    industries,
    practices,
    partners,
    newsroom: newsroomPosts,
  }: HOME_PAGE_QUERYResult = await client.fetch(HOME_PAGE_QUERY);

  if (!homePageData) {
    return <div>No home page data found</div>;
  }

  return (
    <main>
      {/* Hero */}
      <section className='relative h-screen w-full px-side pt-22 md:pt-20 2xl:pt-37'>
        <Image
          src={urlFor(homePageData.hero.backgroundImage).url()}
          alt={homePageData.hero.backgroundImage.alt}
          fill
          className='object-cover -z-10'
          priority
          sizes='(max-width: 640px) 640px, (max-width: 1280px) 1280px, 2560px'
        />

        <h1 className='max-w-4xl'>{homePageData.hero.heading}</h1>
        <p className='absolute top-[50vh] right-1/5 sm:text-lg 2xl:text-2xl leading-tight sm:max-w-md 2xl:max-w-2xl border-l-4 border-light-blue pl-4 sm:pl-5 xl:pl-8 2xl:pl-10 py-4'>
          {homePageData.hero.description}
        </p>
      </section>

      {/* About us */}
      <section className='px-side pt-12 pb-72 md:pt-24 md:pb-[28rem] xl:py-30 2xl:py-43 bg-dark-blue rounded-t-[2.5rem] -mt-10 relative overflow-hidden'>
        <Subtitle>{homePageData.about.subtitle}</Subtitle>

        <div className='flex xl:text-[53px] 2xl:text-6xl flex-col items-start justify-end pointer-events-auto mt-6 xl:mt-10 2xl:mt-15 2xl:max-w-[1330px]'>
          <TextGradientScroll
            text={homePageData.about.animatedText}
            className='text-white'
          />
        </div>
        <PortableText
          className='text-lightest-blue text-lg mt-8 xl:mt-12 2xl:mt-12 2xl:text-2xl 2xl:max-w-1/2'
          value={homePageData.about.description as PortableTextBlock[]}
        />
        <Link href='/about' className='text-white mt-10 2xl:mt-15'>
          {homePageData.about.buttonText}
        </Link>
        <div className='absolute -bottom-8 md:-bottom-40 xl:bottom-20 2xl:bottom-12 -right-[20vw] sm:right-0 2xl:-right-6 aspect-[936/622] w-[calc(120vw)] sm:w-screen xl:max-w-1/2'>
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
      <section className='pb-22 md:pb-40 xl:pb-38 2xl:pb-42'>
        <div className='px-side flex flex-col md:flex-row gap-4 md:gap-14 md:items-center md:justify-between'>
          <SectionHeading colorVariant='dark' className='xl:max-w-1/2'>
            {homePageData.team.heading}
          </SectionHeading>
          <SectionParagraph colorVariant='dark' className='xl:max-w-1/3'>
            {homePageData.team.description}
          </SectionParagraph>
        </div>

        <LawyersGrid
          lawyers={partners as Lawyer[]}
          className='mt-4 md:mt-5 xl:mt-8 2xl:mt-16'
        />
      </section>

      {/* Newsroom */}
      <section className='rounded-t-[2.5rem] bg-dark-blue text-white py-19 md:pt-23 md:pb-28 xl:pt-30 xl:pb-35 2xl:py-43 px-side'>
        <div className='flex flex-col md:flex-row gap-6 md:justify-between md:items-center md:gap-14'>
          <div>
            <Subtitle>{homePageData.newsroom.subtitle}</Subtitle>
            <SectionHeading className='mt-6 md:mt-5 xl:mt-6 2xl:mt-12'>
              {homePageData.newsroom.heading}
            </SectionHeading>
          </div>
          <SectionParagraph className='xl:max-w-1/3'>
            {homePageData.newsroom.description}
          </SectionParagraph>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-9 mt-8'>
          {newsroomPosts.map((post, index) => (
            <article
              key={index}
              className={cn(
                'bg-white/5 rounded-br-[3rem] h-77 md:h-88 xl:h-77 2xl:h-103',
                index === 3 && 'hidden sm:max-xl:block'
              )}
            >
              <a
                href={`/newsroom/${post.slug.current}`}
                className='block h-full py-8 pl-4 pr-12 md:py-9 md:pl-5 md:pr-4 xl:py-8 xl:pl-5 xl:pr-13 2xl:py-10 2xl:pl-6 2xl:pr-18'
              >
                <div className='flex flex-col justify-between h-full'>
                  <div>
                    <p className='text-sm 2xl:text-base text-light-blue'>
                      {post.date}
                    </p>
                    <h3 className='text-2xl 2xl:text-[2rem] mt-5'>
                      {post.title}
                    </h3>
                  </div>
                  <ArrowUpRight />
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className='text-center mt-12 md:mt-17 xl:mt-12 2xl:mt-35'>
          <a
            href='#'
            className='text-sky-400 hover:text-sky-300 transition-colors text-lg'
          >
            View All News
          </a>
        </div>
      </section>

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
      <section className='flex flex-col items-center px-side bg-light-blue-bg rounded-t-[2.5rem] py-19 md:pt-23 md:pb-28 xl:pt-30 xl:pb-35 2xl:py-43'>
        <div className='w-28 md:w-34 2xl:w-45'>
          <img
            src={urlFor(homePageData.blinkdraft.logo).url()}
            alt='BDK - Blinkdraft'
            className='w-full h-full object-cover'
          />
        </div>

        <h2 className='mt-5 md:mt-10 xl:mt-12.5 2xl:mt-15 text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl'>
          {homePageData.blinkdraft.heading}
        </h2>
        <PortableText
          value={homePageData.blinkdraft.description as PortableTextBlock[]}
          className='mt-4 text-center md:text-xl xl:text-2xl 2xl:text-3xl md:mt-7.5 xl:max-w-1/2'
        />
        <div className='flex gap-3 mt-4 md:mt-9 xl:mt-11 2xl:mt-18'>
          <Link
            href='/blinkdraft'
            className='text-lg text-light-blue border border-light-blue rounded-full flex gap-4 items-center pl-5 pr-1.5 py-1.25'
          >
            English <ArrowUpRight className='bg-light-blue' />
          </Link>
          <Link
            href='/blinkdraft/sr'
            className='text-lg md:text-2xl text-light-blue border border-light-blue rounded-full flex gap-4 items-center pl-5 md:pl-7.5 pr-1.5 md:pr-5 py-1.25 md:py-2.5'
          >
            Serbian <ArrowUpRight className='bg-light-blue' />
          </Link>
        </div>
      </section>
    </main>
  );
}
