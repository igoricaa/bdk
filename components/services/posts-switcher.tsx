'use client';

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import ArrowUpRight from '@/components/ui/arrow-up-right';
import Link from 'next/link';
import { Slug } from '@/sanity.types';
import CategoriesFilter from './categories-filter';
import SectionHeader from '../ui/section-header/section-header';

interface RelatedPost {
  title: string;
  slug: Slug;
  date: string;
}

interface PostsSwitcherProps {
  newsroomPosts?: RelatedPost[];
  blogPosts?: RelatedPost[];
  insightsPosts?: RelatedPost[];
}

export default function PostsSwitcher({
  newsroomPosts,
  blogPosts,
  insightsPosts,
}: PostsSwitcherProps) {
  if (!newsroomPosts && !blogPosts && !insightsPosts) {
    return null;
  }

  const categories = useMemo(() => {
    const categoryConfig = [
      { id: 'newsroom', label: 'Newsroom', posts: newsroomPosts },
      { id: 'blog', label: 'Blog Posts', posts: blogPosts },
      { id: 'insights', label: 'BDK Insights', posts: insightsPosts },
    ];

    return categoryConfig
      .filter(({ posts }) => posts && posts.length > 0)
      .map(({ id, label }) => ({ id, label }));
  }, [newsroomPosts, blogPosts, insightsPosts]);

  const getDefaultCategory = () => {
    if (newsroomPosts && newsroomPosts.length > 0) return 'newsroom';
    if (blogPosts && blogPosts.length > 0) return 'blog';
    if (insightsPosts && insightsPosts.length > 0) return 'insights';
    return null;
  };

  const [activeCategory, setActiveCategory] = useState('all');

  const currentPosts = useMemo(() => {
    switch (activeCategory) {
      case 'all':
        return [
          ...(newsroomPosts || []),
          ...(blogPosts || []),
          ...(insightsPosts || []),
        ];
      case 'newsroom':
        return newsroomPosts;
      case 'blog':
        return blogPosts;
      case 'insights':
        return insightsPosts;
      default:
        return [];
    }
  }, [activeCategory, newsroomPosts, blogPosts, insightsPosts]);

  if (!activeCategory || !currentPosts || currentPosts.length === 0) {
    return null;
  }

  return (
    <div className='space-y-8'>
      <SectionHeader
        heading='Related posts'
        rightSideComponent={
          <CategoriesFilter
            options={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        }
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 xl:gap-9'>
        {currentPosts.map((post, index) => (
          <article
            key={index}
            className={cn(
              'bg-white/5 rounded-br-[2.5rem] md:rounded-br-[50px] h-77 md:h-88 xl:h-77 2xl:h-103',
              index === 3 && 'hidden sm:max-xl:block'
            )}
          >
            <Link
              href={`/${activeCategory}/${post.slug.current}`}
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
            </Link>
          </article>
        ))}
      </div>

      <div className='text-center'>
        <Link
          href={`/${activeCategory}`}
          className='text-light-blue hover:text-light-blue/80 transition-colors text-lg'
        >
          View All Posts
        </Link>
      </div>
    </div>
  );
}
