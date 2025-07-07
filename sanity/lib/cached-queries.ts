import { cache } from 'react';
import { sanityFetch } from './client';
import { GENERAL_INFO_QUERY } from './queries';
import type { GENERAL_INFO_QUERYResult } from '@/sanity.types';

// Cache the general info query so it's only fetched once per request
export const getGeneralInfo = cache(
  async (): Promise<GENERAL_INFO_QUERYResult> => {
    return await sanityFetch({
      query: GENERAL_INFO_QUERY,
      tags: ['general-info', 'navigation', 'footer'],
      revalidate: 43200,
    });
  }
);

// You can add other cached queries here
// export const getPost = cache(async (slug: string) => {
//   return await client.fetch(POST_QUERY, { slug })
// })
