import { Post } from '@/sanity.types';
import { Image } from 'next-sanity/image';
import { urlFor } from '@/sanity/lib/image';
import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import Link from 'next/link';
import ArrowUpRight from '@/components/ui/arrow-up-right';

const placeholderExcerpt: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'placeholder',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: 'placeholder-span',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        marks: [],
      },
    ],
  },
];
const FeaturedPostCard = ({ post, index }: { post: Post; index: number }) => {
  return (
    <article
      key={post._id}
      className='flex gap-18 md:gap-6 xl:gap-32 3xl:gap-51'
    >
      <div className='pb-19 md:pb-8 xl:pb-37 3xl:pb-50'>
        <h1 className='text-sm text-white bg-dark-blue flex items-center justify-center h-7.5 2xl:h-10 px-4 2xl:px-5 rounded-[500px] w-fit'>
          Featured Posts
        </h1>
        <h2 className='text-dark-blue mt-6 xl:mt-12 2xl:mt-13 md:text-5 text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl'>
          {post.title}
        </h2>

        <div className='w-full md:hidden overflow-hidden rounded-tl-[5rem] rounded-br-[5rem] mt-6'>
          <Image
            src={urlFor(post.featuredMedia).url()}
            alt={post.title}
            width={361}
            height={381}
            className='object-cover w-full h-full'
            priority={index === 0}
          />
        </div>

        {post.excerpt && post.excerpt.length > 0 ? (
          <PortableText
            value={post.excerpt as PortableTextBlock[]}
            className='mt-6 md:mt-7.5 2xl:mt-10 text-grey-text xl:text-lg 2xl:text-2xl'
          />
        ) : (
          <PortableText
            value={placeholderExcerpt}
            className='mt-6 md:mt-7.5 2xl:mt-10 text-grey-text xl:text-lg 2xl:text-2xl'
          />
        )}

        <Link
          href={`/bdknowledge/${post.slug.current}`}
          className='mt-10 xl:mt-12 2xl:mt-15 text-lg 2xl:text-2xl text-light-blue underline decoration-light-blue flex items-center gap-4 capitalize w-fit'
        >
          <ArrowUpRight />
          Read more
        </Link>
      </div>

      <div className='hidden md:block min-w-4/10 w-4/10 xl:min-w-5/12 xl:w-5/12 overflow-hidden rounded-tl-[7.5rem] rounded-br-[7.5rem] xl:rounded-tl-[150px] xl:rounded-br-[150px] 2xl:rounded-tl-[12.5rem] 2xl:rounded-br-[12.5rem]'>
        <Image
          src={urlFor(post.featuredMedia).url()}
          alt={post.title}
          width={1080}
          height={1140}
          className='object-cover w-full h-full'
          priority={index === 0}
        />
      </div>
    </article>
  );
};

export default FeaturedPostCard;
