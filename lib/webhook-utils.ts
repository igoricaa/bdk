import crypto from 'crypto';

/**
 * Generate webhook signature for testing
 * @param payload - The webhook payload as a string
 * @param secret - The webhook secret
 * @returns The HMAC SHA-256 signature
 */
export function generateWebhookSignature(
  payload: string,
  secret: string
): string {
  return crypto.createHmac('sha256', secret).update(payload).digest('hex');
}

/**
 * Verify webhook signature
 * @param payload - The webhook payload as a string
 * @param signature - The signature to verify
 * @param secret - The webhook secret
 * @returns True if signature is valid
 */
export function verifyWebhookSignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = generateWebhookSignature(payload, secret);

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

/**
 * Create a test webhook payload
 * @param documentType - The document type
 * @param documentId - The document ID
 * @param additionalData - Additional data for the document
 * @returns The webhook payload object
 */
export function createTestWebhookPayload(
  documentType: string,
  documentId: string,
  additionalData: Record<string, any> = {}
): Record<string, any> {
  const basePayload: Record<string, any> = {
    _type: documentType,
    _id: documentId,
    _rev: `test-rev-${Date.now()}`,
    ...additionalData,
  };

  // Add slug for document types that typically have slugs
  if (['post', 'lawyer', 'practice'].includes(documentType)) {
    basePayload.slug = {
      current: additionalData.slug || `test-${documentType}-${documentId}`,
    };
  }

  return basePayload;
}

/**
 * Test webhook signature generation
 * Example usage for testing webhook endpoints
 */
export function testWebhookSignature() {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    throw new Error('SANITY_WEBHOOK_SECRET not configured');
  }

  const testPayload = createTestWebhookPayload('post', 'test-post-123', {
    title: 'Test Post',
    categories: ['newsroom'],
  });

  const payloadString = JSON.stringify(testPayload);
  const signature = generateWebhookSignature(payloadString, secret);

  console.log('Test Webhook Data:');
  console.log('Payload:', payloadString);
  console.log('Signature:', signature);
  console.log('Test curl command:');
  console.log(`curl -X POST http://localhost:3000/api/revalidate \\
  -H "Content-Type: application/json" \\
  -H "sanity-webhook-signature: ${signature}" \\
  -d '${payloadString}'`);

  return {
    payload: testPayload,
    signature,
    payloadString,
  };
}

/**
 * Document type to cache tags mapping (for reference)
 */
export const DOCUMENT_TYPE_CACHE_TAGS = {
  homePage: ['home-page'],
  post: ['posts', 'latest-posts'],
  lawyer: ['lawyers', 'partners'],
  practice: ['practices', 'services'],
  industry: ['industries', 'services'],
  category: ['categories', 'posts'],
  author: ['authors', 'posts'],
  blinkdraft: ['blinkdraft', 'home-page'],
  generalInfo: ['general-info', 'navigation', 'footer'],
  testimonial: ['testimonials', 'services'],
  foreignDesk: ['foreign-desks', 'services'],
} as const;

/**
 * Get cache tags for a document type
 * @param documentType - The document type
 * @returns Array of cache tags
 */
export function getCacheTagsForDocumentType(documentType: string): string[] {
  const tags =
    DOCUMENT_TYPE_CACHE_TAGS[
      documentType as keyof typeof DOCUMENT_TYPE_CACHE_TAGS
    ];
  return tags ? [...tags] : ['content'];
}
