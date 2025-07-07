'use server';

import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Webhook secret from environment variables
const WEBHOOK_SECRET = process.env.SANITY_WEBHOOK_SECRET;

// Type definitions for Sanity webhook payload
interface SanityWebhookPayload {
  _type: string;
  _id: string;
  _rev?: string;
  slug?: {
    current: string;
  };
  [key: string]: any;
}

interface WebhookBody {
  _type: string;
  _id: string;
  _rev?: string;
  slug?: {
    current: string;
  };
  [key: string]: any;
}

// Verify webhook signature for security
function verifySignature(body: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.warn('SANITY_WEBHOOK_SECRET not configured');
    return false;
  }

  const expectedSignature = crypto
    .createHmac('sha256', WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Document type to cache tags mapping based on our 4-webhook strategy
const getTagsForDocumentType = (
  documentType: string,
  document: WebhookBody
): string[] => {
  const tags: string[] = [];

  switch (documentType) {
    // ========================================
    // WEBHOOK 1: Content/Posts (HIGH FREQUENCY)
    // ========================================
    case 'post':
      tags.push('posts');
      // Check if it's a newsroom post
      if (
        document.categories?.some(
          (cat: any) =>
            cat.name === 'Newsroom' || cat.slug?.current === 'newsroom'
        )
      ) {
        tags.push('newsroom');
      }
      // Posts can appear on home page and people page
      tags.push('home-page-data', 'people-page-data');
      // Add specific post tag for individual post pages
      if (document.slug?.current) {
        tags.push(`post-${document.slug.current}`);
      }
      break;

    case 'category':
      tags.push('categories');
      // Category changes affect post queries
      tags.push('posts');
      // Add specific category tag
      if (document.slug?.current) {
        tags.push(`category-${document.slug.current}`);
      }
      break;

    case 'author':
      tags.push('authors');
      break;

    // ========================================
    // WEBHOOK 2: People/Legal Team (MEDIUM FREQUENCY)
    // ========================================
    case 'lawyer':
      tags.push('lawyers');
      // Check if it's a partner (appears on home page)
      if (document.category?.title === 'Partner') {
        tags.push('partners');
        tags.push('home-page-data');
      }
      tags.push('people-page-data');
      // Add specific lawyer tag
      if (document.slug?.current) {
        tags.push(`lawyer-${document.slug.current}`);
      }
      break;

    case 'lawyerCategory':
      tags.push('lawyers');
      break;

    case 'peoplePage':
      tags.push('people-page-config', 'people-page-data');
      break;

    // ========================================
    // WEBHOOK 3: Services/Business (MEDIUM FREQUENCY)
    // ========================================
    case 'practice':
      tags.push('practices');
      // Practices appear on home page
      tags.push('home-page-data');
      // Add specific practice tag
      if (document.slug?.current) {
        tags.push(`practice-${document.slug.current}`);
      }
      break;

    case 'industry':
      tags.push('industries');
      // Industries appear on home page
      tags.push('home-page-data');
      break;

    case 'foreignDesk':
      tags.push('foreign-desks');
      break;

    case 'testimonial':
      tags.push('testimonials');
      break;

    // ========================================
    // WEBHOOK 4: Site Structure/Pages (LOW FREQUENCY)
    // ========================================
    case 'generalInfo':
      tags.push('general-info');
      break;

    case 'homePage':
      tags.push('home-page-config', 'home-page-data');
      break;

    case 'blinkdraft':
      tags.push('blinkdraft');
      // Blinkdraft affects multiple pages
      tags.push('general-info', 'home-page-data', 'people-page-data');
      break;

    default:
      // Generic fallback for unknown document types
      console.warn(`Unknown document type: ${documentType}`);
      tags.push('content');
      break;
  }

  return tags;
};

// Paths to revalidate based on document type
const getPathsForDocumentType = (
  documentType: string,
  document: WebhookBody
): string[] => {
  const paths: string[] = [];

  switch (documentType) {
    // ========================================
    // WEBHOOK 1: Content/Posts
    // ========================================
    case 'post':
      // Revalidate knowledge base listing
      paths.push('/bdknowledge');
      // Revalidate specific post page
      if (document.slug?.current) {
        paths.push(`/bdknowledge/${document.slug.current}`);
      }
      break;

    case 'category':
      // Revalidate knowledge base (affects category filters)
      paths.push('/bdknowledge');
      break;

    // ========================================
    // WEBHOOK 2: People/Legal Team
    // ========================================
    case 'lawyer':
      // Revalidate people listing page
      paths.push('/people');
      // Revalidate specific lawyer page
      if (document.slug?.current) {
        paths.push(`/people/${document.slug.current}`);
      }
      // If it's a partner, also revalidate home page
      if (document.category?.title === 'Partner') {
        paths.push('/');
      }
      break;

    case 'peoplePage':
      // Revalidate people listing page configuration
      paths.push('/people');
      break;

    // ========================================
    // WEBHOOK 3: Services/Business
    // ========================================
    case 'practice':
      // Revalidate specific practice page
      if (document.slug?.current) {
        paths.push(`/practices/${document.slug.current}`);
      }
      break;

    case 'industry':
      // Industries appear on home page and practice pages
      paths.push('/');
      break;

    // ========================================
    // WEBHOOK 4: Site Structure/Pages
    // ========================================
    case 'homePage':
      // Revalidate home page
      paths.push('/');
      break;

    case 'generalInfo':
      // General info affects all pages (navigation, footer)
      paths.push('/');
      break;

    case 'blinkdraft':
      // Blinkdraft affects home and people pages
      paths.push('/');
      paths.push('/people');
      break;

    default:
      // For unknown types, don't revalidate specific paths
      // Tag-based revalidation will handle cache invalidation
      break;
  }

  return paths;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('sanity-webhook-signature');

    // Verify webhook signature for security
    if (signature && !verifySignature(body, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse the webhook payload
    let webhookData: WebhookBody;
    try {
      webhookData = JSON.parse(body);
    } catch (error) {
      console.error('Invalid JSON payload:', error);
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      );
    }

    const { _type: documentType, _id: documentId } = webhookData;

    if (!documentType) {
      console.error('Missing document type in webhook payload');
      return NextResponse.json(
        { error: 'Missing document type' },
        { status: 400 }
      );
    }

    console.log(
      `Processing webhook for ${documentType} document: ${documentId}`
    );

    // Get tags and paths to revalidate
    const tagsToRevalidate = getTagsForDocumentType(documentType, webhookData);
    const pathsToRevalidate = getPathsForDocumentType(
      documentType,
      webhookData
    );

    // Revalidate cache tags
    for (const tag of tagsToRevalidate) {
      console.log(`Revalidating tag: ${tag}`);
      revalidateTag(tag);
    }

    // Revalidate specific paths
    for (const path of pathsToRevalidate) {
      console.log(`Revalidating path: ${path}`);
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: true,
      documentType,
      documentId,
      tags: tagsToRevalidate,
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle GET requests for webhook verification
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
