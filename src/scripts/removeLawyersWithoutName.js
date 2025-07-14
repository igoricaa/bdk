import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'production',
  token:
    'skijxDU9E6LZWYygPDndA38HN05p67IWY6ar4e1QgjRMZAS26JC5liB1QxixNEsnJzoFTMBD9IoEzjFRn6ei7a0jyTdT0AJEu8u59ejHhnG2ue3RkhNNTZoyPs6YUzw2Ylmg4K5IaAgEeNDjxh8FLeqY4SLcZPTlqLbZ6wfF0eGxNOTHcQbL',
  useCdn: false,
  apiVersion: '2025-04-13',
});

async function removeLawyersWithoutName() {
  try {
    // Step 1: Query for all lawyer documents without a name
    const query = `*[_type == "lawyer" && (title == null || title == "")]._id`;
    const lawyerIdsToDelete = await client.fetch(query);

    console.log(`Found ${lawyerIdsToDelete.length} lawyers without names`);

    // Step 2: Delete each document
    if (lawyerIdsToDelete.length > 0) {
      const transaction = client.transaction();

      lawyerIdsToDelete.forEach((id) => {
        transaction.delete(id);
        console.log(`Scheduled deletion for lawyer with ID: ${id}`);
      });

      // Commit all deletions as a batch
      const result = await transaction.commit();
      console.log(
        `Successfully deleted ${result.results.length} lawyers without names`
      );
      return result;
    } else {
      console.log('No lawyers without names found');
      return null;
    }
  } catch (error) {
    console.error('Error removing lawyers without names:', error);
    throw error;
  }
}

// Execute the function
removeLawyersWithoutName()
  .then((result) => {
    if (result) {
      console.log('Operation completed successfully');
    }
  })
  .catch((err) => {
    console.error('Operation failed:', err);
  });
