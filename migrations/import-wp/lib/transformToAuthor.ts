import type { WP_REST_API_User } from 'wp-types';
import type { Author, Lawyer } from '../../../sanity.types';
import { SanityClient } from 'next-sanity';

type StagedAuthor = Omit<Author, '_createdAt' | '_updatedAt' | '_rev'>;

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

export async function transformToAuthor(
  wpDoc: WP_REST_API_User,
  client: SanityClient
): Promise<StagedAuthor> {
  const doc: StagedAuthor = {
    _id: `author-${wpDoc.id}`,
    _type: 'author',
  };

  await createOrUpdateAuthor(wpDoc, doc, client);

  return doc;
}

async function createOrUpdateAuthor(
  wpDoc: WP_REST_API_User,
  authorDoc: StagedAuthor,
  client: SanityClient
): Promise<StagedAuthor> {
  const existingAuthor = await client.fetch<Author | null>(
    `*[_type == "author" && name == $name][0]`,
    {
      name: wpDoc.name,
    }
  );

  if (existingAuthor) {
    console.log('AUTHOR ALREADY EXISTS:', existingAuthor?.name);
  }

  const existingLawyer = await client.fetch<Lawyer | null>(
    `*[_type == "lawyer" && name == $name][0]`,
    {
      name: wpDoc.name,
    }
  );

  authorDoc.type = existingLawyer ? 'lawyer' : 'custom';

  authorDoc.name = wpDoc.name;
  authorDoc.slug = {
    _type: 'slug',
    current: slugify(wpDoc.name),
  };
  authorDoc.url = wpDoc.url || '';

  if (existingLawyer) {
    authorDoc.lawyer = {
      _type: 'reference',
      _ref: existingLawyer._id,
    };
  }

  console.log('PROCESSED AUTHOR:', authorDoc.name);

  return authorDoc;
}
