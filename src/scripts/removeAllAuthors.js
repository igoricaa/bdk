import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'production',
  token:
    'skijxDU9E6LZWYygPDndA38HN05p67IWY6ar4e1QgjRMZAS26JC5liB1QxixNEsnJzoFTMBD9IoEzjFRn6ei7a0jyTdT0AJEu8u59ejHhnG2ue3RkhNNTZoyPs6YUzw2Ylmg4K5IaAgEeNDjxh8FLeqY4SLcZPTlqLbZ6wfF0eGxNOTHcQbL',
  useCdn: false,
  apiVersion: '2025-04-13',
});

async function removeAllAuthors() {
  try {
    // Step 1: Query for all author documents
    const query = `*[_type == "author"]._id`;
    const authorIdsToDelete = await client.fetch(query);

    console.log(`Found ${authorIdsToDelete.length} authors`);

    // Step 2: Delete each document
    if (authorIdsToDelete.length > 0) {
      const transaction = client.transaction();

      authorIdsToDelete.forEach((id) => {
        transaction.delete(id);
        console.log(`Scheduled deletion for author with ID: ${id}`);
      });

      // Commit all deletions as a batch
      const result = await transaction.commit();
      console.log(`Successfully deleted ${result.results.length} authors`);
      return result;
    } else {
      console.log('No authors found');
      return null;
    }
  } catch (error) {
    console.error('Error removing authors:', error);
    throw error;
  }
}

// Execute the function
removeAllAuthors()
  .then((result) => {
    if (result) {
      console.log('Operation completed successfully');
    }
  })
  .catch((err) => {
    console.error('Operation failed:', err);
  });
