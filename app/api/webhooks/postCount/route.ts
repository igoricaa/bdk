import { NextRequest, NextResponse } from 'next/server';
import { updateClient as client } from '@/sanity/lib/client';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId } = body;

    console.log('Received postId:', postId);

    // Basic validation for postId
    if (typeof postId !== 'string' || postId.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or missing "postId" provided in request body',
        },
        { status: 400 }
      );
    }

    // Fetch the post and its category references
    const post = await client.fetch<{
      categories?: { _ref: string }[];
    } | null>(
      `*[_type == "post" && _id == $postId][0]{ 'categories': categories[]{'_ref'} }`,
      { postId }
    );

    if (!post) {
      return NextResponse.json(
        { success: false, error: `Post with ID ${postId} not found` },
        { status: 404 }
      );
    }

    const categoryRefs = post.categories?.map((cat) => cat._ref) ?? [];

    if (categoryRefs.length === 0) {
      console.log(`Post ${postId} has no categories. No counts to update.`);
      return NextResponse.json({
        success: true,
        message: 'Post has no categories to update',
      });
    }

    console.log(`Updating counts for categories: ${categoryRefs.join(', ')}`);

    // For each category referenced by the post, count posts referencing it and update the count
    await Promise.all(
      categoryRefs.map(async (categoryId: string) => {
        // Fetch the count for this specific category
        const count = await client.fetch<number>(
          `count(*[_type == "post" && references($catId)])`,
          { catId: categoryId }
        );

        // Fetching categoryExists is slightly redundant now as we got the ID from a valid post reference,
        // but it's a good safeguard if referential integrity isn't guaranteed.
        const categoryExists = await client.fetch<boolean>(
          `defined(*[_type == "category" && _id == $catId][0])`,
          { catId: categoryId }
        );

        if (categoryExists) {
          await client.patch(categoryId).set({ count }).commit();
          console.log(`Updated count for category ${categoryId} to ${count}`);
        } else {
          // Optionally log or handle cases where a referenced ID might somehow not exist
          console.warn(
            `Category with ID ${categoryId} referenced by post ${postId} not found. Skipping update.`
          );
        }
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating post counts:', error); // Log the full error
    return NextResponse.json(
      { success: false, error: 'Internal server error' }, // Keep generic error message for client
      { status: 500 }
    );
  }
}
