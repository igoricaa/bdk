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

  const { lawyersByCategory, categories } = lawyers.reduce(
    (acc, lawyer) => {
      const categorySlug = lawyer.category.slug.current;
      const categoryTitle = lawyer.category.title;

      if (!acc.lawyersByCategory[categorySlug]) {
        acc.lawyersByCategory[categorySlug] = { lawyers: [] };

        acc.categories.push({
          id: categorySlug,
          label: categoryTitle,
        });
      }

      acc.lawyersByCategory[categorySlug].lawyers.push(lawyer);
      return acc;
    },
    {
      lawyersByCategory: {} as Record<string, { lawyers: typeof lawyers }>,
      categories: [] as Array<{ id: string; label: string }>,
    }
  );

  const allLawyersSortedByCategory = categories.flatMap(
    (category) => lawyersByCategory[category.id]?.lawyers || []
  );

  const finalLawyersByCategory = {
    all: { lawyers: allLawyersSortedByCategory },
    ...lawyersByCategory,
  };

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
        lawyersByCategory={finalLawyersByCategory}
        categories={categories}
      />
    </main>
  );
};

export default PeoplePage;
