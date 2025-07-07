import { type ClassValue, clsx } from 'clsx';
import { PortableTextBlock, toPlainText } from 'next-sanity';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Invalidate TanStack Query cache for posts
 * Call this function when posts are updated in Sanity
 */
export function invalidatePostsCache() {
  if (typeof window !== 'undefined') {
    // Get the QueryClient instance from the context
    const queryClient = (window as any).__QUERY_CLIENT__;
    if (queryClient) {
      // Invalidate all queries that start with 'posts'
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  }
}

export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
};

export function calculateReadingTimeFromPortableText(
  portableText: PortableTextBlock[]
) {
  const wordsPerMinute = 200;

  // Convert Portable Text to plain text
  const plainText = toPlainText(portableText);

  // Count words
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes || 1} min read`;
}

// Alternative method without @portabletext/react dependency
export function calculateReadingTimeFromPortableTextManual(
  portableText: PortableTextBlock[]
) {
  const wordsPerMinute = 200;

  // Extract text from Portable Text blocks manually
  const extractText = (blocks: PortableTextBlock[]) => {
    return blocks
      .map((block) => {
        if (block._type === 'block' && block.children) {
          return block.children
            .filter((child) => child._type === 'span')
            .map((span) => span.text)
            .join(' ');
        }
        return '';
      })
      .filter((text) => text.trim().length > 0)
      .join(' ');
  };

  const plainText = extractText(portableText);
  const words = plainText
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute);

  return {
    minutes: minutes || 1,
    words,
    text: `${minutes || 1} min read`,
  };
}
