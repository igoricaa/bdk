import SectionHeader from '../ui/section-header/section-header';
import { cn, formatDate } from '@/src/lib/utils';
import { Post } from '@/sanity.types';
import ArrowUpRight from '../ui/arrow-up-right';
import Section from '../ui/section';
import { TransitionLink } from '../transition-link';
import UnderlinedButton from '../ui/buttons/underlined-button';

const NewsroomSection = ({
  heading,
  description,
  subtitle,
  newsroomPosts,
  className,
}: {
  heading: string;
  description: string;
  subtitle: string;
  newsroomPosts: Post[];
  className?: string;
}) => {
  return (
    <Section variant='dark' underColor='bg-white' className={className}>
      <SectionHeader
        heading={heading}
        description={description}
        subtitle={subtitle}
        descriptionClassName='xl:max-w-1/3'
        colorVariant='light'
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-9 mt-8 xl:mt-11 2xl:mt-18'>
        {newsroomPosts.map((post, index) => (
          <TransitionLink
            href={`/${post.slug.current}`}
            key={post.slug.current}
            pageName={post.title}
            className={cn('group', index === 3 && 'hidden sm:max-xl:block')}
          >
            <article
              className={cn(
                'bg-white/5 rounded-br-[2.5rem] md:rounded-br-[3rem] lg:hover:rounded-br-none transition-all duration-300 h-77 md:h-88 xl:h-77 2xl:h-103 py-8 pl-4 pr-12 md:py-9 md:pl-5 md:pr-4 xl:py-8 xl:pl-5 xl:pr-13 2xl:py-10 2xl:pl-6 2xl:pr-18',
                index === 3 && 'hidden sm:max-xl:block'
              )}
            >
              <div className='flex flex-col justify-between h-full'>
                <div>
                  <p className='text-sm 2xl:text-base text-light-blue'>
                    {formatDate(post.date)}
                  </p>
                  <h3 className='text-2xl 2xl:text-[2rem] mt-5'>
                    {post.title}
                  </h3>
                </div>
                <ArrowUpRight />
              </div>
            </article>
          </TransitionLink>
        ))}
      </div>
      <UnderlinedButton
        href='/newsroom'
        className='mt-12 md:mt-17 xl:mt-12 2xl:mt-35 mx-auto'
      >
        View All News
      </UnderlinedButton>
    </Section>
  );
};

export default NewsroomSection;
