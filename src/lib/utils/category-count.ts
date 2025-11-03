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
    // Count all published posts that reference this category directly
    // OR reference any child category of this category
    const count = await client.fetch<number>(
      `count(*[
        _type == "post"
        && status == "publish"
        && (
          references($catId)
          || count((categories[]._ref)[
            @ in *[_type == "category" && references($catId)]._id
          ]) > 0
        )
      ])`,
      { catId: categoryId }
    );

    // Update the category document with the new count
    await client.patch(categoryId).set({ count }).commit();

    console.log(`✓ Updated count for category ${categoryId}: ${count} posts`);
    return count;
  } catch (error) {
    console.error(
      `✗ Failed to update count for category ${categoryId}:`,
      error
    );
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
    let newCategoryRefs: string[] = [];
    let oldCategoryRefs: string[] = [];

    // Always try to fetch old categories from the database first
    // This is needed for updates to know which categories to recalculate
    const oldPost = await client.fetch<{
      categories?: string[];
    } | null>(
      `*[_type == "post" && _id == $postId][0]{ 'categories': categories[]._ref }`,
      { postId }
    );

    if (oldPost && oldPost.categories) {
      oldCategoryRefs = oldPost.categories;
    }

    // Get new categories from webhook (or use old ones as fallback)
    if (categoryRefsFromWebhook && categoryRefsFromWebhook.length > 0) {
      newCategoryRefs = categoryRefsFromWebhook;
      console.log(
        `✓ Received ${newCategoryRefs.length} category refs from webhook for post ${postId}`
      );
    } else {
      newCategoryRefs = oldCategoryRefs;
    }

    // If this is a deletion, oldPost won't exist but webhook will have categories
    if (!oldPost && (!categoryRefsFromWebhook || categoryRefsFromWebhook.length === 0)) {
      console.warn(
        `⚠ Post ${postId} not found and no category refs provided, skipping category count update`
      );
      return [];
    }

    // Merge old and new categories to update ALL affected categories
    // This ensures both old (being removed) and new (being added) get recalculated
    const allAffectedCategoryRefs = new Set<string>([
      ...newCategoryRefs,
      ...oldCategoryRefs,
    ]);

    const categoryRefs = Array.from(allAffectedCategoryRefs);

    if (categoryRefs.length === 0) {
      console.log(`ℹ Post ${postId} has no categories (old or new)`);
      return [];
    }

    // Log what's happening for debugging
    if (oldCategoryRefs.length > 0 && newCategoryRefs.length > 0) {
      const removed = oldCategoryRefs.filter(id => !newCategoryRefs.includes(id));
      const added = newCategoryRefs.filter(id => !oldCategoryRefs.includes(id));

      if (removed.length > 0 || added.length > 0) {
        console.log(`  - Old categories: ${oldCategoryRefs.length}`);
        console.log(`  - New categories: ${newCategoryRefs.length}`);
        if (removed.length > 0) console.log(`  - Removed: ${removed.length}`);
        if (added.length > 0) console.log(`  - Added: ${added.length}`);
      }
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
      `⟳ Updating counts for ${categoryRefs.length} affected categories${parentCount > 0 ? ` + ${parentCount} parent categories` : ''} from post ${postId}`
    );

    // Update all categories (direct + parents) in parallel
    const results = await Promise.all(
      allCategoriesToUpdate.map(async (categoryId: string) => {
        const count = await updateCategoryCount(categoryId);
        return { id: categoryId, count };
      })
    );

    console.log(
      `✓ Successfully updated ${results.length} category counts (${categoryRefs.length} affected${parentCount > 0 ? ` + ${parentCount} parents` : ''})`
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
