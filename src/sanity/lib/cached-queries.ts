import { cache } from 'react';
import { sanityFetch } from './client';
import {
  GENERAL_INFO_QUERY,
  HOME_PAGE_QUERY,
  PEOPLE_PAGE_QUERY,
  SERVICE_QUERY,
  LAWYERS_QUERY,
  LAWYERS_BY_CATEGORY_QUERY,
  AUTHORS_QUERY,
  SERVICES_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  FOREIGN_DESK_QUERY,
  ABOUT_US_PAGE_QUERY,
  CAREER_PAGE_QUERY,
  LAWYER_QUERY,
  POSTS_PREVIEW_BY_CATEGORY_QUERY,
  POSTS_BY_YEAR_DATETIME_QUERY,
  POSTS_BY_YEAR_COUNT_QUERY,
  YEARS_BY_CATEGORY_QUERY,
  NESTED_CATEGORIES_QUERY,
  GLOBAL_FEATURED_POSTS_QUERY,
  BLINKDRAFT_PAGE_QUERY,
  UNIVERSAL_AUTHOR_PAGE_QUERY,
} from './queries';
import type {
  GENERAL_INFO_QUERYResult,
  HOME_PAGE_QUERYResult,
  PEOPLE_PAGE_QUERYResult,
  LAWYERS_QUERYResult,
  LAWYERS_BY_CATEGORY_QUERYResult,
  AUTHORS_QUERYResult,
  SERVICES_QUERYResult,
  POSTS_BY_CATEGORY_QUERYResult,
  SERVICE_QUERYResult,
  FOREIGN_DESK_QUERYResult,
  ABOUT_US_PAGE_QUERYResult,
  CAREER_PAGE_QUERYResult,
  LAWYER_QUERYResult,
  POSTS_PREVIEW_BY_CATEGORY_QUERYResult,
  POSTS_BY_YEAR_DATETIME_QUERYResult,
  POSTS_BY_YEAR_COUNT_QUERYResult,
  YEARS_BY_CATEGORY_QUERYResult,
  NESTED_CATEGORIES_QUERYResult,
  GLOBAL_FEATURED_POSTS_QUERYResult,
  BLINKDRAFT_PAGE_QUERYResult,
  UNIVERSAL_AUTHOR_PAGE_QUERYResult,
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

export const getLawyerPageData = async (
  slug: string
): Promise<LAWYER_QUERYResult> => {
  return await sanityFetch({
    query: LAWYER_QUERY,
    params: { slug },
    tags: [`lawyer-${slug}`, 'lawyers'],
    revalidate: 43200,
  });
};

// export const getAuthorPageData = async (
//   slug: string
// ): Promise<AUTHOR_PAGE_QUERYResult> => {
//   return await sanityFetch({
//     query: AUTHOR_PAGE_QUERY,
//     params: { slug },
//     tags: [`author-${slug}`, 'authors'],
//   });
// };

export const getAuthorPageData = async (
  slug: string
): Promise<UNIVERSAL_AUTHOR_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: UNIVERSAL_AUTHOR_PAGE_QUERY,
    params: { slug },
    tags: [`author-${slug}`, 'authors'],
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

export const getBlinkdraftPageData = async (
  locale: string
): Promise<BLINKDRAFT_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: BLINKDRAFT_PAGE_QUERY,
    params: { locale },
    tags: ['blinkdraft-page-data'],
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

export const getPostsByCategory = async (
  slug: string,
  limit: number = 9
): Promise<POSTS_BY_CATEGORY_QUERYResult> => {
  return await sanityFetch({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { slug, limit },
    tags: [`posts-by-category-${slug}`],
    revalidate: 43200,
  });
};

export const getPostsByYear = async (
  categorySlug: string,
  year: string,
  page: number = 0,
  start: number,
  end: number
): Promise<POSTS_BY_YEAR_DATETIME_QUERYResult> => {
  return await sanityFetch({
    query: POSTS_BY_YEAR_DATETIME_QUERY,
    params: { categorySlug, year, page, start, end },
    tags: [`posts-by-year-${categorySlug}-${year}`],
    revalidate: false,
  });
};

export const getPostsByYearCount = async (
  categorySlug: string,
  year: string
): Promise<POSTS_BY_YEAR_COUNT_QUERYResult> => {
  return await sanityFetch({
    query: POSTS_BY_YEAR_COUNT_QUERY,
    params: { categorySlug, year },
    tags: [`posts-by-year-${categorySlug}-${year}`],
    revalidate: 43200,
  });
};

// General site information and settings (used on all pages)
export const getGeneralInfoData = cache(
  async (): Promise<GENERAL_INFO_QUERYResult> => {
    return await sanityFetch({
      query: GENERAL_INFO_QUERY,
      tags: ['general-info', 'blinkdraft'],
      revalidate: false,
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

// Enhanced lawyers by category with custom ordering (recommended for new implementations)
export const getLawyersByCategory = cache(
  async (): Promise<LAWYERS_BY_CATEGORY_QUERYResult> => {
    return await sanityFetch({
      query: LAWYERS_BY_CATEGORY_QUERY,
      tags: ['lawyers', 'lawyer-categories'],
      revalidate: 43200,
    });
  }
);

// Posts preview by category (used on home page)
export const getPostsPreviewByCategory = cache(
  async (
    slug: string,
    limit: number = 9
  ): Promise<POSTS_PREVIEW_BY_CATEGORY_QUERYResult> => {
    return await sanityFetch({
      query: POSTS_PREVIEW_BY_CATEGORY_QUERY,
      params: { slug, limit },
      tags: [`posts-by-category-${slug}`],
      revalidate: 43200,
    });
  }
);

export const getYearsByCategory = cache(
  async (slug: string): Promise<YEARS_BY_CATEGORY_QUERYResult> => {
    return await sanityFetch({
      query: YEARS_BY_CATEGORY_QUERY,
      params: { slug },
      tags: [`years-by-category-${slug}`],
      revalidate: false,
    });
  }
);

// Nested categories with post counts (used for category navigation)
export const getNestedCategories = cache(
  async (categorySlug: string): Promise<NESTED_CATEGORIES_QUERYResult> => {
    return await sanityFetch({
      query: NESTED_CATEGORIES_QUERY,
      params: { categorySlug },
      tags: [`nested-categories-${categorySlug}`, 'categories', 'posts'],
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

// Global featured posts (used on blog page - always the same)
export const getGlobalFeaturedPosts = cache(
  async (slug: string): Promise<GLOBAL_FEATURED_POSTS_QUERYResult> => {
    return await sanityFetch({
      query: GLOBAL_FEATURED_POSTS_QUERY,
      params: { slug },
      tags: ['global-featured-posts'],
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
