import { writeClient as client } from '@/src/sanity/lib/client';

/**
 * Recursively fetch all parent category IDs for a given category
 * @param categoryId - The category ID to get parents for
 * @param visited - Set of already visited category IDs (prevents infinite loops)
 * @returns Array of all parent category IDs (deduplicated)
 */
async function getAllParentCategoryIds(
  categoryId: string,
  visited: Set<string> = new Set()
): Promise<string[]> {
  // Prevent infinite loops in circular references
  if (visited.has(categoryId)) {
    return [];
  }
  visited.add(categoryId);

  // Fetch parent refs for this category
  const category = await client.fetch<{
    parent?: { _ref: string }[];
  } | null>(
    `*[_type == "category" && _id == $catId][0]{ 'parent': parent[]{ _ref } }`,
    { catId: categoryId }
  );

  if (!category || !category.parent || category.parent.length === 0) {
    return []; // No parents
  }

  const parentIds = category.parent.map((p) => p._ref);
  const allParentIds: string[] = [...parentIds];

  // Recursively get parents of parents
  for (const parentId of parentIds) {
    const grandparentIds = await getAllParentCategoryIds(parentId, visited);
    allParentIds.push(...grandparentIds);
  }

  return allParentIds;
}

/**
 * Update the post count for a specific category
 * @param categoryId - The _id of the category document
 * @returns The updated count value
 */
export async function updateCategoryCount(
  categoryId: string
): Promise<number> {
  try {
    // Count all posts that reference this category
    const count = await client.fetch<number>(
      `count(*[_type == "post" && references($catId)])`,
      { catId: categoryId }
    );

    // Update the category document with the new count
    await client.patch(categoryId).set({ count }).commit();

    console.log(`✓ Updated count for category ${categoryId}: ${count} posts`);
    return count;
  } catch (error) {
    console.error(`✗ Failed to update count for category ${categoryId}:`, error);
    throw error;
  }
}

/**
 * Update counts for all categories referenced by a specific post (including parent categories)
 * @param postId - The _id of the post document
 * @param categoryRefsFromWebhook - Optional category refs from webhook (for delete/create/update)
 * @returns Array of updated category IDs and their new counts
 */
export async function updateCategoriesForPost(
  postId: string,
  categoryRefsFromWebhook?: string[]
): Promise<Array<{ id: string; count: number }>> {
  try {
    let categoryRefs: string[] = [];

    // Try to use webhook categories first (works for all cases including deletion)
    if (categoryRefsFromWebhook && categoryRefsFromWebhook.length > 0) {
      categoryRefs = categoryRefsFromWebhook;
      console.log(
        `✓ Using ${categoryRefs.length} category refs from webhook for post ${postId}`
      );
    } else {
      // Fallback: Fetch the post and its category references
      const post = await client.fetch<{
        categories?: string[];
      } | null>(
        `*[_type == "post" && _id == $postId][0]{ 'categories': categories[]._ref }`,
        { postId }
      );

      if (!post) {
        console.warn(
          `⚠ Post ${postId} not found and no category refs provided, skipping category count update`
        );
        return [];
      }

      categoryRefs = post.categories ?? [];
    }

    if (categoryRefs.length === 0) {
      console.log(`ℹ Post ${postId} has no categories`);
      return [];
    }

    // Get all parent categories recursively for each direct category
    const allCategoryIds = new Set<string>(categoryRefs);

    for (const catId of categoryRefs) {
      const parentIds = await getAllParentCategoryIds(catId);
      parentIds.forEach((id) => allCategoryIds.add(id));
    }

    const allCategoriesToUpdate = Array.from(allCategoryIds);
    const parentCount = allCategoriesToUpdate.length - categoryRefs.length;

    console.log(
      `⟳ Updating counts for ${categoryRefs.length} direct categories${parentCount > 0 ? ` + ${parentCount} parent categories` : ''} from post ${postId}`
    );

    // Update all categories (direct + parents) in parallel
    const results = await Promise.all(
      allCategoriesToUpdate.map(async (categoryId: string) => {
        const count = await updateCategoryCount(categoryId);
        return { id: categoryId, count };
      })
    );

    console.log(
      `✓ Successfully updated ${results.length} category counts (${categoryRefs.length} direct${parentCount > 0 ? ` + ${parentCount} parents` : ''})`
    );
    return results;
  } catch (error) {
    console.error(
      `✗ Failed to update categories for post ${postId}:`,
      error
    );
    throw error;
  }
}

/**
 * Update counts for all categories in the dataset
 * Useful for bulk initialization or maintenance
 * @returns Number of categories updated
 */
export async function updateAllCategoryCounts(): Promise<number> {
  try {
    // Get all category IDs
    const categories = await client.fetch<{ _id: string }[]>(
      `*[_type == "category"]{_id}`
    );

    console.log(
      `⟳ Updating counts for ${categories.length} categories (bulk operation)`
    );

    // Update in batches of 10 to avoid overwhelming the API
    const BATCH_SIZE = 10;
    let updatedCount = 0;

    for (let i = 0; i < categories.length; i += BATCH_SIZE) {
      const batch = categories.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (category) => {
          await updateCategoryCount(category._id);
          updatedCount++;
        })
      );
    }

    console.log(`✓ Successfully updated all ${updatedCount} category counts`);
    return updatedCount;
  } catch (error) {
    console.error('✗ Failed to update all category counts:', error);
    throw error;
  }
}
