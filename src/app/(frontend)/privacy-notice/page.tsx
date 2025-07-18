import { SimpleAccordion } from '@/src/components/ui/accordions/simple-accordion';
import BackToButton from '@/src/components/ui/buttons/back-to-button';
import PortableText from '@/src/components/ui/portable-text';
import { formatDate } from '@/src/lib/utils';
import { getPrivacyNotice } from '@/src/sanity/lib/cached-queries';
import { TableValue } from '@sanity/table';
import { PortableTextBlock } from 'next-sanity';

import { notFound } from 'next/navigation';

export default async function PrivacyNotice() {
  const { privacyNotice } = await getPrivacyNotice();

  if (!privacyNotice) {
    return notFound();
  }

  return (
    <main id='privacyNotice' className='pt-header'>
      <div className='px-side pb-20 md:pb-22 xl:pb-42 2xl:pb-47 grid grid-cols-1 xl:grid-cols-12 gap-12 pt-7.5 md:pt-11 xl:pt-18 2xl:pt-35'>
        <div className='order-2 md:hidden xl:flex xl:order-1 xl:col-span-2 xl:sticky xl:top-26 2xl:top-35 xl:self-start'>
          <div className='flex xl:flex-col justify-end xl:justify-start'>
            <BackToButton
              href='/'
              text='Back to Home'
              className='hidden md:flex'
            />
          </div>
        </div>

        <section className='order-1 xl:order-2 xl:col-span-8 xl:col-start-3'>
          <h1 className='text-dark-blue text-3xl md:text-[2rem] xl:text-5xl 2xl:text-[55px] leading-[1.05]'>
            {privacyNotice.title}
          </h1>

          <p className='text-grey-text text-base md:text-lg lg:text-lg xl:text-xl leading-relaxed mb-2 mt-6 md:mb-4 md:mt-8'>
            Last updated on: {formatDate(privacyNotice._updatedAt)}
          </p>

          <div className='mt-5 md:mt-8 xl:mt-7 2xl:mt-10'>
            <PortableText
              value={privacyNotice.content as PortableTextBlock[]}
            />
          </div>

          <SimpleAccordion
            items={privacyNotice.specificsOfDataProcessing.map((item) => ({
              title: item.title,
              description: item.table as TableValue,
            }))}
          />
        </section>
      </div>
    </main>
  );
}
