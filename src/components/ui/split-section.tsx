import { TransitionLink } from '@/src/components/transition-link';
import ArrowUpRight from './arrow-up-right';
import { Image } from 'next-sanity/image';
import PortableText from './portable-text';
import { urlFor } from '@/src/sanity/lib/image';
import { PortableTextBlock } from 'next-sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { cn } from '@/src/lib/utils';
import Subtitle from './subtitle';

const SplitSection = ({
  heading,
  link,
  linkText,
  image,
  highlightedText,
  description,
  subtitle,
  customComponent,
  className,
}: {
  heading: string;
  link?: string;
  linkText?: string;
  image: SanityImageSource;
  highlightedText?: PortableTextBlock[] | string;
  description?: PortableTextBlock[] | string;
  subtitle?: string;
  customComponent?: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        'flex gap-18 md:gap-6 xl:gap-32 3xl:gap-51 pb-19 md:pb-23 xl:pb-37 2xl:pb-42 mt-7.5 md:mt-11 xl:mt-18 2xl:mt-35',
        className
      )}
    >
      <div className='md:pb-9 xl:pb-24 3xl:pb-30'>
        {subtitle && <Subtitle variation='dark'>{subtitle}</Subtitle>}

        <h1 className='text-dark-blue mt-6 xl:mt-12 2xl:mt-13 text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl'>
          {heading}
        </h1>

        <div className='w-full md:hidden overflow-hidden rounded-tl-[5rem] rounded-br-[5rem] mt-6'>
          <Image
            src={urlFor(image).url()}
            alt={heading}
            width={722}
            height={762}
            className='object-cover w-full h-full'
            quality={100}
            priority
          />
        </div>

        {(highlightedText || description) && (
          <div className='mt-6 md:mt-7.5 2xl:mt-10'>
            {highlightedText &&
              highlightedText.length > 0 &&
              (typeof highlightedText === 'string' ? (
                <p className='text-dark-blue text-lg xl:text-2xl 2xl:text-3xl leading-tight'>
                  {highlightedText}
                </p>
              ) : (
                <PortableText
                  value={highlightedText as PortableTextBlock[]}
                  paragraphClassName='text-dark-blue text-lg xl:text-2xl 2xl:text-3xl'
                />
              ))}

            {description &&
              description.length > 0 &&
              (typeof description === 'string' ? (
                <p className='mt-6 md:mt-7.5 text-grey-text xl:text-lg 2xl:text-2xl leading-snug'>
                  {description}
                </p>
              ) : (
                <PortableText
                  value={description as PortableTextBlock[]}
                  className='mt-6 md:mt-7.5'
                  paragraphClassName='text-grey-text xl:text-lg 2xl:text-2xl'
                />
              ))}
          </div>
        )}

        {customComponent && customComponent}

        {link && (
          <TransitionLink
            href={`/${link}`}
            className='mt-10 xl:mt-12 2xl:mt-15 text-lg 2xl:text-2xl text-light-blue underline decoration-light-blue flex items-center gap-4 capitalize w-fit group'
          >
            <ArrowUpRight />
            {linkText && linkText.length > 0 && linkText}
          </TransitionLink>
        )}
      </div>

      <div className='hidden md:block md:aspect-[297/358] xl:aspect-[540/570] 2xl:aspect-auto md:min-w-4/10 md:w-4/10 xl:min-w-5/12 xl:w-5/12 overflow-hidden rounded-tl-[7.5rem] rounded-br-[7.5rem] xl:rounded-tl-[150px] xl:rounded-br-[150px] 2xl:rounded-tl-[12.5rem] 2xl:rounded-br-[12.5rem]'>
        <Image
          src={urlFor(image).url()}
          alt={heading}
          width={1080}
          height={1140}
          quality={100}
          priority
          className='object-cover w-full h-full'
        />
      </div>
    </section>
  );
};

export default SplitSection;
