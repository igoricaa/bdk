import {
  PortableText as PortableTextSanity,
  PortableTextBlock,
  PortableTextComponents,
} from 'next-sanity';
import { Image } from 'next-sanity/image';
import { cn } from '@/src/lib/utils';
import { urlFor } from '@/src/sanity/lib/image';

interface PortableTextCustomProps {
  value: PortableTextBlock[];
  className?: string;
  paragraphClassName?: string;
}

const PortableText = ({
  value,
  className,
  paragraphClassName,
}: PortableTextCustomProps) => {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => (
        <div className='my-6 md:my-8 rounded-lg overflow-hidden'>
          <Image
            src={urlFor(value).url()}
            alt={value.alt || ''}
            width={800}
            height={600}
            className='w-full h-auto object-cover'
          />
        </div>
      ),
      externalImage: ({ value }) => (
        <div className='my-6 md:my-8 rounded-lg overflow-hidden'>
          <img
            src={value.url}
            alt={value.alt || ''}
            className='w-full h-auto object-cover'
          />
        </div>
      ),
    },
    block: {
      h1: ({ value, children }) => (
        <h1
          className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-7 mt-13 md:mb-11 md:mt-17'
          id={value?._key}
        >
          {children}
        </h1>
      ),

      // H2 Headline: 24px → 30px → 36px → 48px
      h2: ({ value, children }) => (
        <h2
          className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-5 mt-11 md:mb-9 md:mt-15'
          id={value?._key}
        >
          {children}
        </h2>
      ),

      // H3 Headline: 20px → 24px → 24px → 36px
      h3: ({ value, children }) => (
        <h3
          className='text-xl md:text-2xl lg:text-2xl xl:text-4xl font-bold leading-tight mb-4 mt-10 md:mb-7 md:mt-14'
          id={value?._key}
        >
          {children}
        </h3>
      ),

      // H4 Headline: 18px → 20px → 20px → 32px
      h4: ({ value, children }) => (
        <h4
          className='text-lg md:text-xl lg:text-xl xl:text-3xl font-bold leading-tight mb-3 mt-9 md:mb-5 md:mt-13'
          id={value?._key}
        >
          {children}
        </h4>
      ),

      h5: ({ value, children }) => (
        <h5
          className='text-base md:text-lg lg:text-lg xl:text-2xl font-bold leading-tight mb-2 mt-8 md:mb-4 md:mt-12'
          id={value?._key}
        >
          {children}
        </h5>
      ),

      h6: ({ value, children }) => (
        <h6
          className='text-sm md:text-base lg:text-base xl:text-xl font-bold leading-tight mb-2 mt-8 md:mb-3 md:mt-11'
          id={value?._key}
        >
          {children}
        </h6>
      ),

      // Quote Text: 20px → 24px → 24px → 32px (Italic)
      blockquote: ({ value, children }) => (
        <blockquote
          className='text-xl md:text-2xl lg:text-2xl xl:text-3xl italic border-l-4 border-gray-300 pl-6 my-6 leading-relaxed text-grey-text md:leading-8 md:my-8'
          id={value?._key}
        >
          {children}
        </blockquote>
      ),

      highlighted: ({ value, children }) => (
        <p
          className='text-xl md:text-2xl lg:text-2xl xl:text-3xl text-dark-blue font-medium leading-relaxed mb-2 mt-6 md:leading-8 md:mb-4 md:mt-8'
          id={value?._key}
        >
          {children}
        </p>
      ),
      normal: ({ value, children }) => (
        <p
          className={cn(
            'text-lg leading-7 -mb-2 first:mt-0 mt-6 md:text-xl md:leading-8 md:first:mt-0 md:mt-10 text-grey-text',
            paragraphClassName
          )}
          id={value?._key}
        >
          {children}
        </p>
      ),
    },

    marks: {
      strong: ({ children }) => (
        <strong className='font-bold'>{children}</strong>
      ),
      em: ({ children }) => <em className='italic'>{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className='text-light-blue hover:text-light-blue/80 transition-colors'
          target='_blank'
          rel='noopener noreferrer'
        >
          {children}
        </a>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className='list-disc ml-6 mb-2 mt-6 text-base md:text-lg lg:text-lg xl:text-2xl leading-relaxed text-grey-text md:mb-4 md:mt-8 md:leading-7'>
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className='list-decimal ml-6 mb-2 mt-6 text-base md:text-lg lg:text-lg xl:text-2xl leading-relaxed text-grey-text md:mb-4 md:mt-8 md:leading-7'>
          {children}
        </ol>
      ),
    },

    listItem: {
      bullet: ({ children }) => (
        <li className='mb-2 leading-relaxed md:mb-3'>{children}</li>
      ),
      number: ({ children }) => (
        <li className='mb-2 leading-relaxed md:mb-3'>{children}</li>
      ),
    },
  };

  return (
    <div className={cn('prose prose-lg max-w-none', className)}>
      <PortableTextSanity value={value} components={components} />
    </div>
  );
};

export default PortableText;
