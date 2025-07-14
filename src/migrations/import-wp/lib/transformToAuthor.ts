import type { WP_REST_API_User } from 'wp-types';
import type { Author, Lawyer } from '../../../../sanity.types';
import { client } from '@/src/sanity/lib/client';

type StagedAuthor = Omit<Author, '_createdAt' | '_updatedAt' | '_rev'>;

export async function transformToAuthor(
  wpDoc: WP_REST_API_User
): Promise<StagedAuthor> {
  const doc: StagedAuthor = {
    _id: `author-${wpDoc.id}`,
    _type: 'author',
  };

  await createOrUpdateAuthor(wpDoc, doc);

  return doc;
}

async function createOrUpdateAuthor(
  wpDoc: WP_REST_API_User,
  authorDoc: StagedAuthor
): Promise<StagedAuthor> {
  const existingLawyer = await client.fetch<Lawyer | null>(
    `*[_type == "lawyer" && name == $name][0]`,
    {
      name: wpDoc.name,
    }
  );

  authorDoc.type = existingLawyer ? 'lawyer' : 'custom';

  if (existingLawyer) {
    authorDoc.lawyer = {
      _type: 'reference',
      _ref: existingLawyer._id,
    };
  } else {
    authorDoc.customAuthor = {
      name: wpDoc.name,
      slug: {
        _type: 'slug',
        current: `${wpDoc.name.toLowerCase()}`,
      },
      url: wpDoc.url || '',
    };
  }

  return authorDoc;
}
