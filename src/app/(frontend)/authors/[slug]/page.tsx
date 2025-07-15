import AuthorPostsSection from '@/src/components/authors/author-posts-section';
import PostCard from '@/src/components/posts/post-card';
import { TransitionLink } from '@/src/components/transition-link';
import BackToButton from '@/src/components/ui/buttons/back-to-button';
import { FilterOption } from '@/src/components/ui/filter-buttons';
import LinkedinIcon from '@/src/components/ui/icons/linkedin-icon';
import PortableText from '@/src/components/ui/portable-text';
import { getAuthorPageData } from '@/src/sanity/lib/cached-queries';
import { urlForUncropped } from '@/src/sanity/lib/image';

import { PortableTextBlock } from 'next-sanity';
import { Image } from 'next-sanity/image';
import Link from 'next/link';
import { Suspense } from 'react';

const AuthorPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const author = await getAuthorPageData(slug);

  if (!author) {
    return <div>Author not found</div>;
  }

  // console.log('best', author);
  // console.log('posts', author.posts);

  return (
    <main id='authorPage' className='pt-header bg-light-blue-bg'>
      <div className='grid grid-cols-1 xl:grid-cols-12 gap-24 sm:gap-20 xl:gap-8 pb-24 md:pb-30 2xl:pb-42 pt-8 sm:pt-11 xl:pt-0'>
        <section className='px-side xl:pr-0 col-span-1 xl:col-span-5 2xl:col-span-4 w-full xl:w-[calc(80%+32px)]'>
          <div className='xl:sticky xl:top-20 flex flex-col gap-5 sm:gap-6 xl:gap-9 2xl:gap-18 sm:flex-row xl:flex-col '>
            <div className='w-full sm:w-1/2 xl:w-full h-auto rounded-br-[50px] xl:rounded-br-[150px] overflow-hidden aspect-[518/547]'>
              <Image
                src={urlForUncropped(author.picture).url() || ''}
                alt={author?.name || ''}
                width={777}
                height={821}
                quality={100}
                priority
                className='w-full h-full object-cover object-top'
              />
            </div>
            <div className='sm:mt-auto xl:mt-0 sm:pb-12 xl:pb-0'>
              <div className='flex flex-col gap-4 2xl:gap-8'>
                <h1 className='text-dark-blue text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl'>
                  {author.name}
                </h1>
                <p className='text-dark-blue sm:text-lg 2xl:text-2xl'>
                  {author.title}
                </p>
              </div>
              {author.contactInfo?.phone && (
                <a
                  href={`tel:${author.contactInfo.phone}`}
                  className='text-grey-text mt-4 2xl:mt-5 sm:text-lg 2xl:text-2xl underline block'
                >
                  {author.contactInfo.phone}
                </a>
              )}
              {author.contactInfo?.email && (
                <a
                  href={`mailto:${author.contactInfo.email}`}
                  className='text-grey-text mt-1 sm:mt-2 2xl:mt-3 sm:text-lg 2xl:text-2xl underline block'
                >
                  {author.contactInfo.email}
                </a>
              )}
              {author.contactInfo?.linkedin && (
                <Link
                  href={author.contactInfo.linkedin}
                  target='_blank'
                  className='block mt-5 md:mt-6'
                >
                  <LinkedinIcon className='w-6 h-6 xl:w-5.5 xl:h-5.5 2xl:w-6 2xl:h-6' />
                </Link>
              )}
            </div>
          </div>
        </section>
        <section className='col-span-1 xl:col-span-7 xl:col-start-6 xl:pt-18 2xl:pt-23'>
          <div className='px-side xl:pl-0'>
            <BackToButton
              href='/people'
              text='Back to People'
              iconClassName='bg-dark-blue'
              className='hidden xl:flex ml-auto'
            />
            <div className='xl:mt-18 2xl:mt-43'>
              <h2 className='text-dark-blue text-2xl sm:text-3xl 2xl:text-4xl'>
                Background
              </h2>
              <PortableText
                value={author.bio as PortableTextBlock[]}
                className='mt-8 xl:mt-10 2xl:mt-15'
              />
            </div>

            <TransitionLink
              href={`/people/${author.slug.current}`}
              pageName={author.name}
              className='block text-light-blue md:text-lg 2xl:text-xl whitespace-nowrap underline decoration-light-blue underline-offset-3 mt-10 2xl:mt-15'
            >
              Read more
            </TransitionLink>
          </div>

          {author.authorId && author.posts && author.posts.length > 0 && (
            <AuthorPostsSection
              posts={author.posts}
              className='mt-10 xl:mt-15 2xl:mt-18'
              authorId={author.authorId as string}
            />
          )}
        </section>
      </div>
    </main>
  );
};

export default AuthorPage;

{
  /* <Suspense fallback={<div>Loading posts...</div>}>
            <PostsGrid
              heading='Posts'
              initialPosts={posts}
              showSidebar={false}
              categoryFilterOptions={categoryFilterOptions}
              initialCategory='all'
            />
          </Suspense> */
}
