import { cache } from 'react';
import { sanityFetch } from './client';
import {
  GENERAL_INFO_QUERY,
  HOME_PAGE_QUERY,
  PEOPLE_PAGE_QUERY,
  SERVICE_QUERY,
  LAWYERS_QUERY,
  AUTHORS_QUERY,
  SERVICES_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  FOREIGN_DESK_QUERY,
  ABOUT_US_PAGE_QUERY,
  CAREER_PAGE_QUERY,
} from './queries';
import type {
  GENERAL_INFO_QUERYResult,
  HOME_PAGE_QUERYResult,
  PEOPLE_PAGE_QUERYResult,
  LAWYERS_QUERYResult,
  AUTHORS_QUERYResult,
  SERVICES_QUERYResult,
  POSTS_BY_CATEGORY_QUERYResult,
  SERVICE_QUERYResult,
  FOREIGN_DESK_QUERYResult,
  ABOUT_US_PAGE_QUERYResult,
  CAREER_PAGE_QUERYResult,
} from '@/sanity.types';

// Dont need to cache these, it's not used on multiple pages§

// Full home page data (combines multiple data types)
export const getHomePageData = async (): Promise<HOME_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: HOME_PAGE_QUERY,
    tags: ['home-page-data', 'blinkdraft'],
    revalidate: 43200,
  });
};

export const getPeoplePageData = async (): Promise<PEOPLE_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: PEOPLE_PAGE_QUERY,
    tags: ['people-page-data'],
    revalidate: 43200,
  });
};

export const getAboutUsPageData =
  async (): Promise<ABOUT_US_PAGE_QUERYResult> => {
    return await sanityFetch({
      query: ABOUT_US_PAGE_QUERY,
      tags: ['about-us-page-data'],
      revalidate: 43200,
    });
  };

export const getCareerPageData = async (): Promise<CAREER_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: CAREER_PAGE_QUERY,
    tags: ['career-page-data'],
    revalidate: 43200,
  });
};

export const getServicePageData = async (
  type: 'practice' | 'industry',
  slug: string
): Promise<SERVICE_QUERYResult> => {
  return await sanityFetch({
    query: SERVICE_QUERY,
    params: { type, slug },
    tags: [
      type === 'practice' ? 'practices' : 'industries',
      `${type}-${slug}`,
      'lawyers',
      'posts',
    ],
    revalidate: 43200,
  });
};

export const getForeignDeskPageData = async (
  slug: string
): Promise<FOREIGN_DESK_QUERYResult> => {
  return await sanityFetch({
    query: FOREIGN_DESK_QUERY,
    params: { slug },
    tags: ['foreign-desks', `foreign-desk-${slug}`, 'lawyers', 'posts'],
    revalidate: 43200,
  });
};

// General site information and settings (used on all pages)
export const getGeneralInfoData = cache(
  async (): Promise<GENERAL_INFO_QUERYResult> => {
    return await sanityFetch({
      query: GENERAL_INFO_QUERY,
      tags: ['general-info', 'blinkdraft'],
      revalidate: 43200,
    });
  }
);

// All lawyers (used on people page, home page, practice pages)
export const getLawyers = cache(async (): Promise<LAWYERS_QUERYResult> => {
  return await sanityFetch({
    query: LAWYERS_QUERY,
    tags: ['lawyers'],
    revalidate: 43200,
  });
});

// All posts by category (used on home page)
export const getPostsByCategory = cache(
  async (
    slug: string,
    limit: number = 9
  ): Promise<POSTS_BY_CATEGORY_QUERYResult> => {
    return await sanityFetch({
      query: POSTS_BY_CATEGORY_QUERY,
      params: { slug, limit },
      tags: [`posts-by-category-${slug}`],
      revalidate: 43200,
    });
  }
);

// Services data (industries, practices, foreign desks with full details)
export const getServicesData = cache(
  async (): Promise<SERVICES_QUERYResult> => {
    return await sanityFetch({
      query: SERVICES_QUERY,
      tags: ['services', 'industries', 'practices', 'foreign-desks'],
      revalidate: 43200,
    });
  }
);

// Authors (used for post authoring)
export const getAuthors = cache(async (): Promise<AUTHORS_QUERYResult> => {
  return await sanityFetch({
    query: AUTHORS_QUERY,
    tags: ['authors'],
    revalidate: 86400,
  });
});
