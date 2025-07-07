import { createClient, QueryParams } from 'next-sanity';

import { apiVersion, dataset, projectId, token } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

export const updateClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: token,
});

export async function sanityFetch<const QueryString extends string>({
  query,
  params = {},
  revalidate = 43200,
  tags = [],
}: {
  query: QueryString;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  return client.fetch(query, params, {
    cache: 'force-cache',
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
