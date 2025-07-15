import { createClient } from '@sanity/client';

function slugify(text) {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .replace(/ć/g, 'c')
    .replace(/č/g, 'c')
    .replace(/š/g, 's')
    .replace(/đ/g, 'dj')
    .replace(/ž/g, 'z')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const client = createClient({
  projectId: 'ozaurj4x',
  dataset: 'production',
  token:
    'sk5bMcu8JNBCy0FR7LgHwXmNjHIoCpzoFVpkH4G2EoeOI7kypEBPbkNbKqPRSsARUb2Unh0bYCHpWo0IUKcvJIL5XvewCJNx28TwheEyQ2P6DLvMEyeRGsPsJsGCX8Mmgf46OmaOw0Fn43erIHJNlGxcSdKlhHUYVlFarewZvdtiPJY2uezM',
  useCdn: false,
  apiVersion: '2025-04-13',
});

const fetchAuthorsQuery = `*[_type == "author"] {
  _id,
  name
}`;

async function migrate() {
  console.log('Fetching ALL authors to regenerate slugs...');
  const authors = await client.fetch(fetchAuthorsQuery);

  if (authors.length === 0) {
    console.log('No authors found.');
    return;
  }

  console.log(`Found ${authors.length} authors. Regenerating all slugs...`);

  const transaction = client.transaction();

  authors.forEach((author) => {
    const newSlug = slugify(author.name);
    console.log(
      `- Patching "${author.name}" (${author._id}) with new slug "${newSlug}"`
    );
    transaction.patch(author._id, {
      set: { slug: { _type: 'slug', current: newSlug } },
    });
  });

  await transaction.commit();
  console.log('Slug regeneration complete! ✅');
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message);
});
