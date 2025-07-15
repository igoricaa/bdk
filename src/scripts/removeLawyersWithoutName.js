import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'production',
  token:
    'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
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
