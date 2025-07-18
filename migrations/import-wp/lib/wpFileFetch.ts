import { decode } from 'html-entities';

import { BASE_URL } from '../constants';

// Define a clear interface for the data we want to return
export interface WpFileData {
  source_url: string;
  filename: string;
  title?: string;
  description?: string;
}

/**
 * Gets WordPress asset metadata for a file by its ID.
 * @param id The WordPress media ID
 * @returns A structured object with file metadata or null on error.
 */
export async function wpFileFetch(id: number): Promise<WpFileData | null> {
  if (!id) {
    return null;
  }

  const wpApiUrl = new URL(`${BASE_URL}/media/${id}`).toString();

  try {
    const res = await fetch(wpApiUrl);
    if (!res.ok) {
      console.error(`Failed to fetch media ID ${id}: ${res.statusText}`);
      return null;
    }

    const mediaData = await res.json();

    if (!mediaData?.source_url) {
      console.warn(`No source_url found for media ID ${id}`);
      return null;
    }

    // Prepare the structured data object, similar to your wpImageFetch
    const fileData: WpFileData = {
      source_url: mediaData.source_url,
      filename: mediaData.source_url.split('/').pop() || `file-${id}`,
    };

    if (mediaData.title?.rendered) {
      fileData.title = decode(mediaData.title.rendered);
    }

    // For files, description or caption can be used.
    if (mediaData.description?.rendered) {
      fileData.description = decode(mediaData.description.rendered);
    } else if (mediaData.caption?.rendered) {
      // Fallback to caption if description is empty
      fileData.description = decode(mediaData.caption.rendered);
    }

    return fileData;
  } catch (error) {
    console.error(`Error processing media ID ${id}:`, error);
    return null;
  }
}
