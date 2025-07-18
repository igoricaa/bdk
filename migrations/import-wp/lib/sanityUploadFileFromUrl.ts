import { SanityClient, SanityAssetDocument } from '@sanity/client';
import { Readable } from 'node:stream';
import { ReadableStream } from 'stream/web';

export async function sanityUploadFileFromUrl(
  fileUrl: string,
  client: SanityClient,
  // The 'wpFileFetch' helper now provides the filename, so we can use it.
  options: { title?: string; description?: string; filename?: string } = {}
): Promise<SanityAssetDocument | null> {
  if (!fileUrl) {
    console.warn('No file URL provided to upload.');
    return null;
  }

  try {
    const response = await fetch(fileUrl);
    if (!response.ok || !response.body) {
      throw new Error(`Failed to fetch file or body was empty for ${fileUrl}`);
    }

    // Use filename from options, or fall back to parsing the URL.
    const filename = options.filename || fileUrl.split('/').pop();

    console.log(`Uploading file: ${filename}...`);

    // This is the key part, mirroring your working image uploader.
    const asset = await client.assets.upload(
      'file',
      Readable.fromWeb(response.body as ReadableStream),
      {
        filename,
        title: options.title,
        description: options.description,
      }
    );

    console.log(`✓ File uploaded successfully with ID: ${asset._id}`);
    return asset;
  } catch (error) {
    console.error(`✗ Error uploading file from URL ${fileUrl}:`, error);
    return null;
  }
}
