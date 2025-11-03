import { type NextRequest, NextResponse } from 'next/server';
import { updateCategoriesForPost } from '@/src/lib/utils/category-count';

/**
 * Update category counts for a specific post
 * Expects { postId: string } in request body
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId } = body;

    console.log('📝 Received category count update request for postId:', postId);

    // Validate postId
    if (typeof postId !== 'string' || postId.trim() === '') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid or missing "postId" provided in request body',
        },
        { status: 400 }
      );
    }

    // Update categories using utility function
    const results = await updateCategoriesForPost(postId);

    if (results.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'Post has no categories or was not found',
        updatedCategories: 0,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${results.length} categories`,
      updatedCategories: results.length,
      results,
    });
  } catch (error: any) {
    console.error('❌ Error updating category counts for post:', error);

    // Return detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development'
      ? error.message
      : 'Internal server error';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
