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
  PRIVACY_NOTICE_QUERY,
  COOKIE_POLICY_QUERY,
  BLINKDRAFT_SUBSCRIPTION_FORM_QUERY,
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
  PRIVACY_NOTICE_QUERYResult,
  COOKIE_POLICY_QUERYResult,
  BLINKDRAFT_SUBSCRIPTION_FORM_QUERYResult,
} from '@/sanity.types';

// --- Singleton Page Data ---

export const getHomePageData = async (): Promise<HOME_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: HOME_PAGE_QUERY,
    tags: ['home-page-data', 'blinkdraft'],
  });
};

export const getPeoplePageData = async (): Promise<PEOPLE_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: PEOPLE_PAGE_QUERY,
    tags: ['people-page-data'],
  });
};

export const getAboutUsPageData =
  async (): Promise<ABOUT_US_PAGE_QUERYResult> => {
    return await sanityFetch({
      query: ABOUT_US_PAGE_QUERY,
      tags: ['about-us-page-data'],
    });
  };

export const getCareerPageData = async (): Promise<CAREER_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: CAREER_PAGE_QUERY,
    tags: ['career-page-data'],
  });
};

export const getBlinkdraftPageData = async (
  locale: string
): Promise<BLINKDRAFT_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: BLINKDRAFT_PAGE_QUERY,
    params: { locale },
    tags: ['blinkdraft', `blinkdraft-${locale}`],
  });
};

export const getPrivacyNotice =
  async (): Promise<PRIVACY_NOTICE_QUERYResult> => {
    return await sanityFetch({
      query: PRIVACY_NOTICE_QUERY,
      tags: ['privacy-notice'],
    });
  };

export const getCookiePolicy = async (): Promise<COOKIE_POLICY_QUERYResult> => {
  return await sanityFetch({
    query: COOKIE_POLICY_QUERY,
    tags: ['cookie-policy'],
  });
};

// --- Slug-based Page Data ---

export const getLawyerPageData = async (
  slug: string
): Promise<LAWYER_QUERYResult> => {
  return await sanityFetch({
    query: LAWYER_QUERY,
    params: { slug },
    tags: [`lawyer-${slug}`],
  });
};

export const getAuthorPageData = async (
  slug: string
): Promise<UNIVERSAL_AUTHOR_PAGE_QUERYResult> => {
  return await sanityFetch({
    query: UNIVERSAL_AUTHOR_PAGE_QUERY,
    params: { slug },
    tags: [`author-${slug}`],
  });
};

export const getServicePageData = async (
  type: 'practice' | 'industry',
  slug: string
): Promise<SERVICE_QUERYResult> => {
  return await sanityFetch({
    query: SERVICE_QUERY,
    params: { type, slug },
    tags: [`${type}-${slug}`],
  });
};

export const getForeignDeskPageData = async (
  slug: string
): Promise<FOREIGN_DESK_QUERYResult> => {
  return await sanityFetch({
    query: FOREIGN_DESK_QUERY,
    params: { slug },
    tags: [`foreignDesk-${slug}`],
  });
};

// --- List/Collection Data ---

export const getPostsByCategory = async (
  slug: string,
  limit: number = 9
): Promise<POSTS_BY_CATEGORY_QUERYResult> => {
  return await sanityFetch({
    query: POSTS_BY_CATEGORY_QUERY,
    params: { slug, limit },
    tags: ['posts', `posts-by-category-${slug}`],
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
    tags: ['posts', `posts-by-category-${categorySlug}`, `posts-by-year-${year}`],
  });
};

export const getPostsByYearCount = async (
  categorySlug: string,
  year: string
): Promise<POSTS_BY_YEAR_COUNT_QUERYResult> => {
  return await sanityFetch({
    query: POSTS_BY_YEAR_COUNT_QUERY,
    params: { categorySlug, year },
    tags: ['posts', `posts-by-category-${categorySlug}`, `posts-by-year-${year}`],
  });
};

// --- Cached Global/Shared Data (wrapped in React.cache) ---

export const getGeneralInfoData = cache(
  async (): Promise<GENERAL_INFO_QUERYResult> => {
    return await sanityFetch({
      query: GENERAL_INFO_QUERY,
      tags: ['general-info'],
    });
  }
);

export const getLawyers = cache(async (): Promise<LAWYERS_QUERYResult> => {
  return await sanityFetch({
    query: LAWYERS_QUERY,
    tags: ['lawyers'],
  });
});

export const getLawyersByCategory = cache(
  async (): Promise<LAWYERS_BY_CATEGORY_QUERYResult> => {
    return await sanityFetch({
      query: LAWYERS_BY_CATEGORY_QUERY,
      tags: ['lawyers', 'lawyer-categories'],
    });
  }
);

export const getPostsPreviewByCategory = cache(
  async (
    slug: string,
    limit: number = 9
  ): Promise<POSTS_PREVIEW_BY_CATEGORY_QUERYResult> => {
    return await sanityFetch({
      query: POSTS_PREVIEW_BY_CATEGORY_QUERY,
      params: { slug, limit },
      tags: ['posts', `posts-by-category-${slug}`],
    });
  }
);

export const getYearsByCategory = cache(
  async (slug: string): Promise<YEARS_BY_CATEGORY_QUERYResult> => {
    return await sanityFetch({
      query: YEARS_BY_CATEGORY_QUERY,
      params: { slug },
      tags: ['posts', `posts-by-category-${slug}`],
    });
  }
);

export const getNestedCategories = cache(
  async (categorySlug: string): Promise<NESTED_CATEGORIES_QUERYResult> => {
    return await sanityFetch({
      query: NESTED_CATEGORIES_QUERY,
      params: { categorySlug },
      tags: ['categories', `nested-categories-${categorySlug}`],
    });
  }
);

export const getServicesData = cache(
  async (): Promise<SERVICES_QUERYResult> => {
    return await sanityFetch({
      query: SERVICES_QUERY,
      tags: ['services', 'practices', 'industries', 'foreign-desks'],
    });
  }
);

export const getGlobalFeaturedPosts = cache(
  async (slug: string): Promise<GLOBAL_FEATURED_POSTS_QUERYResult> => {
    return await sanityFetch({
      query: GLOBAL_FEATURED_POSTS_QUERY,
      params: { slug },
      tags: ['posts', 'global-featured-posts'],
    });
  }
);

export const getAuthors = cache(async (): Promise<AUTHORS_QUERYResult> => {
  return await sanityFetch({
    query: AUTHORS_QUERY,
    tags: ['authors'],
  });
});

// This query was missing from the original file but is good practice to include
export const getBlinkdraftSubscriptionFormData = async (
  locale: string
): Promise<BLINKDRAFT_SUBSCRIPTION_FORM_QUERYResult> => {
  return await sanityFetch({
    query: BLINKDRAFT_SUBSCRIPTION_FORM_QUERY,
    params: { locale },
    tags: ['blinkdraft', `subscriptionForm-${locale}`],
  });
};
