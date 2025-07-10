import { Lawyer } from '@/sanity.types';
import { urlForUncropped } from '@/sanity/lib/image';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import LinkedinIcon from '../ui/icons/linkedin-icon';

const LawyerCard = ({ lawyer }: { lawyer: Lawyer }) => {
  return (
    <article className='pb-6 md:pb-2 xl:pb-4 2xl:pb-6 cursor-pointer'>
      <Link href={`/people/${lawyer.slug.current}`}>
        <Image
          src={urlForUncropped(lawyer.picture).url()}
          alt={lawyer.name}
          width={766}
          height={788}
          className='w-full object-cover object-top rounded-2xl aspect-[383/394]'
          quality={100}
        />
      </Link>
      <div className='flex items-start gap-2 justify-between mt-5 md:mt-3 xl:mt-5 2xl:mt-8'>
        <Link href={`/people/${lawyer.slug.current}`}>
          <h3 className='text-dark-blue text-lg xl:text-2xl'>{lawyer.name}</h3>
        </Link>
        {lawyer.contactInfo?.linkedin && (
          <Link
            href={lawyer.contactInfo.linkedin}
            target='_blank'
            className='hidden md:block'
          >
            <LinkedinIcon className='min-w-5 min-h-5 w-5 h-5 2xl:w-5.5 2xl:h-5.5 2xl:min-w-5.5 2xl:min-h-5.5' />
          </Link>
        )}
      </div>

      <p className='text-[#898A8D] text-xs md:text-sm 2xl:text-base mt-2 md:mt-[10px]'>
        {lawyer.title}
      </p>

      {lawyer.contactInfo?.linkedin && (
        <Link
          href={lawyer.contactInfo.linkedin}
          target='_blank'
          className='block mt-4 md:hidden'
        >
          <LinkedinIcon className='w-4 h-4' />
        </Link>
      )}
    </article>
  );
};

export default LawyerCard;
