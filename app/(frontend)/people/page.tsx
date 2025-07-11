import NewsroomSection from '@/components/home/newsroom-section';
import LawyersGrid from '@/components/lawyers/lawyers-grid';
import { Post } from '@/sanity.types';
import { ComputedLawyersData, getComputedLawyersData } from '@/lib/utils';
import {
  getLawyersByCategory,
  getPeoplePageData,
  getPostsPreviewByCategory,
} from '@/sanity/lib/cached-queries';

const PeoplePage = async () => {
  const [{ peoplePage }, { categories }, { posts: newsroomPosts }] =
    await Promise.all([
      getPeoplePageData(),
      getLawyersByCategory(),
      getPostsPreviewByCategory('newsroom', 4),
    ]);

  if (!peoplePage || !categories || categories.length === 0 || !newsroomPosts) {
    return <div>No people page found</div>;
  }

  const computedLawyersData = getComputedLawyersData({ categories });

  return (
    <main className='pt-header'>
      <section className='px-side lg:px-0 text-center md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto pb-32 md:pb-28 xl:pb-32 2xl:pb-40 pt-15 md:pt-18 2xl:pt-49'>
        <h1 className='text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl leading-[1.1]'>
          {peoplePage.hero.heading}
        </h1>
        <p className='text-grey-text mt-2.5 md:mt-6 2xl:mt-8 md:text-lg 2xl:text-2xl'>
          {peoplePage.hero.description}
        </p>
      </section>

      <LawyersGrid
        computedLawyersData={computedLawyersData}
        className='xl:px-0 2xl:max-w-[1550px] xl:mx-auto'
      />

      <NewsroomSection
        heading={peoplePage.newsroom.heading}
        description={peoplePage.newsroom.description}
        subtitle={peoplePage.newsroom.subtitle}
        newsroomPosts={newsroomPosts as Post[]}
        className='mt-32 md:mt-28 xl:mt-32 2xl:mt-42'
      />
    </main>
  );
};

export default PeoplePage;
