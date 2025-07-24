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
    let totalProcessed = 0;
    let totalErrors = 0;

    while (hasMore) {
      try {
        console.log(`Fetching ${wpType} page ${page}...`);

        let wpData = await wpDataTypeFetch(wpType, page);

        if (wpData && Array.isArray(wpData) && wpData.length) {
          console.log(
            `Processing ${wpData.length} ${wpType} from page ${page}`
          );

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
                  console.log(
                    `✓ Processed post: ${doc.title} (ID: ${wpDoc.id})`
                  );
                  return doc;
                } else if (wpType === 'categories') {
                  wpDoc = wpDoc as WP_REST_API_Term;
                  const doc = await transformToCategory(wpDoc);
                  console.log(
                    `✓ Processed category: ${doc.title} (ID: ${wpDoc.id})`
                  );
                  return doc;
                } else if (wpType === 'users') {
                  wpDoc = wpDoc as WP_REST_API_User;
                  const doc = await transformToAuthor(wpDoc, client);
                  console.log(
                    `✓ Processed user: ${doc.name} (ID: ${wpDoc.id})`
                  );
                  return doc;
                }

                throw new Error(`Unhandled WordPress type: ${wpType}`);
              } catch (error) {
                console.error(
                  `✗ Error processing ${wpType} document (ID: ${wpDoc.id}):`,
                  error
                );
                console.error('Document data:', JSON.stringify(wpDoc, null, 2));

                // Return null instead of throwing to continue processing other documents
                return null;
              }
            })
          );

          // Resolve all documents concurrently, throttled by p-limit
          const resolvedDocs = await Promise.all(docs);

          // Filter out any null/undefined documents
          const validDocs = resolvedDocs.filter((doc) => doc != null);
          const errorCount = resolvedDocs.length - validDocs.length;

          totalProcessed += validDocs.length;
          totalErrors += errorCount;

          if (errorCount > 0) {
            console.warn(
              `⚠️  ${errorCount} documents failed to process on page ${page}`
            );
          }

          if (validDocs.length > 0) {
            yield validDocs.map((doc) => createOrReplace(doc));
            console.log(
              `✓ Successfully migrated ${validDocs.length} ${wpType} from page ${page}`
            );
          }

          page++;
        } else {
          console.log(`No more ${wpType} found. Stopping at page ${page}`);
          hasMore = false;
        }
      } catch (error) {
        console.error(`Error fetching data for page ${page}:`, error);
        hasMore = false;
      }
    }

    console.log(
      `Finished migrating ${wpType}. Total processed: ${totalProcessed}, Errors: ${totalErrors}`
    );
  },
});
