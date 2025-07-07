import { cache } from 'react';
import { sanityFetch } from './client';
import {
  GENERAL_INFO_QUERY,
  HOME_PAGE_QUERY,
  PEOPLE_PAGE_QUERY,
  PRACTICE_QUERY,
  POST_QUERY,
  POSTS_QUERY,
  BDKNOWLEDGE_POSTS_QUERY,
  LAWYERS_QUERY,
  PRACTICES_QUERY,
  AUTHORS_QUERY,
  LAWYER_QUERY,
  PARTNERS_LAWYERS_QUERY,
} from './queries';
import type {
  GENERAL_INFO_QUERYResult,
  HOME_PAGE_QUERYResult,
  PEOPLE_PAGE_QUERYResult,
  PRACTICE_QUERYResult,
  POST_QUERYResult,
  POSTS_QUERYResult,
  BDKNOWLEDGE_POSTS_QUERYResult,
  LAWYERS_QUERYResult,
  PRACTICES_QUERYResult,
  AUTHORS_QUERYResult,
  LAWYER_QUERYResult,
  PARTNERS_LAWYERS_QUERYResult,
} from '@/sanity.types';

// ===============================================
// CORE DATA TYPES - Small, highly reusable queries
// ===============================================

// General site information and settings (used on all pages)
export const getGeneralInfo = cache(
  async (): Promise<GENERAL_INFO_QUERYResult> => {
    return await sanityFetch({
      query: GENERAL_INFO_QUERY,
      tags: ['general-info', 'blinkdraft'],
      revalidate: 43200, // 12 hours - site settings change infrequently
    });
  }
);

// All lawyers (used on people page, home page, practice pages)
export const getLawyers = cache(async (): Promise<LAWYERS_QUERYResult> => {
  return await sanityFetch({
    query: LAWYERS_QUERY,
    tags: ['lawyers'],
    revalidate: 43200, // 12 hours - lawyer info changes infrequently
  });
});

// Partner lawyers only (used on home page team section)
export const getPartnerLawyers = cache(
  async (): Promise<PARTNERS_LAWYERS_QUERYResult> => {
    return await sanityFetch({
      query: PARTNERS_LAWYERS_QUERY,
      tags: ['lawyers', 'partners'],
      revalidate: 43200, // 12 hours
    });
  }
);

// All practices (used on multiple pages)
export const getPractices = cache(async (): Promise<PRACTICES_QUERYResult> => {
  return await sanityFetch({
    query: PRACTICES_QUERY,
    tags: ['practices'],
    revalidate: 43200, // 12 hours - practice areas change infrequently
  });
});

// Industries list (used on home page and practice pages)
export const getIndustries = cache(async () => {
  return await sanityFetch({
    query: `*[_type == "industry"]{
        _id,
        title,
        slug
      }`,
    tags: ['industries'],
    revalidate: 86400, // 24 hours - industries change very rarely
  });
});

// Foreign desks (used on practice pages)
export const getForeignDesks = cache(async () => {
  return await sanityFetch({
    query: `*[_type == "foreignDesk"]{
        _id,
        title,
        slug
      }`,
    tags: ['foreign-desks'],
    revalidate: 86400, // 24 hours - rarely change
  });
});

// Post categories (used on bdknowledge pages)
export const getCategories = cache(async () => {
  return await sanityFetch({
    query: `*[_type == "category"]{
        _id,
        name,
        slug,
        count,
        parent
      }`,
    tags: ['categories'],
    revalidate: 43200, // 12 hours
  });
});

// Authors (used for post authoring)
export const getAuthors = cache(async (): Promise<AUTHORS_QUERYResult> => {
  return await sanityFetch({
    query: AUTHORS_QUERY,
    tags: ['authors'],
    revalidate: 86400, // 24 hours - authors change rarely
  });
});

// Newsroom posts (used on multiple pages)
export const getNewsroomPosts = cache(async (limit: number = 4) => {
  return await sanityFetch({
    query: `*[_type == "post" && references(*[_type=="category" && name=="Newsroom"]._id)] | order(date desc)[0...${limit}]{
        _id,
        title,
        slug,
        date
      }`,
    tags: ['posts', 'newsroom'],
    revalidate: 43200, // 12 hours
  });
});

// ===============================================
// PAGE-SPECIFIC CONFIGURATIONS
// ===============================================

// Home page configuration document
export const getHomePageConfig = cache(async () => {
  return await sanityFetch({
    query: `*[_type == "homePage"][0]`,
    tags: ['home-page-config'],
    revalidate: 86400, // 24 hours - page configs change rarely
  });
});

// People page configuration document
export const getPeoplePageConfig = cache(async () => {
  return await sanityFetch({
    query: `*[_type == "peoplePage"][0]`,
    tags: ['people-page-config'],
    revalidate: 86400, // 24 hours - page configs change rarely
  });
});

// Blinkdraft configuration (used across site)
export const getBlinkdraftConfig = cache(async () => {
  return await sanityFetch({
    query: `*[_type == "blinkdraft"][0]{
        logo
      }`,
    tags: ['blinkdraft'],
    revalidate: 86400, // 24 hours - branding changes rarely
  });
});

// ===============================================
// COMBINED PAGE QUERIES - Complex, page-specific data
// ===============================================

// Full home page data (combines multiple data types)
export const getHomePageData = cache(
  async (): Promise<HOME_PAGE_QUERYResult> => {
    return await sanityFetch({
      query: HOME_PAGE_QUERY,
      tags: [
        'home-page-data',
        'home-page-config',
        'blinkdraft',
        'industries',
        'practices',
        'partners',
        'newsroom',
      ],
      revalidate: 43200, // 12 hours
    });
  }
);

// Full people page data
export const getPeoplePageData = cache(
  async (): Promise<PEOPLE_PAGE_QUERYResult> => {
    return await sanityFetch({
      query: PEOPLE_PAGE_QUERY,
      tags: ['people-page-data', 'people-page-config', 'lawyers', 'newsroom'],
      revalidate: 43200, // 12 hours
    });
  }
);

// Individual lawyer profile
export const getLawyerProfile = cache(
  async (slug: string): Promise<LAWYER_QUERYResult> => {
    return await sanityFetch({
      query: LAWYER_QUERY,
      params: { slug },
      tags: [
        'lawyers',
        `lawyer-${slug}`,
        'posts',
        'newsroom',
        'blog',
        'insights',
        'publications',
      ],
      revalidate: 43200,
    });
  }
);

// Practice page with all related data
export const getPracticePageData = cache(
  async (slug: string): Promise<PRACTICE_QUERYResult> => {
    return await sanityFetch({
      query: PRACTICE_QUERY,
      params: { slug },
      tags: [
        'practices',
        `practice-${slug}`,
        'lawyers',
        'newsroom',
        'posts',
        'industries',
        'foreign-desks',
      ],
      revalidate: 43200, // 12 hours
    });
  }
);

// Individual post with related content
export const getPostWithRelated = cache(
  async (slug: string): Promise<POST_QUERYResult> => {
    return await sanityFetch({
      query: POST_QUERY,
      params: { slug },
      tags: ['posts', `post-${slug}`, 'categories', 'authors'],
      revalidate: 43200, // 12 hours
    });
  }
);

// BDKnowledge category page
export const getBDKnowledgePosts = cache(
  async (slug: string): Promise<BDKNOWLEDGE_POSTS_QUERYResult> => {
    return await sanityFetch({
      query: BDKNOWLEDGE_POSTS_QUERY,
      params: { slug },
      tags: ['posts', 'categories', `category-${slug}`],
      revalidate: 43200, // 12 hours
    });
  }
);

// Posts for specific category with pagination support
export const getCategoryPosts = cache(
  async (slug: string): Promise<POSTS_QUERYResult> => {
    return await sanityFetch({
      query: POSTS_QUERY,
      params: { slug },
      tags: ['posts', 'categories', `category-${slug}`],
      revalidate: 43200, // 12 hours
    });
  }
);
