import { NextRequest, NextResponse } from 'next/server';
import { updateClient as client } from '@/src/sanity/lib/client';

// Define a batch size to control concurrency
const BATCH_SIZE = 10;

// Route handler to update the post count for ALL categories
export async function POST(req: NextRequest) {
  try {
    // Get all categories
    const categories = await client.fetch<{ _id: string }[]>(
      `*[_type == "category"]{_id}`
    );

    console.log(
      `Found ${categories.length} categories. Updating counts in batches of ${BATCH_SIZE}...`
    );

    let updatedCount = 0;
    // Process categories in batches
    for (let i = 0; i < categories.length; i += BATCH_SIZE) {
      const batch = categories.slice(i, i + BATCH_SIZE);
      console.log(
        `Processing batch ${i / BATCH_SIZE + 1} / ${Math.ceil(categories.length / BATCH_SIZE)} (Categories ${i + 1} to ${i + batch.length})`
      );

      const batchPromises = batch.map(async (category) => {
        const count = await client.fetch<number>(
          `count(*[_type == "post" && references($catId)])`,
          { catId: category._id }
        );
        // Use patch().set() to update the count field
        await client.patch(category._id).set({ count }).commit();
        console.log(`Updated count for category ${category._id} to ${count}`);
        updatedCount++; // Increment inside the map callback
      });

      // Wait for the current batch to complete before starting the next
      await Promise.all(batchPromises);
    }

    console.log(`Successfully updated counts for ${updatedCount} categories.`);
    return NextResponse.json({ success: true, updatedCount: updatedCount });
  } catch (error) {
    console.error('Error updating all category post counts:', error);
    // Return a generic error message to the client
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
