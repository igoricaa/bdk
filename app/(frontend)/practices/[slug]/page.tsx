import { client } from '@/sanity/lib/client';
import { PRACTICE_QUERY } from '@/sanity/lib/queries';
import { PRACTICE_QUERYResult } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import AccordionList from '@/components/practices/accordion-list';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const {
    currentPractice,
    otherPractices,
    industries,
    foreignDesks,
  }: PRACTICE_QUERYResult = await client.fetch(PRACTICE_QUERY, {
    slug,
  });

  if (!currentPractice || !otherPractices || !industries || !foreignDesks) {
    return <div>No practice found</div>;
  }

  return (
    <main>
      <section className='bg-dark-blue flex rounded-b-main px-side pb-12 md:pb-24 2xl:pb-34 relative aspect-[393/550] md:aspect-[834/500] xl:aspect-[1440/600] 2xl:aspect-[1920/800] overflow-hidden'>
        <img
          src={urlFor(currentPractice.illustration).url()}
          alt={`BDK Advokati - ${currentPractice.title}`}
          // -top-3/20
          className='w-full object-cover absolute top-0 sm:-top-[5%] xl:-top-1/2 right-0 max-w-full md:max-w-3/5'
        />
        <h1 className='text-white text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mt-auto'>
          {currentPractice.title}
        </h1>
      </section>

      <section className='px-side pt-12 pb-28 md:pt-25 md:pb-39 xl:pt-38 xl:pb-21 2xl:pt-44 2xl:pb-40 relative xl:flex xl:gap-x-18 2xl:gap-x-34'>
        <div className='sticky xl:static bg-light-blue-bg rounded-[10px] p-6 xl:p-4 2xl:px-5 2xl:py-7 xl:min-w-xs 2xl:min-w-[26rem]'>
          <AccordionList
            services={otherPractices}
            industries={industries}
            foreignDesks={foreignDesks}
          />
        </div>
        <div>
          <PortableText
            value={currentPractice.description as PortableTextBlock[]}
            className=''
            paragraphClassName='md:text-lg 2xl:text-2xl text-justify mt-4 md:mt-4.5 2xl:mt-6'
          />
        </div>
      </section>
    </main>
  );
}
