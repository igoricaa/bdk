// migrateAuthors.js

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'production',
  token:
    'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
  useCdn: false,
  apiVersion: '2025-04-13',
});

// This query fetches all authors and the names from their old locations
const fetchAuthorsQuery = `*[_type == "author"] {
  _id,
  "oldName": coalesce(lawyer->name, customAuthor.name)
}`;

async function migrate() {
  console.log('Fetching authors to migrate...');
  const authors = await client.fetch(fetchAuthorsQuery);

  const authorsToMigrate = authors.filter((author) => author.oldName);

  if (authorsToMigrate.length === 0) {
    console.log('No authors needed migration. All done!');
    return;
  }

  console.log(`Found ${authorsToMigrate.length} authors to migrate...`);

  // Create a transaction to update all documents at once
  const transaction = client.transaction();

  authorsToMigrate.forEach((author) => {
    console.log(`- Patching ${author._id} with name "${author.oldName}"`);
    // Patch each document to set the new 'name' field
    transaction.patch(author._id, { set: { name: author.oldName } });
  });

  // Commit the transaction
  await transaction.commit();
  console.log('Migration complete!');
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
});
