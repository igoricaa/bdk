'use server';

import { revalidateTag } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

// Get the secret from environment variables
const SANITY_WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

// Define the expected payload structure from our webhooks
interface RevalidateBody {
  _type: string;
  slug?: string;
  // For posts, we might get category info
  categorySlug?: string;
  oldCategorySlug?: string;
}

export async function POST(req: NextRequest) {
  console.log("IM IN")
  if (!SANITY_WEBHOOK_SECRET) {
    console.error('Missing SANITY_WEBHOOK_SECRET in environment variables.');
    return NextResponse.json(
      { message: 'Server configuration error: Missing secret' },
      { status: 500 }
    );
  }

  try {
    // Use the official parser from `next-sanity`.
    const { body, isValidSignature } = await parseBody<RevalidateBody>(
      req,
      SANITY_WEBHOOK_SECRET
    );

    // 1. Validate signature
    if (!isValidSignature) {
      const message = 'Invalid signature';
      console.log(message);
      return NextResponse.json({ message, isValidSignature }, { status: 401 });
    }

    if (!body?._type) {
      const message = 'Bad request: Missing _type in body';
      console.log(message);
      return NextResponse.json({ message }, { status: 400 });
    }

    // 2. Determine tags to revalidate
    const tagsToRevalidate: string[] = [];
    const { _type, slug, categorySlug, oldCategorySlug } = body;

    // Revalidate broad, list-based tags
    const listTags: Record<string, string[]> = {
      post: ['posts', 'global-featured-posts'],
      author: ['authors'],
      category: ['categories', 'posts'], // Changing a category name should re-fetch post lists
      lawyer: ['lawyers', 'people-page-data'],
      lawyerCategory: ['lawyer-categories', 'lawyers'],
      practice: ['practices', 'services', 'home-page-data'],
      industry: ['industries', 'services', 'home-page-data'],
      foreignDesk: ['foreign-desks', 'services'],
      testimonial: ['testimonials'],
    };

    if (listTags[_type]) {
      tagsToRevalidate.push(...listTags[_type]);
    }

    // Revalidate specific, slug-based tags
    if (slug) {
      tagsToRevalidate.push(`${_type}-${slug}`);
    }

    // Handle special revalidation for posts changing categories
    if (_type === 'post') {
      if (categorySlug) {
        tagsToRevalidate.push(`posts-by-category-${categorySlug}`);
        tagsToRevalidate.push(`nested-categories-${categorySlug}`);
      }
      if (oldCategorySlug) {
        tagsToRevalidate.push(`posts-by-category-${oldCategorySlug}`);
        tagsToRevalidate.push(`nested-categories-${oldCategorySlug}`);
      }
    }

    // Handle singleton page tags
    const singletonTags: Record<string, string> = {
      homePage: 'home-page-data',
      peoplePage: 'people-page-data',
      aboutUsPage: 'about-us-page-data',
      careerPage: 'career-page-data',
      blinkdraft: 'blinkdraft', // Note: Type name might be 'blinkdraft' not 'blinkdraftPage'
      generalInfo: 'general-info',
      privacyNotice: 'privacy-notice',
      cookiePolicy: 'cookie-policy',
    };

    if (singletonTags[_type]) {
      tagsToRevalidate.push(singletonTags[_type]);
      // Special case for generalInfo affecting all pages via header/footer
      if (_type === 'generalInfo') {
        tagsToRevalidate.push('all-pages'); // A catch-all if needed
      }
    }

    // 3. Perform revalidation
    const uniqueTags = [...new Set(tagsToRevalidate.filter(Boolean))];
    console.log(`Revalidating tags: ${uniqueTags.join(', ')}`);

    uniqueTags.forEach((tag) => {
      revalidateTag(tag);
    });

    return NextResponse.json({
      revalidated: true,
      revalidatedTags: uniqueTags,
      now: Date.now(),
    });
  } catch (error: any) {
    console.error('Error in revalidation route:', error.message);
    return NextResponse.json(
      { message: 'Error revalidating', error: error.message },
      { status: 500 }
    );
  }
}

// Handle GET requests for webhook verification (no changes needed here)
export async function GET(request: NextRequest) {
  const challenge = request.nextUrl.searchParams.get('challenge');

  if (challenge) {
    // Respond to webhook verification challenge
    return NextResponse.json({ challenge });
  }

  return NextResponse.json({
    message: 'Sanity webhook endpoint is running',
    timestamp: new Date().toISOString(),
  });
}
