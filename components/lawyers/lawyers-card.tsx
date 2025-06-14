import { Lawyer } from '@/sanity.types';
import { urlForUncropped } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';

const LawyerCard = ({ lawyer }: { lawyer: Lawyer }) => {
  return (
    <article className='pb-6 md:pb-2 xl:pb-4 2xl:pb-6 cursor-pointer'>
      <Image
        src={urlForUncropped(lawyer.picture).url()}
        alt={lawyer.name}
        width={766}
        height={788}
        className='w-full object-cover object-top rounded-2xl aspect-[383/394]'
        quality={100}
      />
      <h3 className='text-dark-blue text-lg 2xl:text-xl mt-5 md:mt-3 xl:mt-5 2xl:mt-8'>
        {lawyer.name}
      </h3>
      <p className='text-[#898A8D] text-xxs md:text-sm 2xl:text-base mt-2 md:mt-[10px]'>
        {lawyer.title}
      </p>
    </article>
  );
};

export default LawyerCard;
