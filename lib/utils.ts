import { LAWYERS_BY_CATEGORY_QUERYResult } from '@/sanity.types';
import { type ClassValue, clsx } from 'clsx';
import { PortableTextBlock, toPlainText } from 'next-sanity';
import { twMerge } from 'tailwind-merge';
import { FilterOption } from '@/components/ui/filter-buttons';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type LawyerFromQuery = NonNullable<
  LAWYERS_BY_CATEGORY_QUERYResult['categories'][0]['orderedLawyers']
>[0];

export type ComputedLawyersData = {
  allLawyers: LawyerFromQuery[];
  lawyersByCategory: Record<string, LawyerFromQuery[]>;
  filterOptions: FilterOption[];
};

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

export const getComputedLawyersData = ({
  categories,
}: {
  categories: LAWYERS_BY_CATEGORY_QUERYResult['categories'];
}): ComputedLawyersData => {
  const filterOptions: FilterOption[] = categories.map((category) => ({
    id: category.slug.current,
    label: category.title,
    order: category.order || 99,
  }));

  // Pre-compute all lawyers for the "all" category
  const allLawyers = categories.flatMap(
    (category) => category.orderedLawyers || []
  );

  // Pre-compute lawyers by category for faster client-side filtering
  const lawyersByCategory = categories.reduce(
    (acc, category) => {
      acc[category.slug.current] = category.orderedLawyers || [];
      return acc;
    },
    {} as Record<string, typeof allLawyers>
  );

  return { allLawyers, lawyersByCategory, filterOptions };
};
