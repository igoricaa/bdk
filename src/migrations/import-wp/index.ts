import { createClient } from '@sanity/client';
import pLimit from 'p-limit';
import { createOrReplace, defineMigration } from 'sanity/migrate';
import type {
  WP_REST_API_Post,
  WP_REST_API_Term,
  WP_REST_API_User,
} from 'wp-types';

import { getDataTypes } from './lib/getDataTypes';
import { sanityFetchImages } from './lib/sanityFetchImages';
import { transformToPost } from './lib/transformToPost';
import { wpDataTypeFetch } from './lib/wpDataTypeFetch';
import { transformToAuthor } from './lib/transformToAuthor';
import { transformToCategory } from './lib/transformToCategory';

const limit = pLimit(5);

// Add image imports, parallelized and limited
export default defineMigration({
  title: 'Import WP JSON data',

  async *migrate(docs, context) {
    // Create a full client to handle image uploads
    const client = createClient(context.client.config());

    // Create an in-memory image cache to avoid re-uploading images
    const existingImages = await sanityFetchImages(client);

    const { wpType } = getDataTypes(process.argv);
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      try {
        let wpData = await wpDataTypeFetch(wpType, page);

        if (wpData && Array.isArray(wpData) && wpData.length) {
          const docs = wpData.map((wpDoc) =>
            limit(async () => {
              try {
                if (wpType === 'posts') {
                  wpDoc = wpDoc as WP_REST_API_Post;
                  const doc = await transformToPost(
                    wpDoc,
                    client,
                    existingImages
                  );
                  return doc;
                } else if (wpType === 'categories') {
                  wpDoc = wpDoc as WP_REST_API_Term;
                  const doc = await transformToCategory(wpDoc);
                  return doc;
                } else if (wpType === 'users') {
                  wpDoc = wpDoc as WP_REST_API_User;
                  const doc = await transformToAuthor(wpDoc);
                  return doc;
                }

                hasMore = false;
                throw new Error(`Unhandled WordPress type: ${wpType}`);
              } catch (error) {
                console.error(`Error processing document:`, error);
                console.error('Document data:', JSON.stringify(wpDoc, null, 2));
                throw error;
              }
            })
          );

          // Resolve all documents concurrently, throttled by p-limit
          const resolvedDocs = await Promise.all(docs);

          yield resolvedDocs.map((doc) => createOrReplace(doc));
          page++;
        } else {
          hasMore = false;
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error);
        hasMore = false;
      }
    }
  },
});
