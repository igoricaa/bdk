import { type NextRequest, NextResponse } from 'next/server';
import { updateAllCategoryCounts } from '@/src/lib/utils/category-count';

/**
 * Bulk update endpoint to recalculate post counts for ALL categories
 * Useful for initialization or maintenance
 */
export async function POST(req: NextRequest) {
  try {
    console.log('🔄 Starting bulk category count update...');

    const updatedCount = await updateAllCategoryCounts();

    return NextResponse.json({
      success: true,
      updatedCount,
      message: `Successfully updated ${updatedCount} categories`
    });
  } catch (error) {
    console.error('❌ Error in bulk category count update:', error);

    // Return detailed error in development, generic in production
    const errorMessage = process.env.NODE_ENV === 'development'
      ? (error as Error).message
      : 'Internal server error';

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
