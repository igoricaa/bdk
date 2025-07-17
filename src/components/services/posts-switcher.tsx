'use client';

import { useState, useMemo } from 'react';
import { cn, formatDate } from '@/src/lib/utils';
import ArrowUpRight from '@/src/components/ui/arrow-up-right';
import { TransitionLink } from '@/src/components/transition-link';
import { Slug } from '@/sanity.types';
import SectionHeader from '../ui/section-header/section-header';
import UnderlinedButton from '../ui/buttons/underlined-button';
import FilterButtons from '../ui/filter-buttons';

interface RelatedPost {
  title: string;
  slug: Slug;
  date: string;
}

interface PostsSwitcherProps {
  title: string;
  newsroomPosts?: RelatedPost[];
  blogPosts?: RelatedPost[];
  insightsPosts?: RelatedPost[];
  publications?: RelatedPost[];
}

export default function PostsSwitcher({
  title,
  newsroomPosts,
  blogPosts,
  insightsPosts,
  publications,
}: PostsSwitcherProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  if (!newsroomPosts && !blogPosts && !insightsPosts && !publications) {
    return null;
  }

  const allPosts = [
    ...(newsroomPosts || []),
    ...(blogPosts || []),
    ...(insightsPosts || []),
    ...(publications || []),
  ];

  const categories = useMemo(() => {
    const categoryConfig = [
      { id: 'all', label: 'All', posts: allPosts },
      { id: 'newsroom', label: 'Newsroom', posts: newsroomPosts },
      { id: 'blog', label: 'Blog Posts', posts: blogPosts },
      { id: 'insights', label: 'BDK Insights', posts: insightsPosts },
      { id: 'publications', label: 'Publications', posts: publications },
    ];

    return categoryConfig
      .filter(({ posts }) => posts && posts.length > 0)
      .map(({ id, label }) => ({ slug: id, label }));
  }, [newsroomPosts, blogPosts, insightsPosts, publications]);

  // const getDefaultCategory = () => {
  //   if (newsroomPosts && newsroomPosts.length > 0) return 'newsroom';
  //   if (blogPosts && blogPosts.length > 0) return 'blog';
  //   if (insightsPosts && insightsPosts.length > 0) return 'insights';
  //   if (publications && publications.length > 0) return 'publications';
  //   return null;
  // };

  const currentPosts = useMemo(() => {
    switch (activeCategory) {
      case 'all':
        return [
          ...(newsroomPosts || []),
          ...(blogPosts || []),
          ...(insightsPosts || []),
          ...(publications || []),
        ];
      case 'newsroom':
        return newsroomPosts;
      case 'blog':
        return blogPosts;
      case 'insights':
        return insightsPosts;
      case 'publications':
        return publications;
      default:
        return [];
    }
  }, [activeCategory, newsroomPosts, blogPosts, insightsPosts, publications]);

  if (!activeCategory || !currentPosts || currentPosts.length === 0) {
    return null;
  }

  return (
    <div>
      <SectionHeader
        heading={title}
        rightSideComponent={
          <FilterButtons
            options={categories}
            activeOption={activeCategory}
            onOptionChange={setActiveCategory}
          />
        }
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-9 mt-8 xl:mt-11 2xl:mt-17'>
        {currentPosts.slice(0, 4).map((post, index) => (
          <article
            key={index}
            className={cn(
              'bg-white/5 rounded-br-[2.5rem] md:rounded-br-[50px] h-77 md:h-88 xl:h-77 2xl:h-103',
              index === 3 && 'hidden sm:max-xl:block'
            )}
          >
            <TransitionLink
              href={`/${post.slug.current}`}
              pageName={post.title}
              className='block h-full py-8 pl-4 pr-12 md:py-9 md:pl-5 md:pr-4 xl:py-8 xl:pl-5 xl:pr-13 2xl:py-10 2xl:pl-6 2xl:pr-18 group'
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
            </TransitionLink>
          </article>
        ))}
      </div>

      <UnderlinedButton
        href={`/${activeCategory}`}
        className='mx-auto mt-12 2xl:mt-30'
      >
        View All Posts
      </UnderlinedButton>
    </div>
  );
}
