import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'ozaurj4x',
  dataset: process.env.SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN || 'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
  useCdn: false,
  apiVersion: '2025-04-13',
});

const BATCH_SIZE = 100;

async function runSinglePass() {
  const serviceTypes = ['practice', 'industry', 'foreignDesk', 'service'];
  const migratedTypes = ['post', 'author', 'category'];
  const allKnownTypes = [...serviceTypes, ...migratedTypes];

  console.log('--- Pass starting: Deleting all drafts ---');
  for (const docType of allKnownTypes) {
    const draftIds = await client.fetch(`*[_type == "${docType}" && _id match "drafts.*"][0...${BATCH_SIZE}]._id`);
    if (draftIds.length > 0) {
      console.log(`Deleting ${draftIds.length} drafts of type '${docType}'...`);
      await client.delete({ query: `*[_id in $ids]`, params: { ids: draftIds } });
    }
  }

  console.log('--- Pass continuing: Clearing service references ---');
  for (const docType of serviceTypes) {
    const serviceIds = await client.fetch(`*[_type == "${docType}" && (defined(newsroom) || defined(publications) || defined(latestBlogPosts) || defined(bdkInsights))]._id`);
    if (serviceIds.length > 0) {
      console.log(`Clearing references from ${serviceIds.length} '${docType}' documents...`);
      const transaction = client.transaction();
      serviceIds.forEach(id => transaction.patch(id, { unset: ['newsroom', 'publications', 'latestBlogPosts', 'bdkInsights'] }));
      await transaction.commit({ autoGenerateArrayKeys: true });
    }
  }

  console.log('--- Pass continuing: Deleting published documents ---');
  // NOTE: The order here is important. Posts reference authors/categories.
  for (const docType of ['post', 'author', 'category']) {
    const docIds = await client.fetch(`*[_type == "${docType}" && !(_id match "drafts.*")]._id`);
    if (docIds.length > 0) {
      console.log(`Deleting ${docIds.length} published '${docType}' documents...`);
      await client.delete({ query: `*[_id in $ids]`, params: { ids: docIds } });
    }
  }
}

async function runCleanupWithRetries() {
  console.log('⚠️ **Warning: This script will permanently DELETE documents and CANNOT be undone.**\n');
  const maxRetries = 10;

  for (let i = 1; i <= maxRetries; i++) {
    try {
      console.log(`\n--- Running Cleanup Pass #${i} ---`);
      await runSinglePass();
      console.log('\n✅✅✅ Success! No more references found. Cleanup is complete.');
      return;
    } catch (error) {
      if (error.statusCode === 409 && error.details?.description) {
        console.log(`--- Pass #${i} failed with a reference error. Hunting the blocker... ---`);
        const description = error.details.description;
        
        // Improved Regex to find ANY id, draft or published
        const idMatch = description.match(/"((?:drafts\.)?[a-zA-Z0-9-]+)"/);
        
        if (idMatch && idMatch[1]) {
          const blockingId = idMatch[1];
          // We only auto-delete drafts. If it's a published doc, we pause and retry.
          if (blockingId.startsWith('drafts.')) {
            console.log(`Found blocking draft: ${blockingId}. Force-deleting it now.`);
            await client.delete(blockingId);
            console.log(`✅ Blocker ${blockingId} deleted. Retrying cleanup...`);
          } else {
            console.log(`Found blocking published document: ${blockingId}. This is likely a timing issue.`);
            console.log('Pausing for 3 seconds to allow database to sync, then retrying...');
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        } else {
           console.error("❌ A reference error occurred, but could not identify the blocking document. Aborting.", error);
           return;
        }
      } else {
        console.error("❌ An unexpected error occurred. Aborting.", error);
        return;
      }
    }
  }
  console.error(`❌ Cleanup failed after ${maxRetries} attempts.`);
}

runCleanupWithRetries();