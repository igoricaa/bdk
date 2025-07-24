import { decode } from 'html-entities';
import type { WP_REST_API_Post } from 'wp-types';

import type { Post } from '../../../sanity.types';
import { uuid } from '@sanity/uuid';
import { SanityClient } from 'next-sanity';
import { sanityUploadFromUrl } from './sanityUploadFromUrl';
import { sanityIdToImageReference } from './sanityIdToImageReference';
import { wpImageFetch } from './wpImageFetch';
import { htmlToBlockContent } from './htmlToBlockContent';
import { wpFileFetch } from './wpFileFetch';
import { sanityUploadFileFromUrl } from './sanityUploadFileFromUrl';

// Remove these keys because they'll be created by Content Lake
type StagedPost = Omit<Post, '_createdAt' | '_updatedAt' | '_rev'>;

export async function transformToPost(
  wpDoc: WP_REST_API_Post,
  client: SanityClient,
  existingImages: Record<string, string> = {}
): Promise<StagedPost> {
  const doc: StagedPost = {
    _id: `post-${wpDoc.id}`,
    _type: 'post',
  };

  doc.title = decode(wpDoc.title.rendered).trim();

  if (wpDoc.slug) {
    doc.slug = { _type: 'slug', current: decode(wpDoc.slug) };
  }

  if (Array.isArray(wpDoc.categories) && wpDoc.categories.length) {
    doc.categories = wpDoc.categories.map((catId) => ({
      _key: uuid(),
      _type: 'reference',
      _ref: `category-${catId}`,
    }));
  }

  if (
    wpDoc.coauthors &&
    Array.isArray(wpDoc.coauthors) &&
    wpDoc.coauthors.length > 0
  ) {
    doc.authors = wpDoc.coauthors
      .filter((author): author is { id: number } => {
        if (!author || typeof author.id !== 'number') {
          console.warn(`Invalid author data found: ${JSON.stringify(author)}`);
          return false;
        }
        return true;
      })
      .map((author) => ({
        _key: uuid(),
        _type: 'reference',
        _ref: `author-${author.id}`,
      }));
  } else if (wpDoc.author) {
    doc.authors = [
      {
        _key: uuid(),
        _type: 'reference',
        _ref: `author-${wpDoc.author}`,
      },
    ];
  }

  if (wpDoc.date) {
    doc.date = wpDoc.date;
  }

  if (wpDoc.modified) {
    doc.modified = wpDoc.modified;
  }

  if (wpDoc.status) {
    doc.status = wpDoc.status as StagedPost['status'];
  }

  doc.sticky = wpDoc.sticky == true;

  doc.publications = {} as Post['publications'];

  if (wpDoc.acf && typeof wpDoc.acf === 'object' && 'url' in wpDoc.acf) {
    doc.publications!.url = wpDoc.acf.url as string;
  }

  if (
    wpDoc.acf &&
    typeof wpDoc.acf === 'object' &&
    'download' in wpDoc.acf &&
    typeof wpDoc.acf.download === 'number' &&
    wpDoc.acf.download
  ) {
    const mediaId = wpDoc.acf.download;

    // 1. Fetch the structured file details
    const fileDetails = await wpFileFetch(mediaId);

    if (fileDetails?.source_url) {
      // 2. Upload that file to Sanity, passing metadata
      const fileAsset = await sanityUploadFileFromUrl(
        fileDetails.source_url,
        client,
        {
          // Pass the extra metadata
          title: fileDetails.title,
          description: fileDetails.description,
          filename: fileDetails.filename,
        }
      );

      // 3. Create the reference
      if (fileAsset) {
        doc.publications!.download = {
          _type: 'file',
          asset: {
            _type: 'reference',
            _ref: fileAsset._id,
          },
        };
      }
    }
  }

  // Document has an image
  if (typeof wpDoc.featured_media === 'number' && wpDoc.featured_media > 0) {
    // Image exists already in dataset
    if (existingImages[wpDoc.featured_media]) {
      doc.featuredMedia = sanityIdToImageReference(
        existingImages[wpDoc.featured_media]
      );
    } else {
      // Retrieve image details from WordPress
      const metadata = await wpImageFetch(wpDoc.featured_media);

      if (metadata?.source?.url) {
        // Upload to Sanity
        const asset = await sanityUploadFromUrl(
          metadata.source.url,
          client,
          metadata
        );

        if (asset) {
          doc.featuredMedia = sanityIdToImageReference(asset._id);
          existingImages[wpDoc.featured_media] = asset._id;
        }
      }
    }
  }

  if (wpDoc.content) {
    doc.content = await htmlToBlockContent(
      wpDoc.content.rendered,
      client,
      existingImages
    );
  }

  return doc;
}
