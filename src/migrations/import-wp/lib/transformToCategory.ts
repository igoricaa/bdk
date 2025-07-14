import type { WP_REST_API_Term } from 'wp-types';
import type { Category } from '../../../../sanity.types';
import { uuid } from '@sanity/uuid';
import { decode } from 'html-entities';

type StagedCategory = Omit<Category, '_createdAt' | '_updatedAt' | '_rev'>;

export async function transformToCategory(
  wpDoc: WP_REST_API_Term
): Promise<StagedCategory> {
  const doc: StagedCategory = {
    _id: `category-${wpDoc.id}`,
    _type: 'category',
    name: decode(wpDoc.name),
    slug: { _type: 'slug', current: decode(wpDoc.slug) },
  };

  // WordPress parent is 0 if no parent
  if (wpDoc.parent && typeof wpDoc.parent === 'number' && wpDoc.parent > 0) {
    doc.parent = [
      {
        _key: uuid(),
        _type: 'reference',
        _ref: `category-${wpDoc.parent}`,
      },
    ];
  }

  return doc;
}
