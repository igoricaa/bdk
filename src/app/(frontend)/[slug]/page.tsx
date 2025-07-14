import { POST_QUERY, POSTS_QUERY_WITH_SLUGS } from '@/src/sanity/lib/queries';
import { sanityFetch } from '@/src/sanity/lib/client';
import { POST_QUERYResult, POSTS_QUERY_WITH_SLUGSResult } from '@/sanity.types';
import { ArrowLeftIcon, ArrowRightIcon, Calendar, Clock } from 'lucide-react';
import { Image } from 'next-sanity/image';
import { urlFor, urlForUncropped } from '@/src/sanity/lib/image';
import PortableText from '@/src/components/ui/portable-text';
import { PortableTextBlock } from 'next-sanity';
import {
  calculateReadingTimeFromPortableText,
  cn,
  formatDate,
} from '@/src/lib/utils';
import RelatedPostsSection from '@/src/components/services/related-posts-section';
import ShareButtons from '@/src/components/posts/share-buttons';
import BackToButton from '@/src/components/ui/buttons/back-to-button';
import { ScrollProgress } from '@/src/components/ui/scroll-progress';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { TransitionLink } from '@/src/components/transition-link';

export async function generateStaticParams() {
  const posts: POSTS_QUERY_WITH_SLUGSResult = await sanityFetch({
    query: POSTS_QUERY_WITH_SLUGS,
  });
  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { currentPost } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
  });

  if (!currentPost) {
    return {
      title: 'Post Not Found',
    };
  }

  const description =
    currentPost.excerpt && currentPost.excerpt.length > 0
      ? currentPost.excerpt
          .map(
            (block: any) =>
              block.children?.map((child: any) => child.text).join(' ') || ''
          )
          .join(' ')
          .substring(0, 160)
      : `Read ${currentPost.title} on BDK Law Firm blog`;

  return {
    title: currentPost.title,
    description,
    openGraph: {
      title: currentPost.title,
      description,
      type: 'article',
      publishedTime: currentPost.date,
      authors: currentPost.authors
        ?.map((author: any) =>
          author.type === 'lawyer'
            ? author.lawyer?.name
            : author.customAuthor?.name
        )
        .filter(Boolean) as string[],
      ...(currentPost.featuredMedia && {
        images: [
          {
            url: urlFor(currentPost.featuredMedia)
              .width(1200)
              .height(630)
              .url(),
            width: 1200,
            height: 630,
            alt: currentPost.title,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: currentPost.title,
      description,
      ...(currentPost.featuredMedia && {
        images: [
          urlFor(currentPost.featuredMedia).width(1200).height(630).url(),
        ],
      }),
    },
  };
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  const { currentPost, previousPost, nextPost, relatedPosts } =
    await sanityFetch({
      query: POST_QUERY,
      params: { slug },
      tags: ['posts', `post-${slug}`, 'categories', 'authors'],
    });

  if (!currentPost) {
    notFound();
  }

  const readingTime = calculateReadingTimeFromPortableText(
    currentPost.content as PortableTextBlock[]
  );

  const newsroomPosts =
    relatedPosts
      ?.filter((post: any) =>
        post.categories?.some((cat: any) =>
          cat.name?.toLowerCase().includes('newsroom')
        )
      )
      .slice(0, 4) || [];

  const blogPosts =
    relatedPosts
      ?.filter((post: any) =>
        post.categories?.some(
          (cat: any) =>
            cat.name?.toLowerCase().includes('blog') ||
            cat.name?.toLowerCase().includes('latest')
        )
      )
      .slice(0, 4) || [];

  const insightsPosts =
    relatedPosts
      ?.filter((post: any) =>
        post.categories?.some(
          (cat: any) =>
            cat.name?.toLowerCase().includes('insight') ||
            cat.name?.toLowerCase().includes('bdk')
        )
      )
      .slice(0, 4) || [];

  return (
    <main className='pt-header'>
      <div className='px-side pb-20 md:pb-22 xl:pb-42 2xl:pb-47 grid grid-cols-1 xl:grid-cols-12 gap-12 pt-7.5 md:pt-11 xl:pt-18 2xl:pt-35'>
        <div className='order-2 md:hidden xl:flex xl:order-1 xl:col-span-2 xl:sticky xl:top-60 xl:self-start'>
          <div className='flex xl:flex-col justify-end xl:justify-start'>
            <BackToButton
              href='/bdknowledge'
              text='Back to Blog'
              iconClassName='bg-light-blue'
              className='hidden md:flex'
            />

            <ShareButtons
              postSlug={currentPost.slug.current}
              postTitle={currentPost.title}
            />
          </div>
        </div>

        <article className='order-1 xl:order-2 w-full xl:col-span-7 xl:col-start-4 2xl:col-span-8 2xl:col-start-4'>
          <ScrollProgress />
          <PostHeader
            title={currentPost.title}
            date={formatDate(currentPost.date)}
            readingTime={readingTime}
            authors={currentPost.authors}
            categories={currentPost.categories}
            featuredMedia={currentPost.featuredMedia}
            currentPost={currentPost}
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
        title='Related posts'
        newsroomPosts={newsroomPosts}
        blogPosts={blogPosts}
        insightsPosts={insightsPosts}
      />
    </main>
  );
};

export default PostPage;

const AuthorsBlock = ({
  authors,
  currentPost,
}: {
  authors: NonNullable<POST_QUERYResult['currentPost']>['authors'];
  currentPost: NonNullable<POST_QUERYResult['currentPost']>;
}) => {
  return (
    <div className='mt-2 md:mt-5 md:flex md:items-center md:justify-between xl:block'>
      <div className='flex items-center gap-4 flex-wrap'>
        {authors.map((author) => (
          <div key={author._id}>
            {author.type === 'lawyer' && author.lawyer && (
              <TransitionLink
                href={`/people/${author.lawyer.slug?.current}`}
                className='flex items-center gap-4 2xl:gap-5'
              >
                <div className='w-12.5 h-12.5 2xl:h-16 2xl:w-16 rounded-full overflow-hidden'>
                  <Image
                    src={urlForUncropped(author.lawyer.picture).url() || ''}
                    alt={author.lawyer?.name || ''}
                    width={100}
                    height={100}
                    priority
                    className='object-cover object-top h-full'
                  />
                </div>
                <div>
                  <p className='text-dark-blue 2xl:text-xl whitespace-nowrap'>
                    {author.lawyer.name}
                  </p>
                  <p className='text-grey-random mt-1 text-sm 2xl:text-base'>
                    {author.lawyer.title}
                  </p>
                </div>
              </TransitionLink>
            )}
            {author.type === 'custom' && author.customAuthor && (
              <TransitionLink
                href={`/people/${author.customAuthor.slug.current}`}
                className='text-dark-blue 2xl:text-xl whitespace-nowrap'
              >
                {author.customAuthor.name}
              </TransitionLink>
            )}
          </div>
        ))}
      </div>
      <ShareButtons
        postSlug={currentPost.slug.current}
        postTitle={currentPost.title}
        className='hidden md:flex xl:hidden'
      />
    </div>
  );
};

const DateBlock = ({ date }: { date: string }) => {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-light-blue text-xxs xl:text-sm 2xl:text-base flex items-center gap-2'>
        <Calendar className='w-4 h-4' />
        {date}
      </span>
    </div>
  );
};

const ReadingTimeBlock = ({ readingTime }: { readingTime: string }) => {
  return (
    <div className='flex items-center gap-2'>
      <span className='text-light-blue text-xxs xl:text-sm 2xl:text-base flex items-center gap-2'>
        <Clock className='w-4 h-4' />
        {readingTime}
      </span>
    </div>
  );
};

const PostHeader = ({
  title,
  date,
  readingTime,
  authors,
  categories,
  featuredMedia,
  currentPost,
}: {
  title: string;
  date: string;
  readingTime: string;
  authors: NonNullable<POST_QUERYResult['currentPost']>['authors'];
  categories: NonNullable<POST_QUERYResult['currentPost']>['categories'];
  featuredMedia: NonNullable<POST_QUERYResult['currentPost']>['featuredMedia'];
  currentPost: NonNullable<POST_QUERYResult['currentPost']>;
}) => {
  return (
    <div className='flex flex-col md:flex-col-reverse gap-6 md:gap-10 xl:gap-4 2xl:gap-19'>
      <div>
        <div className='flex items-center gap-4 md:gap-8'>
          <DateBlock date={date} />
          <ReadingTimeBlock readingTime={readingTime} />
        </div>

        <AuthorsBlock authors={authors} currentPost={currentPost} />

        <div className='mt-4 md:mt-19 xl:mt-7 2xl:mt-22'>
          <div className='rounded-[10px] md:rounded-[1.25rem] overflow-hidden aspect-[361/270]'>
            <Image
              src={urlFor(featuredMedia).url() || ''}
              alt={title}
              width={1600}
              height={1197}
              priority
              className='w-full object-cover'
            />
          </div>
          <div className='flex gap-2 mt-4 md:mt-5 2xl:mt-9.5'>
            {categories.map((category) => (
              <span
                key={category._id}
                className='text-dark-blue bg-dark-blue/20 rounded-[500px] flex items-center justify-center h-7.5 px-3 text-xxs 2xl:text-sm'
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <h1 className='text-dark-blue text-3xl md:text-[2rem] xl:text-5xl 2xl:text-[55px]'>
        {title}
      </h1>
    </div>
  );
};

const PostsNavigation = ({
  previousPostSlug,
  nextPostSlug,
  className,
}: {
  previousPostSlug: string;
  nextPostSlug: string;
  className?: string;
}) => {
  if (!previousPostSlug && !nextPostSlug) {
    return null;
  }

  return (
    <div className={cn('flex justify-between items-center', className)}>
      {previousPostSlug ? (
        <PostNavigationLink href={`/${previousPostSlug}`} direction='previous'>
          Previous
        </PostNavigationLink>
      ) : (
        <div />
      )}
      {nextPostSlug ? (
        <PostNavigationLink href={`/${nextPostSlug}`} direction='next'>
          Next
        </PostNavigationLink>
      ) : (
        <div />
      )}
    </div>
  );
};

const PostNavigationLink = ({
  href,
  children,
  direction,
}: {
  href: string;
  children: React.ReactNode;
  direction: 'previous' | 'next';
}) => {
  return (
    <TransitionLink
      href={href}
      className={cn(
        'border border-[#BEC1C6] rounded-[500px] text-[#BEC1C6] text-lg flex gap-2.5 items-center h-12.5',
        direction === 'previous'
          ? 'pl-2 pr-4.5'
          : 'pr-2 pl-4.5 flex-row-reverse'
      )}
    >
      <div className='bg-[#BEC1C6] rounded-full'>
        {direction === 'previous' ? (
          <ArrowLeftIcon className='w-9 h-9' strokeWidth={1} stroke='#fff' />
        ) : (
          <ArrowRightIcon className='w-9 h-9' strokeWidth={1} stroke='#fff' />
        )}
      </div>
      {children}
    </TransitionLink>
  );
};
