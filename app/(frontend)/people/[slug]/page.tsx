import PortableText from '@/components/ui/portable-text';
import { LAWYER_QUERYResult } from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/client';
import { urlForUncropped } from '@/sanity/lib/image';
import { LAWYER_QUERY } from '@/sanity/lib/queries';
import { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';

const LawyerPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const { lawyer }: LAWYER_QUERYResult = await sanityFetch({
    query: LAWYER_QUERY,
    params: { slug },
  });

  if (!lawyer) {
    return <div>Lawyer not found</div>;
  }

  return (
    <main className='pt-8 md:pt-11 xl:pt-0'>
      <div className='px-side grid grid-cols-1 xl:grid-cols-12 gap-32 md:gap-20 xl:gap-8'>
        <section className='col-span-1 xl:col-span-5 2xl:col-span-4 flex flex-col md:flex-row xl:flex-col w-full xl:w-[calc(80%+32px)]'>
          <div className='w-full md:w-1/2 xl:w-full h-full rounded-br-[50px] xl:rounded-br-[150px] overflow-hidden'>
            <Image
              src={urlForUncropped(lawyer.picture).url() || ''}
              alt={lawyer?.name || ''}
              width={777}
              height={822}
              quality={100}
              priority
              className='w-full h-full object-cover object-top'
            />
          </div>
          <h1 className='text-dark-blue text-2xl font-bold'>
            {lawyer.name}
          </h1>
        </section>
        <section className='col-span-1 xl:col-span-7 xl:col-start-6 2xl:col-span-6 2xl:col-start-6 flex flex-col md:flex-row xl:flex-col gap-5 xl:gap-9 2xl:gap-18'>
          <p>Background</p>
          <PortableText value={lawyer.bio as PortableTextBlock[]} />
        </section>
      </div>
    </main>
  );
};

export default LawyerPage;
