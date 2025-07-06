import { POST_QUERY } from '@/sanity/lib/queries';
import { client } from '@/sanity/lib/client';
import { POST_QUERYResult } from '@/sanity.types';
import { getGeneralInfo } from '@/sanity/lib/cached-queries';
import { ArrowLeftIcon, ArrowRightIcon, Calendar } from 'lucide-react';
import { Image } from 'next-sanity/image';
import { urlFor, urlForUncropped } from '@/sanity/lib/image';
import Link from 'next/link';
import PortableText from '@/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import { cn } from '@/lib/utils';
import RelatedPostsSection from '@/components/services/related-posts-section';
import ArrowLeft from '@/components/ui/arrow-left';

// Example of using cached generalInfo directly in a page
const PostPageWithCachedData = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  // Both queries will be cached - no duplicate requests!
  const [
    { currentPost, previousPost, nextPost, relatedPosts },
    { generalInfo, blinkdraft },
  ] = await Promise.all([
    client.fetch(POST_QUERY, { slug }),
    getGeneralInfo(), // This uses the same cached data as the layout
  ]);

  if (!currentPost) {
    return <div>Post not found</div>;
  }

  return (
    <main className='pt-7.5 md:pt-11 xl:pt-18 2xl:pt-35'>
      <div className='px-side pb-20 md:pb-22 xl:pb-42 2xl:pb-47 grid grid-cols-1 xl:grid-cols-12 gap-12'>
        {/* Now you can use generalInfo directly in the server component */}
        <div className='order-2 flex md:hidden xl:flex xl:order-1 xl:col-span-2'>
          <Link
            href={`/bdknowledge`}
            className='hidden md:flex items-center gap-3.5 h-fit text-dark-blue'
          >
            <ArrowLeft /> Back to Blog
          </Link>

          <div className='mt-8'>
            <p className='text-sm text-gray-600 mb-2'>Published by</p>
            <div className='flex items-center gap-3'>
              {generalInfo?.logo && (
                <Image
                  src={urlFor(generalInfo.logo).url()}
                  alt='Logo'
                  width={32}
                  height={32}
                  className='w-8 h-8 rounded'
                />
              )}
              <span className='text-sm font-medium'>{generalInfo?.title}</span>
            </div>
          </div>
        </div>

        <article className='order-1 xl:order-2 w-full xl:col-span-7 xl:col-start-4 2xl:col-span-8 2xl:col-start-4'>
          <PostHeader
            title={currentPost.title}
            date={currentPost.date}
            authors={currentPost.authors}
            categories={currentPost.categories}
            featuredMedia={currentPost.featuredMedia}
          />

          <div className='mt-7 md:mt-10 2xl:mt-15 border-b border-lightest-blue pb-9'>
            <PortableText value={currentPost.content as PortableTextBlock[]} />
          </div>

          <PostsNavigation
            previousPostSlug={previousPost?.slug?.current || ''}
            nextPostSlug={nextPost?.slug?.current || ''}
            className='mt-9'
          />
        </article>
      </div>

      <RelatedPostsSection
        newsroomPosts={relatedPosts?.slice(0, 4) || []}
        blogPosts={relatedPosts?.slice(4, 8) || []}
        insightsPosts={relatedPosts?.slice(8, 12) || []}
      />
    </main>
  );
};

// Helper components would go here...
const PostHeader = ({
  title,
  date,
  authors,
  categories,
  featuredMedia,
}: any) => (
  <div>
    <h1 className='text-2xl font-bold'>{title}</h1>
    <p className='text-gray-600'>{date}</p>
    {/* Add other header content */}
  </div>
);

const PostsNavigation = ({
  previousPostSlug,
  nextPostSlug,
  className,
}: any) => <div className={className}>{/* Add navigation content */}</div>;

export default PostPageWithCachedData;
