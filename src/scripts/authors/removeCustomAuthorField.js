import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'production',
  token:
    'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
  useCdn: false,
  apiVersion: '2025-04-13',
});

// This query finds the _id of every author that still has the 'customAuthor' field.
const fetchAuthorsQuery = `*[_type == "author" && defined(customAuthor)]._id`;

async function cleanup() {
  console.log("Fetching authors with the old 'customAuthor' field...");
  const authorIds = await client.fetch(fetchAuthorsQuery);

  if (!authorIds || authorIds.length === 0) {
    console.log('No documents with the old field were found. All clean!');
    return;
  }

  console.log(`Found ${authorIds.length} documents to clean up...`);

  const transaction = client.transaction();

  authorIds.forEach((id) => {
    console.log(`- Removing 'customAuthor' from document: ${id}`);
    // The 'unset' command takes an array of field names to remove.
    transaction.patch(id, { unset: ['customAuthor'] });
  });

  await transaction.commit();
  console.log('Cleanup complete! ✅');
}

cleanup().catch((err) => {
  console.error('Cleanup failed:', err.message);
});
