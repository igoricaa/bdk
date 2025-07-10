import { LAWYERS_QUERYResult } from '@/sanity.types';
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

export type LawyersByCategory = Record<
  string,
  { lawyers: LAWYERS_QUERYResult['lawyers'] }
>;
export type Categories = Array<{ id: string; label: string; order: number }>;

export function getLawyersByCategoryAndCategories(
  lawyers: LAWYERS_QUERYResult['lawyers']
) {
  const { lawyersByCategory, categories } = lawyers.reduce(
    (
      acc: {
        lawyersByCategory: Record<string, { lawyers: typeof lawyers }>;
        categories: Array<{ id: string; label: string; order: number }>;
      },
      lawyer: (typeof lawyers)[0]
    ) => {
      const categorySlug = lawyer.category.slug.current;
      const categoryTitle = lawyer.category.title;
      const categoryOrder = lawyer.category.order || 5;

      if (!acc.lawyersByCategory[categorySlug]) {
        acc.lawyersByCategory[categorySlug] = { lawyers: [] };

        acc.categories.push({
          id: categorySlug,
          label: categoryTitle,
          order: categoryOrder,
        });
      }

      acc.lawyersByCategory[categorySlug].lawyers.push(lawyer);
      return acc;
    },
    {
      lawyersByCategory: {} as Record<string, { lawyers: typeof lawyers }>,
      categories: [] as Array<{ id: string; label: string; order: number }>,
    }
  );

  categories.sort(
    (a: { order: number }, b: { order: number }) => a.order - b.order
  );

  const allLawyersSortedByCategory = categories.flatMap(
    (category: { id: string }) => lawyersByCategory[category.id]?.lawyers || []
  );

  const finalLawyersByCategory = {
    all: { lawyers: allLawyersSortedByCategory },
    ...lawyersByCategory,
  };

  return [finalLawyersByCategory, categories];
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export type PdfFile = {
  asset: {
    _ref: string;
  };
};

export const getPdfUrl = (pdfFile: PdfFile) => {
  if (!pdfFile) {
    return null;
  }

  // Extract the file ID from the reference
  const fileId = pdfFile.asset?._ref.replace('file-', '').replace('-pdf', '');

  // Construct the Sanity CDN URL for the PDF
  const pdfUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.pdf`;

  return pdfUrl;
};
