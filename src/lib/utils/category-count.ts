import { updateClient as client } from '@/src/sanity/lib/client';

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
 * Update counts for all categories referenced by a specific post
 * @param postId - The _id of the post document
 * @returns Array of updated category IDs and their new counts
 */
export async function updateCategoriesForPost(
  postId: string
): Promise<Array<{ id: string; count: number }>> {
  try {
    // Fetch the post and its category references
    const post = await client.fetch<{
      categories?: { _ref: string }[];
    } | null>(
      `*[_type == "post" && _id == $postId][0]{ 'categories': categories[]{'_ref'} }`,
      { postId }
    );

    if (!post) {
      console.warn(`⚠ Post ${postId} not found, skipping category count update`);
      return [];
    }

    const categoryRefs = post.categories?.map((cat) => cat._ref) ?? [];

    if (categoryRefs.length === 0) {
      console.log(`ℹ Post ${postId} has no categories`);
      return [];
    }

    console.log(
      `⟳ Updating counts for ${categoryRefs.length} categories from post ${postId}`
    );

    // Update all categories in parallel
    const results = await Promise.all(
      categoryRefs.map(async (categoryId: string) => {
        const count = await updateCategoryCount(categoryId);
        return { id: categoryId, count };
      })
    );

    console.log(`✓ Successfully updated ${results.length} category counts`);
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
