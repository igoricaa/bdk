import {
  LAWYERS_BY_CATEGORY_QUERYResult,
  YEARS_BY_CATEGORY_QUERYResult,
} from '@/sanity.types';
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
    slug: category.slug.current,
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

export interface CategoryWithChildren {
  _id: string;
  name: string;
  slug: { current: string };
  postCount: number;
  hasChildren: boolean;
  children: CategoryWithChildren[];
}

export interface FlatCategory {
  _id: string;
  name: string;
  slug: { current: string };
  parentRefs: string[] | null;
  postCount: number;
  hasChildren: boolean;
}

export function buildCategoryTree(
  rootCategory: {
    _id: string;
    name: string;
    slug: { current: string };
    postCount: number;
  } | null,
  allCategories: FlatCategory[]
): CategoryWithChildren | null {
  if (!rootCategory) return null;

  // Function to check if a category is a descendant of the root
  const isDescendant = (
    categoryId: string,
    visited = new Set<string>()
  ): boolean => {
    if (visited.has(categoryId)) return false; // Prevent infinite loops
    if (categoryId === rootCategory._id) return true;

    visited.add(categoryId);

    const category = allCategories.find((c) => c._id === categoryId);
    if (!category || !category.parentRefs) return false;

    return category.parentRefs.some((parentId) =>
      isDescendant(parentId, visited)
    );
  };

  // Filter to only include descendants of the root category
  const descendants = allCategories.filter(
    (category) =>
      isDescendant(category._id) && category._id !== rootCategory._id
  );

  // Create a map for quick lookup
  const categoryMap = new Map<string, CategoryWithChildren>();

  // Initialize root category
  const root: CategoryWithChildren = {
    ...rootCategory,
    hasChildren: descendants.some((d) =>
      d.parentRefs?.includes(rootCategory._id)
    ),
    children: [],
  };

  categoryMap.set(root._id, root);

  // Initialize all descendant categories in the map
  descendants.forEach((category) => {
    categoryMap.set(category._id, {
      _id: category._id,
      name: category.name,
      slug: category.slug,
      postCount: category.postCount,
      hasChildren: category.hasChildren,
      children: [],
    });
  });

  // Build the tree by assigning children to their parents
  descendants.forEach((category) => {
    if (category.parentRefs) {
      category.parentRefs.forEach((parentId: string) => {
        const parentCategory = categoryMap.get(parentId);
        const childCategory = categoryMap.get(category._id);

        if (parentCategory && childCategory) {
          // Check if child is not already added to avoid duplicates
          if (
            !parentCategory.children.some(
              (child) => child._id === childCategory._id
            )
          ) {
            parentCategory.children.push(childCategory);
          }
        }
      });
    }
  });

  // Sort children by name at each level
  const sortChildren = (category: CategoryWithChildren) => {
    category.children.sort((a, b) => a.name.localeCompare(b.name));
    category.children.forEach(sortChildren);
  };

  sortChildren(root);

  return root;
}

export const getYearsFilterOptions = (
  postYears: YEARS_BY_CATEGORY_QUERYResult
) => {
  const years = (postYears || [])
    .map((date: any) => new Date(date).getFullYear().toString())
    .filter((year: string) => parseInt(year) >= 2015);

  const availableYears = Array.from(new Set(years)).sort(
    (a, b) => parseInt(b) - parseInt(a)
  );

  const yearFilterOptions = [
    { slug: 'all', label: 'Latest' },
    ...(availableYears.length > 1
      ? availableYears.map((year: string) => ({
          slug: year,
          label: year,
        }))
      : []),
  ];

  return yearFilterOptions;
};
