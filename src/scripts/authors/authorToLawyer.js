import { createClient } from '@sanity/client';
import readline from 'readline';

// Configure your Sanity client
const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'dev',
  token:
    'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
  useCdn: false,
  apiVersion: '2025-04-13',
});

// Cyrillic character normalization function
function normalizeCyrillic(text) {
  if (!text) return '';

  const cyrillicMap = {
    ć: 'c',
    Ć: 'C',
    č: 'c',
    Č: 'C',
    š: 's',
    Š: 'S',
    ž: 'z',
    Ž: 'Z',
    đ: 'dj',
    Đ: 'Dj',
    ä: 'a',
    Ä: 'A',
    ö: 'o',
    Ö: 'O',
    ü: 'u',
    Ü: 'U',
    ß: 's',
  };

  return text.replace(
    /[ćĆčČšŠžŽđĐäÄöÖüÜß]/g,
    (match) => cyrillicMap[match] || match
  );
}

// Create slug from text (similar to Sanity's slug generation)
function createSlug(text) {
  if (!text) return '';

  return normalizeCyrillic(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
    .replace(/-+/g, '-'); // Replace multiple hyphens with single
}

// Check if two strings match (with normalization)
function isMatch(str1, str2) {
  if (!str1 || !str2) return false;

  const normalized1 = normalizeCyrillic(str1.toLowerCase().trim());
  const normalized2 = normalizeCyrillic(str2.toLowerCase().trim());

  return normalized1 === normalized2;
}

// Find matching lawyer for a custom author
function findMatchingLawyer(author, lawyers) {
  const authorName = author.name;
  const authorSlug = author.slug?.current;

  if (!authorName) return null;

  // Generate different variations to check
  const authorNameNormalized = normalizeCyrillic(authorName);
  const authorSlugFromName = createSlug(authorName);

  console.log(`\n--- Checking author: "${authorName}" ---`);
  console.log(`Author slug: "${authorSlug}"`);
  console.log(`Author name normalized: "${authorNameNormalized}"`);
  console.log(`Author slug from name: "${authorSlugFromName}"`);

  for (const lawyer of lawyers) {
    const lawyerName = lawyer.name;
    const lawyerSlug = lawyer.slug?.current;

    if (!lawyerName) continue;

    const lawyerNameNormalized = normalizeCyrillic(lawyerName);
    const lawyerSlugFromName = createSlug(lawyerName);

    console.log(`  Checking lawyer: "${lawyerName}" (slug: "${lawyerSlug}")`);

    // Check various matching scenarios
    const nameMatch = isMatch(authorName, lawyerName);
    const slugMatch =
      authorSlug && lawyerSlug && isMatch(authorSlug, lawyerSlug);
    const nameToSlugMatch =
      authorSlug && isMatch(authorSlug, lawyerSlugFromName);
    const slugToNameMatch =
      lawyerSlug && isMatch(authorSlugFromName, lawyerSlug);
    const normalizedNameMatch = isMatch(
      authorNameNormalized,
      lawyerNameNormalized
    );

    if (
      nameMatch ||
      slugMatch ||
      nameToSlugMatch ||
      slugToNameMatch ||
      normalizedNameMatch
    ) {
      console.log(`  ✓ MATCH FOUND!`);
      console.log(`    Name match: ${nameMatch}`);
      console.log(`    Slug match: ${slugMatch}`);
      console.log(`    Name to slug match: ${nameToSlugMatch}`);
      console.log(`    Slug to name match: ${slugToNameMatch}`);
      console.log(`    Normalized name match: ${normalizedNameMatch}`);

      return lawyer;
    }
  }

  console.log(`  No match found for "${authorName}"`);
  return null;
}

// Main function to process authors
async function processAuthors() {
  try {
    console.log('Starting author-lawyer matching process...\n');

    // First, let's debug what authors we have
    console.log('=== DEBUGGING AUTHORS ===');
    const allAuthors = await client.fetch(`
      *[_type == "author"] {
        _id,
        name,
        slug,
        type,
        url
      }
    `);

    console.log(`Total authors found: ${allAuthors.length}`);

    // Show breakdown by type
    const typeBreakdown = allAuthors.reduce((acc, author) => {
      const type = author.type || 'undefined';
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    console.log('Author types breakdown:', typeBreakdown);

    // Show some examples
    console.log('\nFirst 10 authors:');
    allAuthors.slice(0, 10).forEach((author, i) => {
      console.log(
        `${i + 1}. "${author.name}" - type: "${author.type}" - slug: "${author.slug?.current || 'N/A'}"`
      );
    });

    // Now fetch custom authors specifically
    const customAuthors = await client.fetch(`
      *[_type == "author" && type == "custom"] {
        _id,
        name,
        slug,
        type,
        url
      }
    `);

    console.log(`\nCustom authors found: ${customAuthors.length}`);

    if (customAuthors.length === 0) {
      console.log('\nTrying alternative query for custom authors...');

      // Try different possible values
      const altQueries = [
        `*[_type == "author" && type == "Custom"]`,
        `*[_type == "author" && type == "custom_author"]`,
        `*[_type == "author" && type == "customAuthor"]`,
        `*[_type == "author" && !defined(lawyer)]`,
        `*[_type == "author" && defined(url)]`,
      ];

      for (const query of altQueries) {
        const result = await client.fetch(query);
        console.log(`Query: ${query} - Results: ${result.length}`);
      }
    }

    // Fetch all lawyers
    const lawyers = await client.fetch(`
      *[_type == "lawyer"] {
        _id,
        name,
        slug,
        title
      }
    `);

    console.log(`Found ${lawyers.length} lawyers`);

    if (customAuthors.length === 0) {
      console.log(
        'No custom authors found after debugging. Please check the output above to see what author types you actually have.'
      );
      return;
    }

    if (lawyers.length === 0) {
      console.log('No lawyers found. Exiting...');
      return;
    }

    const matches = [];
    const noMatches = [];

    // Process each custom author
    for (const author of customAuthors) {
      const matchingLawyer = findMatchingLawyer(author, lawyers);

      if (matchingLawyer) {
        matches.push({
          author,
          lawyer: matchingLawyer,
        });
      } else {
        noMatches.push(author);
      }
    }

    console.log(`\n=== SUMMARY ===`);
    console.log(`Matches found: ${matches.length}`);
    console.log(`No matches: ${noMatches.length}`);

    if (matches.length > 0) {
      console.log(`\n=== MATCHES TO UPDATE ===`);
      matches.forEach(({ author, lawyer }, index) => {
        console.log(
          `${index + 1}. Author: "${author.name}" → Lawyer: "${lawyer.name}"`
        );
      });

      // Ask for confirmation before updating
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const answer = await new Promise((resolve) => {
        rl.question('\nProceed with updating these authors? (y/n): ', resolve);
      });

      rl.close();

      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        console.log('\nUpdating authors...');

        // Update each matching author
        for (const { author, lawyer } of matches) {
          try {
            await client
              .patch(author._id)
              .set({
                type: 'lawyer',
                lawyer: {
                  _type: 'reference',
                  _ref: lawyer._id,
                },
              })
              .unset(['url']) // Remove URL field since it's for custom authors only
              .commit();

            console.log(`✓ Updated author "${author.name}" to lawyer type`);
          } catch (error) {
            console.error(
              `✗ Failed to update author "${author.name}":`,
              error.message
            );
          }
        }

        console.log('\nUpdate process completed!');
      } else {
        console.log('Update cancelled.');
      }
    }

    if (noMatches.length > 0) {
      console.log(`\n=== AUTHORS WITH NO MATCHES ===`);
      noMatches.forEach((author, index) => {
        console.log(
          `${index + 1}. "${author.name}" (slug: "${author.slug?.current || 'N/A'}")`
        );
      });
    }
  } catch (error) {
    console.error('Error during processing:', error);
  }
}

// Run the script
processAuthors();
