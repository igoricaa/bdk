import { CategoryWithChildren } from '@/src/lib/utils';

/**
 * Filter category tree to only include categories in availableSlugs
 */
export function filterCategoryTree(
  categoryTree: CategoryWithChildren,
  availableSlugs: string[]
): CategoryWithChildren | null {
  const isAvailable = availableSlugs.includes(categoryTree.slug.current);
  
  // Recursively filter children
  const filteredChildren = categoryTree.children
    ?.map((child) => filterCategoryTree(child, availableSlugs))
    .filter((child): child is CategoryWithChildren => child !== null) || [];

  // Keep category if it's available OR has available children
  if (isAvailable || filteredChildren.length > 0) {
    return {
      ...categoryTree,
      children: filteredChildren,
    };
  }

  return null;
}