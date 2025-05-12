import { createClient } from 'next-sanity';

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
