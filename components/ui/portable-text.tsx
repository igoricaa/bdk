import {
  PortableText as PortableTextSanity,
  PortableTextBlock,
  PortableTextComponents,
} from 'next-sanity';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface PortableTextCustomProps {
  value: PortableTextBlock[];
  className?: string;
}

const PortableText = ({ value, className }: PortableTextCustomProps) => {
  const components: PortableTextComponents = {
    block: {
      // h1: ({ children, value }) => (
      //   // Add an anchor to the h1
      //   <h1 className='group relative'>
      //     {children}
      //     <a
      //       href={`#${value?._key}`}
      //       className='absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity'
      //     >
      //       <svg
      //         xmlns='http://www.w3.org/2000/svg'
      //         className='h-4 w-4'
      //         fill='none'
      //         viewBox='0 0 24 24'
      //         stroke='currentColor'
      //       >
      //         <path
      //           strokeLinecap='round'
      //           strokeLinejoin='round'
      //           strokeWidth={2}
      //           d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
      //         />
      //       </svg>
      //     </a>
      //   </h1>
      // ),
      // h2: ({ children, value }) => {
      //   // Add an anchor to the h2
      //   return (
      //     <h2 className='group relative'>
      //       {children}
      //       <a
      //         href={`#${value?._key}`}
      //         className='absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity'
      //       >
      //         <svg
      //           xmlns='http://www.w3.org/2000/svg'
      //           className='h-4 w-4'
      //           fill='none'
      //           viewBox='0 0 24 24'
      //           stroke='currentColor'
      //         >
      //           <path
      //             strokeLinecap='round'
      //             strokeLinejoin='round'
      //             strokeWidth={2}
      //             d='M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1'
      //           />
      //         </svg>
      //       </a>
      //     </h2>
      //   );
      // },
      normal: ({ value, children }) => (
        <p
          className='mt-4 md:mt-4.5 2xl:mt-6 md:text-lg 2xl:text-2xl'
          id={value?._key}
        >
          {children}
        </p>
      ),
    },
    // marks: {
    //   link: ({ children, value: link }) => {
    //     return <Link href={link.href}>{children}</Link>;
    //   },
    // },
    // types: {
    //   image: ({ value }: any) => {
    //     if (!value?.asset?._ref) {
    //       return null;
    //     }
    //     return (
    //       <div className='my-8'>
    //         <img
    //           src={urlFor(value).url()}
    //           alt={value.alt || 'Image'}
    //           className='w-full h-auto rounded-lg'
    //         />
    //         {value.alt && (
    //           <p className='text-sm text-gray-500 mt-2'>{value.alt}</p>
    //         )}
    //       </div>
    //     );
    //   },
    // },
  };

  return (
    <div className={cn(className)}>
      <PortableTextSanity value={value} components={components} />
    </div>
  );
};

export default PortableText;
