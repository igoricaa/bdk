import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'dev',
  token:
    'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
  useCdn: false,
  apiVersion: '2025-04-13',
});

// Query to fetch all lawyers that don't have isVisible set or have it set to null/undefined
const fetchLawyersQuery = `*[_type == "lawyer" && !defined(isVisible)] {
  _id,
  name,
  title
}`;

async function setLawyersVisible() {
  try {
    console.log('Fetching lawyers without isVisible field...');
    const lawyers = await client.fetch(fetchLawyersQuery);

    if (lawyers.length === 0) {
      console.log('No lawyers found without isVisible field. All done!');
      return;
    }

    console.log(`Found ${lawyers.length} lawyers to update:`);
    lawyers.forEach((lawyer) => {
      console.log(`- ${lawyer.name} (${lawyer.title})`);
    });

    // Create a transaction to update all documents at once
    const transaction = client.transaction();

    lawyers.forEach((lawyer) => {
      console.log(`Patching ${lawyer._id} to set isVisible: true`);
      // Patch each document to set isVisible to true
      transaction.patch(lawyer._id, { set: { isVisible: true } });
    });

    // Commit the transaction
    console.log('Committing changes...');
    const result = await transaction.commit();
    console.log(`Migration complete! Updated ${result.results.length} lawyers.`);
    
    return result;
  } catch (error) {
    console.error('Migration failed:', error.message);
    throw error;
  }
}

// Execute the function
setLawyersVisible()
  .then((result) => {
    if (result) {
      console.log('Operation completed successfully');
    }
  })
  .catch((err) => {
    console.error('Operation failed:', err);
  });