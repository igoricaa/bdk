import { client } from '@/sanity/lib/client';
import { PRACTICE_QUERY } from '@/sanity/lib/queries';
import { PRACTICE_QUERYResult } from '@/sanity.types';
import { urlFor, urlForUncropped } from '@/sanity/lib/image';
import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import AccordionList from '@/components/practices/accordion-list';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import ArrowUpRight from '@/components/ui/arrow-up-right';

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
        <Sidebar
          currentPractice={currentPractice}
          otherPractices={otherPractices}
          industries={industries}
          foreignDesks={foreignDesks}
        />
        <div>
          <PortableText
            value={currentPractice.description as PortableTextBlock[]}
            className=''
            paragraphClassName='md:text-lg 2xl:text-2xl text-justify mt-4 md:mt-4.5 2xl:mt-6'
          />
        </div>
      </section>

      <section className='bg-dark-blue rounded-t-main px-side pt-17.5 pb-25 md:pt-25 md:pb-30 2xl:py-42'>
        <h2 className='text-white text-sm bg-white/10 px-4 py-2 rounded-[500px] w-fit'>
          Our Experts in This Field
        </h2>
        <div className='mt-6 md:mt-8 2xl:mt-15 grid grid-cols-2 gap-5 md:gap-7.5 xl:gap-9 2xl:gap-10'>
          {currentPractice.lawyers.map((lawyer) => (
            <article
              key={lawyer._id}
              className='col-span-full xl:col-span-1 flex flex-col md:flex-row gap-4 md:gap-9 bg-light-blue-bg/5 rounded-[1.25rem] pt-3.5 pb-5 px-side md:px-4 md:py-5.25 xl:p-4 2xl:p-7.5'
            >
              <Image
                src={urlForUncropped(lawyer.picture).url()}
                alt={lawyer.name}
                width={766}
                height={788}
                className='w-full object-cover object-top rounded-lg xl:rounded-2xl 2xl:rounded-[1.25rem] aspect-[334/345] flex-1'
              />
              <div className='flex flex-col text-white flex-1 md:pt-5 2xl:pt-7.5'>
                <h3 className='text-2xl 2xl:text-3xl'>{lawyer.name}</h3>
                <div className='mt-5 flex flex-col gap-1.5'>
                  <p className='2xl:text-lg'>{lawyer.title}</p>
                  <p className='2xl:text-lg'>
                    Phone:{' '}
                    <a
                      href={`tel:${lawyer.contactInfo?.phone}`}
                      className='text-light-blue underline decoration-light-blue 2xl:text-lg'
                    >
                      {lawyer.contactInfo?.phone}
                    </a>
                  </p>
                  <p className='2xl:text-lg'>
                    Email:{' '}
                    <a
                      href={`mailto:${lawyer.contactInfo?.email}`}
                      className='text-light-blue underline decoration-light-blue 2xl:text-lg'
                    >
                      {lawyer.contactInfo?.email}
                    </a>
                  </p>
                </div>

                <Link
                  href={`/lawyers/${lawyer.slug.current}`}
                  className='block mt-8 md:mt-auto'
                >
                  <ArrowUpRight />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const Sidebar = ({
  currentPractice,
  otherPractices,
  industries,
  foreignDesks,
}: {
  currentPractice: PRACTICE_QUERYResult['currentPractice'];
  otherPractices: PRACTICE_QUERYResult['otherPractices'];
  industries: PRACTICE_QUERYResult['industries'];
  foreignDesks: PRACTICE_QUERYResult['foreignDesks'];
}) => {
  return (
    <div className='sticky top-0 xl:static bg-light-blue-bg rounded-[10px] py-3 md:py-5 px-side xl:p-4 2xl:px-5 2xl:py-7 xl:min-w-xs 2xl:min-w-[26rem] w-screen xl:w-auto -ml-side xl:ml-0'>
      <Accordion type='single' collapsible className='xl:hidden'>
        <AccordionItem value='sidebar-content'>
          <AccordionTrigger
            className='flex items-center justify-between text-sm py-0 [&[data-state=open]>svg]:rotate-180'
            icon={
              <ChevronDown
                strokeWidth={1}
                stroke='#666666'
                className='size-6 md:size-8 transition-transform duration-200'
              />
            }
          >
            {currentPractice?.title}
          </AccordionTrigger>
          <AccordionContent className='pt-5 pb-2 md:pt-6 md:pb-0'>
            <AccordionList
              services={otherPractices}
              industries={industries}
              foreignDesks={foreignDesks}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className='hidden xl:block'>
        <AccordionList
          services={otherPractices}
          industries={industries}
          foreignDesks={foreignDesks}
        />
      </div>
    </div>
  );
};
