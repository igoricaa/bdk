import { type ClassValue, clsx } from 'clsx';
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
