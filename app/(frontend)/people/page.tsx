import LawyersGrid from '@/components/lawyers/lawyers-grid';
import { PEOPLE_PAGE_QUERYResult } from '@/sanity.types';
import { client } from '@/sanity/lib/client';
import { PEOPLE_PAGE_QUERY } from '@/sanity/lib/queries';

const PeoplePage = async () => {
  const { peoplePage, lawyers }: PEOPLE_PAGE_QUERYResult =
    await client.fetch(PEOPLE_PAGE_QUERY);

  if (!peoplePage || !lawyers || lawyers.length === 0) {
    return <div>No people page found</div>;
  }

  console.log(lawyers);

  const categories = Array.from(
    new Map(
      lawyers.map((lawyer) => [
        lawyer.category.slug.current,
        {
          id: lawyer.category.slug.current,
          label: lawyer.category.title,
        },
      ])
    ).values()
  );

  const lawyersByCategory = lawyers.reduce(
    (acc, lawyer) => {
      const categorySlug = lawyer.category.slug.current;
      if (!acc[categorySlug]) {
        acc[categorySlug] = {
          lawyers: [],
        };
      }
      acc[categorySlug].lawyers.push(lawyer);
      return acc;
    },
    {} as Record<string, { lawyers: typeof lawyers }>
  );

  //   console.log(lawyersByCategory);

  return (
    <main className='px-side pt-15 md:pt-18 2xl:pt-49'>
      <section className='text-center md:max-w-xl xl:max-w-2xl 2xl:max-w-3xl mx-auto pb-32 md:pb-28 xl:pb-32 2xl:pb-40'>
        <h1 className='text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl leading-[1.1]'>
          {peoplePage.hero.heading}
        </h1>
        <p className='text-grey-text mt-2.5 md:mt-6 2xl:mt-8 md:text-lg 2xl:text-2xl'>
          {peoplePage.hero.description}
        </p>
      </section>

      <LawyersGrid
        lawyersByCategory={lawyersByCategory}
        categories={categories}
      />
    </main>
  );
};

export default PeoplePage;
