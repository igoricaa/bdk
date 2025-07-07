# Sanity Webhook Setup Guide

## 1. Environment Configuration

Add the following to your `.env.local` file:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_READ_TOKEN="your-sanity-api-token"

# Webhook Configuration
# Generate a secure random string for webhook verification
# You can use: openssl rand -hex 32
SANITY_WEBHOOK_SECRET="your-webhook-secret-here"

# Next.js Configuration
NODE_ENV="development"
```

## 2. Generate Webhook Secret

Generate a secure webhook secret using one of these methods:

### Option 1: Using OpenSSL (Recommended)
```bash
openssl rand -hex 32
```

### Option 2: Using Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Option 3: Online Generator
Visit https://generate.plus/en/base64 or similar secure generator.

## 3. Configure Sanity Webhook

### Step 1: Access Sanity Management
1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to "API" tab
4. Click on "Webhooks"

### Step 2: Create Webhook
1. Click "Create webhook"
2. Fill in the details:
   - **Name**: `Next.js Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Dataset**: `production` (or your target dataset)
   - **HTTP method**: `POST`
   - **API version**: `v2021-06-07` (or latest)
   - **Secret**: Use the webhook secret you generated above

### Step 3: Configure Filters (Optional)
Add filters to only trigger for specific document types:
```groq
_type in ["post", "lawyer", "practice", "industry", "homePage", "blinkdraft"]
```

## 4. Test Your Webhook

### Option 1: Using the Test Endpoint (Development)
```bash
# Test revalidate all
curl -X POST http://localhost:3000/api/test-revalidate \
  -H "Content-Type: application/json" \
  -d '{"action": "revalidate-all"}'

# Test specific tags
curl -X POST http://localhost:3000/api/test-revalidate \
  -H "Content-Type: application/json" \
  -d '{"tags": ["home-page", "posts"], "paths": ["/"]}'
```

### Option 2: Trigger from Sanity Studio
1. Edit any document in your Sanity Studio
2. Save the changes
3. Check your Next.js application logs for webhook processing messages

### Option 3: Manual Webhook Test
```bash
# Test the webhook endpoint directly
curl -X POST http://localhost:3000/api/revalidate \
  -H "Content-Type: application/json" \
  -H "sanity-webhook-signature: your-signature-here" \
  -d '{"_type": "post", "_id": "test-id", "slug": {"current": "test-slug"}}'
```

## 5. Webhook Payload Examples

### Post Document
```json
{
  "_type": "post",
  "_id": "post-123",
  "_rev": "abc123",
  "slug": {
    "current": "my-blog-post"
  },
  "title": "My Blog Post",
  "categories": ["newsroom"]
}
```

### Home Page Document
```json
{
  "_type": "homePage",
  "_id": "homepage-123",
  "_rev": "def456",
  "hero": {
    "heading": "Welcome to Our Site"
  }
}
```

### Lawyer Document
```json
{
  "_type": "lawyer",
  "_id": "lawyer-123",
  "_rev": "ghi789",
  "slug": {
    "current": "john-doe"
  },
  "name": "John Doe",
  "role": "Partner"
}
```

## 6. Cache Tags Reference

The webhook system automatically maps document types to cache tags:

| Document Type | Cache Tags | Revalidated Paths |
|---------------|------------|-------------------|
| `homePage` | `home-page` | `/` |
| `post` | `posts`, `latest-posts`, `newsroom` | `/bdknowledge`, `/bdknowledge/[slug]` |
| `lawyer` | `lawyers`, `partners` | `/people`, `/people/[slug]` |
| `practice` | `practices`, `services` | `/practices/[slug]` |
| `industry` | `industries`, `services` | - |
| `category` | `categories`, `posts` | - |
| `author` | `authors`, `posts` | - |
| `blinkdraft` | `blinkdraft`, `home-page` | - |
| `generalInfo` | `general-info`, `navigation`, `footer` | `/` |
| `testimonial` | `testimonials`, `services` | - |
| `foreignDesk` | `foreign-desks`, `services` | - |

## 7. Security Features

- **Signature Verification**: Webhooks are verified using HMAC SHA-256
- **Environment-based**: Different behavior for development vs production
- **Error Handling**: Comprehensive error logging and graceful failures
- **Rate Limiting**: Built-in protection against webhook spam

## 8. Monitoring and Debugging

### Check Webhook Logs
```bash
# In your Next.js application logs, look for:
- "Processing webhook for [type] document: [id]"
- "Revalidating tag: [tag]"
- "Revalidating path: [path]"
```

### Common Issues

1. **Webhook not firing**: Check Sanity webhook configuration and URL
2. **Signature mismatch**: Verify webhook secret matches in both places
3. **No revalidation**: Check if tags match your `sanityFetch` implementation
4. **CORS issues**: Ensure your deployment allows POST requests to `/api/revalidate`

## 9. Production Deployment

### Vercel
1. Add environment variables in Vercel dashboard
2. Ensure webhook URL uses your production domain
3. Test after deployment

### Other Platforms
1. Configure environment variables in your hosting platform
2. Update webhook URL in Sanity management
3. Verify webhook endpoint is accessible

## 10. Performance Monitoring

Monitor these metrics after webhook setup:
- **Cache hit rate**: Should increase significantly
- **Page load times**: Should improve due to cached content
- **Sanity API calls**: Should decrease due to effective caching
- **Build times**: Should remain fast with ISR

## Troubleshooting

If webhooks aren't working:

1. **Check Environment Variables**:
   ```bash
   echo $SANITY_WEBHOOK_SECRET
   ```

2. **Verify Webhook URL**:
   ```bash
   curl -X GET https://your-domain.com/api/revalidate
   ```

3. **Test Local Webhook**:
   ```bash
   curl -X POST http://localhost:3000/api/revalidate \
     -H "Content-Type: application/json" \
     -d '{"_type": "post", "_id": "test"}'
   ```

4. **Check Sanity Webhook Logs**:
   Visit Sanity management → Webhooks → View logs 