import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// Test endpoint for manual revalidation (development only)
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Test endpoint only available in development' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { tags, paths, action } = body;

    if (action === 'revalidate-all') {
      // Revalidate all common tags
      const allTags = [
        'home-page',
        'posts',
        'latest-posts',
        'newsroom',
        'lawyers',
        'partners',
        'practices',
        'industries',
        'services',
        'categories',
        'authors',
        'blinkdraft',
        'general-info',
        'testimonials',
      ];

      for (const tag of allTags) {
        revalidateTag(tag);
      }

      // Revalidate common paths
      const commonPaths = ['/', '/bdknowledge', '/people'];
      for (const path of commonPaths) {
        revalidatePath(path);
      }

      return NextResponse.json({
        revalidated: true,
        tags: allTags,
        paths: commonPaths,
        action: 'revalidate-all',
      });
    }

    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        revalidateTag(tag);
      }
    }

    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        revalidatePath(path);
      }
    }

    return NextResponse.json({
      revalidated: true,
      tags: tags || [],
      paths: paths || [],
      action: action || 'custom',
    });
  } catch (error) {
    console.error('Test revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'Test endpoint only available in development' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    message: 'Test revalidation endpoint',
    examples: {
      'Revalidate specific tags': {
        method: 'POST',
        body: {
          tags: ['home-page', 'posts'],
          paths: ['/'],
        },
      },
      'Revalidate all': {
        method: 'POST',
        body: {
          action: 'revalidate-all',
        },
      },
    },
  });
}
