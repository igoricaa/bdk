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

// Document type to cache tags mapping
const getTagsForDocumentType = (
  documentType: string,
  document: WebhookBody
): string[] => {
  const tags: string[] = [];

  switch (documentType) {
    case 'homePage':
      tags.push('home-page');
      break;

    case 'post':
      tags.push('posts', 'latest-posts');
      if (document.categories?.includes('newsroom')) {
        tags.push('newsroom');
      }
      break;

    case 'lawyer':
      tags.push('lawyers', 'partners');
      break;

    case 'practice':
      tags.push('practices', 'services');
      break;

    case 'industry':
      tags.push('industries', 'services');
      break;

    case 'category':
      tags.push('categories', 'posts');
      break;

    case 'author':
      tags.push('authors', 'posts');
      break;

    case 'blinkdraft':
      tags.push('blinkdraft', 'home-page');
      break;

    case 'generalInfo':
      tags.push('general-info', 'navigation', 'footer');
      break;

    case 'testimonial':
      tags.push('testimonials', 'services');
      break;

    case 'foreignDesk':
      tags.push('foreign-desks', 'services');
      break;

    default:
      // Generic tag for unknown document types
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
    case 'homePage':
      paths.push('/');
      break;

    case 'post':
      paths.push('/bdknowledge');
      if (document.slug?.current) {
        paths.push(`/bdknowledge/${document.slug.current}`);
      }
      break;

    case 'lawyer':
      paths.push('/people');
      if (document.slug?.current) {
        paths.push(`/people/${document.slug.current}`);
      }
      break;

    case 'practice':
      if (document.slug?.current) {
        paths.push(`/practices/${document.slug.current}`);
      }
      break;

    case 'generalInfo':
      // Revalidate all pages that use general info (navigation, footer, etc.)
      paths.push('/');
      break;

    default:
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
