# 📡 Sanity Webhook Setup Guide

## Overview

This guide provides step-by-step instructions for configuring 4 specialized webhooks in Sanity CMS to ensure real-time cache invalidation for your Next.js application.

**Total Webhooks Limit:** 4/4 (Maximum allowed by Sanity)

---

## Prerequisites

1. ✅ Sanity Studio access with admin permissions
2. ✅ `SANITY_WEBHOOK_SECRET` environment variable set in `.env.local` and Vercel
3. ✅ Updated `/api/revalidate` route (already done ✓)
4. ✅ Production deployment URL: `https://bdk-two.vercel.app`

---

## Webhook Configuration

### **Webhook 1: Posts & Content** 🔴 (HIGHEST PRIORITY)

**Purpose:** Real-time updates for blog posts, newsroom articles, insights, publications, and categories.

**Update Frequency:** ~10-15 updates/month

#### Configuration

| Field | Value |
|-------|-------|
| **Name** | `Posts & Content Updates` |
| **URL** | `https://bdk-two.vercel.app/api/revalidate` |
| **Method** | `POST` |
| **On Create** | ✅ Enabled |
| **On Update** | ✅ Enabled |
| **On Delete** | ✅ Enabled |

#### Filter (GROQ)
```groq
_type in ['post', 'category', 'author']
```

#### Projection (GROQ)
```groq
{
  "_type": _type,
  "_id": _id,
  "slug": slug.current,
  "categorySlug": select(
    _type == "post" => categories[0]->slug.current,
    _type == "category" => slug.current
  ),
  "categories": select(
    _type == "post" => categories[]._ref,
    null
  )
}
```

#### HTTP Headers
```
Content-Type: application/json
```

#### Secret
- Use the same secret from your `SANITY_WEBHOOK_SECRET` environment variable
- This should match between Sanity, your `.env.local`, and Vercel environment variables

---

### **Webhook 2: People & Legal Team** 🟡

**Purpose:** Updates for lawyers, team members, and team categorization.

**Update Frequency:** ~3-5 updates/month

#### Configuration

| Field | Value |
|-------|-------|
| **Name** | `Lawyers & Team Structure` |
| **URL** | `https://bdk-two.vercel.app/api/revalidate` |
| **Method** | `POST` |
| **On Create** | ✅ Enabled |
| **On Update** | ✅ Enabled |
| **On Delete** | ✅ Enabled |

#### Filter (GROQ)
```groq
_type in ['lawyer', 'lawyerCategory']
```

#### Projection (GROQ)
```groq
{
  "_type": _type,
  "slug": slug.current
}
```

#### HTTP Headers
```
Content-Type: application/json
```

#### Secret
- Same as Webhook 1

---

### **Webhook 3: Services & Business** 🟡

**Purpose:** Updates for practices, industries, and foreign desks.

**Update Frequency:** ~2-4 updates/month

#### Configuration

| Field | Value |
|-------|-------|
| **Name** | `Services & Expertise` |
| **URL** | `https://bdk-two.vercel.app/api/revalidate` |
| **Method** | `POST` |
| **On Create** | ✅ Enabled |
| **On Update** | ✅ Enabled |
| **On Delete** | ✅ Enabled |

#### Filter (GROQ)
```groq
_type in ['practice', 'industry', 'foreignDesk']
```

#### Projection (GROQ)
```groq
{
  "_type": _type,
  "slug": slug.current
}
```

#### HTTP Headers
```
Content-Type: application/json
```

#### Secret
- Same as Webhook 1

---

### **Webhook 4: Site Config & References** 🟢

**Purpose:** Updates for singleton pages, site configuration, office locations, job postings, and forms.

**Update Frequency:** ~1-2 updates/month

#### Configuration

| Field | Value |
|-------|-------|
| **Name** | `Site Structure & Config` |
| **URL** | `https://bdk-two.vercel.app/api/revalidate` |
| **Method** | `POST` |
| **On Create** | ✅ Enabled |
| **On Update** | ✅ Enabled |
| **On Delete** | ✅ Enabled |

#### Filter (GROQ)
```groq
_type in [
  'homePage',
  'peoplePage',
  'aboutUsPage',
  'careerPage',
  'blinkdraft',
  'generalInfo',
  'privacyNotice',
  'cookiePolicy',
  'country',
  'openPosition',
  'subscriptionForm'
]
```

#### Projection (GROQ)
```groq
{
  "_type": _type,
  "locale": language
}
```

#### HTTP Headers
```
Content-Type: application/json
```

#### Secret
- Same as Webhook 1

---

## Setup Instructions

### Step 1: Access Sanity Webhooks

1. Log in to [Sanity Studio](https://www.sanity.io/manage)
2. Select your project
3. Navigate to **API** → **Webhooks** in the left sidebar

### Step 2: Delete Old Webhooks (if needed)

If you have existing webhooks that need to be replaced:

1. Click on the old webhook
2. Scroll to the bottom
3. Click **Delete webhook**
4. Confirm deletion

**IMPORTANT:** Make sure you have your secret backed up before deleting!

### Step 3: Create Webhook 1 (Posts & Content)

1. Click **Create webhook**
2. Fill in the configuration from the table above
3. Copy and paste the Filter and Projection exactly as shown
4. Add your secret
5. Click **Create**
6. Test the webhook (see Testing section below)

### Step 4: Repeat for Webhooks 2, 3, 4

Follow the same process for each webhook using their respective configurations.

---

## Verification Checklist

After creating all 4 webhooks, verify:

- [ ] All 4 webhooks are listed in Sanity dashboard
- [ ] Each webhook has a green "Active" status
- [ ] Each webhook has the correct URL
- [ ] Each webhook has the correct filter and projection
- [ ] Secret is set for all webhooks
- [ ] `SANITY_WEBHOOK_SECRET` is set in Vercel environment variables

---

## Testing Procedures

### Test Webhook 1 (Posts)

1. **Create a new post** in Sanity Studio
2. Wait 2-3 seconds
3. Check your **Next.js application logs** in Vercel:
   - Look for: `"Revalidating tags: posts, global-featured-posts, home-page-data, post-{slug}"`
4. Visit the home page and verify the new post appears in featured posts
5. Visit `/blog` or relevant category page and verify the post is listed

### Test Webhook 2 (Lawyers)

1. **Update a lawyer's bio** in Sanity Studio
2. Wait 2-3 seconds
3. Check logs for: `"Revalidating tags: lawyers, people-page-data, lawyer-{slug}"`
4. Visit `/people` and verify the change
5. Visit `/people/{lawyer-slug}` and verify the updated bio

### Test Webhook 3 (Services)

1. **Update a practice description** in Sanity Studio
2. Wait 2-3 seconds
3. Check logs for: `"Revalidating tags: practices, services, home-page-data, practice-{slug}"`
4. Visit `/practices/{practice-slug}` and verify the change
5. Visit home page and verify services section updated (if displayed there)

### Test Webhook 4 (Site Config)

1. **Update generalInfo** (e.g., change a footer link) in Sanity Studio
2. Wait 2-3 seconds
3. Check logs for: `"Revalidating tags: general-info"`
4. Visit any page with a footer and verify the change
5. Alternatively, update an **office location** (country document):
   - Check logs for: `"Revalidating tags: general-info"`
   - Verify footer shows updated office info

---

## Troubleshooting

### Webhook Not Firing

**Symptoms:** Changes in Sanity don't appear on the site

**Checks:**
1. Verify webhook is "Active" in Sanity dashboard
2. Check Webhook History in Sanity for delivery status
3. Verify `SANITY_WEBHOOK_SECRET` matches between:
   - Sanity webhook configuration
   - `.env.local` (for local testing)
   - Vercel environment variables (for production)
4. Check Vercel logs for errors in `/api/revalidate` endpoint

### Invalid Signature Error

**Symptoms:** Logs show `"Invalid signature"` error

**Solution:**
1. Regenerate your `SANITY_WEBHOOK_SECRET`
2. Update it in Sanity webhook configuration
3. Update it in Vercel environment variables
4. Update it in `.env.local`
5. Redeploy your application

### Partial Updates

**Symptoms:** Some pages update, others don't

**Checks:**
1. Verify the correct tags are being revalidated (check logs)
2. Ensure the filter in the webhook matches the document type
3. Verify projection is providing the necessary data (slug, locale, etc.)

### Timeout Errors

**Symptoms:** Webhook delivery times out

**Solution:**
1. Check if `/api/revalidate` endpoint is responding
2. Reduce the number of tags being revalidated in a single webhook call
3. Check Vercel function logs for performance issues

---

## Webhook Delivery History

To view webhook delivery history in Sanity:

1. Go to **API** → **Webhooks**
2. Click on a specific webhook
3. Click **View deliveries**
4. Check for:
   - ✅ Green checkmarks (successful)
   - ❌ Red X's (failed)
5. Click on individual deliveries to see:
   - Request payload
   - Response status
   - Error messages (if any)

---

## Advanced Configuration

### Custom Webhooks for Staging

If you have a staging environment:

1. Duplicate each webhook
2. Change the URL to your staging URL
3. Add a suffix to the name (e.g., "Posts & Content Updates - STAGING")
4. Keep the same filters and projections

### Webhook Retry Logic

Sanity automatically retries failed webhooks:
- **First retry:** After 1 minute
- **Second retry:** After 5 minutes
- **Third retry:** After 15 minutes
- **Final retry:** After 1 hour

**Total retries:** 4 attempts over ~1.5 hours

---

## Best Practices

### ✅ DO

- Keep webhook secrets secure and rotated periodically
- Monitor webhook delivery success rates
- Test webhooks after any deployment
- Keep filters as specific as possible
- Document any custom webhook configurations

### ❌ DON'T

- Share webhook secrets in code or public repositories
- Create overlapping webhooks (same document types in multiple webhooks)
- Use overly broad filters that trigger unnecessary revalidations
- Delete webhooks without backing up their configuration

---

## Environment Variables

Ensure these are set in all environments:

### `.env.local` (Local Development)
```env
SANITY_WEBHOOK_SECRET=your-secret-here
```

### Vercel (Production & Preview)
1. Go to your project in Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add:
   - **Key:** `SANITY_WEBHOOK_SECRET`
   - **Value:** Your secret
   - **Environments:** Production, Preview, Development (check all)
4. Click **Save**
5. Redeploy if necessary

---

## Coverage Summary

| Document Type | Webhook | Update Frequency |
|---------------|---------|------------------|
| post | 1 | High (~10-15/month) |
| category | 1 | Medium (~3-5/month) |
| author | 1 | Low (~1-2/month) |
| lawyer | 2 | Medium (~3-5/month) |
| lawyerCategory | 2 | Low (~1-2/month) |
| practice | 3 | Medium (~2-4/month) |
| industry | 3 | Medium (~2-4/month) |
| foreignDesk | 3 | Low (~1-2/month) |
| homePage | 4 | Low (~1/month) |
| peoplePage | 4 | Low (~1/month) |
| aboutUsPage | 4 | Low (~1/month) |
| careerPage | 4 | Low (~1/month) |
| blinkdraft | 4 | Low (~1/month) |
| generalInfo | 4 | Low (~1/month) |
| privacyNotice | 4 | Very Low (~1/quarter) |
| cookiePolicy | 4 | Very Low (~1/quarter) |
| country | 4 | Very Low (~1/quarter) |
| openPosition | 4 | Medium (~2-3/month) |
| subscriptionForm | 4 | Low (~1/month) |

**Total:** 19 document types covered by 4 webhooks

---

## Support

If you encounter issues:

1. Check Sanity webhook delivery history
2. Check Vercel function logs
3. Verify environment variables are set correctly
4. Test locally using the `/api/test-revalidate` endpoint
5. Review this guide for configuration errors

---

**Last Updated:** $(date +%Y-%m-%d)

**Version:** 1.0.0
