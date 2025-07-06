import SectionHeader from '../ui/section-header/section-header';
import { cn } from '@/lib/utils';
import { Post } from '@/sanity.types';
import ArrowUpRight from '../ui/arrow-up-right';

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
    <section className={cn('bg-white', className)}>
      <div className='rounded-t-main bg-dark-blue text-white py-19 md:pt-23 md:pb-28 xl:pt-30 xl:pb-35 2xl:py-43 px-side'>
        <SectionHeader
          heading={heading}
          description={description}
          subtitle={subtitle}
          descriptionClassName='xl:max-w-1/3'
          colorVariant='light'
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-9 mt-8'>
          {newsroomPosts.map((post, index) => (
            <article
              key={index}
              className={cn(
                'bg-white/5 rounded-br-[2.5rem] md:rounded-br-[50px] h-77 md:h-88 xl:h-77 2xl:h-103',
                index === 3 && 'hidden sm:max-xl:block'
              )}
            >
              <a
                href={`/newsroom/${post.slug.current}`}
                className='block h-full py-8 pl-4 pr-12 md:py-9 md:pl-5 md:pr-4 xl:py-8 xl:pl-5 xl:pr-13 2xl:py-10 2xl:pl-6 2xl:pr-18'
              >
                <div className='flex flex-col justify-between h-full'>
                  <div>
                    <p className='text-sm 2xl:text-base text-light-blue'>
                      {post.date}
                    </p>
                    <h3 className='text-2xl 2xl:text-[2rem] mt-5'>
                      {post.title}
                    </h3>
                  </div>
                  <ArrowUpRight />
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className='text-center mt-12 md:mt-17 xl:mt-12 2xl:mt-35'>
          <a
            href='#'
            className='text-light-blue hover:text-light-blue/80 transition-colors text-lg'
          >
            View All News
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsroomSection;
