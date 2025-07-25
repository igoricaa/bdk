import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'production',
  token:
    'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
  useCdn: false,
  apiVersion: '2025-04-13',
});

async function removeAllPosts() {
  try {
    // Step 1: Query for all post documents
    const query = `*[_type == "post"]._id`;
    const postIdsToDelete = await client.fetch(query);

    console.log(`Found ${postIdsToDelete.length} posts`);

    // Step 2: Delete each document
    if (postIdsToDelete.length > 0) {
      const transaction = client.transaction();

      postIdsToDelete.forEach((id) => {
        transaction.delete(id);
        console.log(`Scheduled deletion for post with ID: ${id}`);
      });

      // Commit all deletions as a batch
      const result = await transaction.commit();
      console.log(`Successfully deleted ${result.results.length} posts`);
      return result;
    } else {
      console.log('No posts found');
      return null;
    }
  } catch (error) {
    console.error('Error removing posts:', error);
    throw error;
  }
}

// Execute the function
removeAllPosts()
  .then((result) => {
    if (result) {
      console.log('Operation completed successfully');
    }
  })
  .catch((err) => {
    console.error('Operation failed:', err);
  });
