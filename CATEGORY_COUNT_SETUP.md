# 📊 Category Count Auto-Update Setup

## Overview

This document explains how category post counts are automatically maintained in your Sanity CMS.

## How It Works

### Automatic Updates via Webhook

When a post is created, updated, or deleted in Sanity:

1. **Sanity Webhook 1** triggers and sends post data to `/api/revalidate`
2. The webhook includes the post's `_id` in the payload
3. `/api/revalidate` automatically triggers category count updates
4. All categories referenced by the post get their counts recalculated
5. Updates happen asynchronously (doesn't slow down cache revalidation)

### Category Schema

The `count` field in the category schema ([src/sanity/schemaTypes/posts/categories/index.ts:30](src/sanity/schemaTypes/posts/categories/index.ts#L30)):

```typescript
defineField({
  name: 'count',
  type: 'number',
  readOnly: true,
  description: 'Number of posts in the category (auto-updated)',
})
```

**Key points:**
- `readOnly: true` - prevents manual editing
- Auto-updated when posts change
- Shows in category preview as `Category Name (X posts)`

## Setup Instructions

### 1. Update Webhook 1 Projection

**IMPORTANT:** Webhook 1 must include `_id` in its projection for this to work.

In Sanity Studio → API → Webhooks → "Posts & Content Updates":

**Projection (GROQ):**
```groq
{
  "_type": _type,
  "_id": _id,
  "slug": slug.current,
  "categorySlug": select(
    _type == "post" => categories[0]->slug.current,
    _type == "category" => slug.current
  )
}
```

### 2. Initialize Existing Categories (One-Time)

If you have existing categories with zero/incorrect counts, run this command:

```bash
curl -X POST http://localhost:3000/api/webhooks/postCount/all
```

Or in production:
```bash
curl -X POST https://bdk-two.vercel.app/api/webhooks/postCount/all
```

This will:
- Count posts for ALL categories
- Update all category `count` fields
- Process in batches of 10 to avoid API overload

**Expected response:**
```json
{
  "success": true,
  "updatedCount": 15
}
```

## Technical Implementation

### Files Involved

1. **[src/lib/utils/category-count.ts](src/lib/utils/category-count.ts)** - Count update utilities
   - `updateCategoryCount(categoryId)` - Update single category
   - `updateCategoriesForPost(postId)` - Update all categories for a post
   - `updateAllCategoryCounts()` - Bulk update all categories

2. **[src/app/api/revalidate/route.ts](src/app/api/revalidate/route.ts)** - Webhook handler
   - Receives Sanity webhooks
   - Triggers cache revalidation
   - Calls `updateCategoriesForPost()` for post changes

3. **[src/app/api/webhooks/postCount/all/route.ts](src/app/api/webhooks/postCount/all/route.ts)** - Bulk update endpoint
   - For manual/one-time bulk updates
   - Useful for initialization or maintenance

### Update Flow

```
┌─────────────┐
│ Post Change │
│  in Sanity  │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Webhook 1      │
│  Triggers       │
└──────┬──────────┘
       │
       ▼
┌──────────────────────────┐
│  /api/revalidate         │
│  1. Revalidate cache     │
│  2. Update category      │
│     counts (async)       │
└──────┬───────────────────┘
       │
       ▼
┌───────────────────────────────────┐
│  updateCategoriesForPost()        │
│  1. Fetch post's categories       │
│  2. Count posts per category      │
│  3. Update category documents     │
└───────────────────────────────────┘
```

### Why Async Updates?

Category count updates run **asynchronously** (non-blocking):

```typescript
// Don't await - let this run in background
updateCategoriesForPost(body._id).catch((error) => {
  console.error('Failed to update category counts:', error);
});
```

**Benefits:**
- ✅ Webhook responds immediately
- ✅ Cache revalidation isn't delayed
- ✅ Count updates happen in background
- ✅ Errors are logged but don't break the webhook

## Monitoring & Logs

### Successful Update Logs

When a post is updated, you'll see logs like:

```
Revalidating tags: posts, global-featured-posts, home-page-data
⟳ Updating counts for 2 categories from post abc123
✓ Updated count for category cat-456: 5 posts
✓ Updated count for category cat-789: 3 posts
✓ Successfully updated 2 category counts
```

### Error Logs

If something goes wrong:

```
✗ Failed to update count for category cat-456: <error details>
Failed to update category counts for post abc123: <error details>
```

## Testing

### Test Automatic Updates

1. **Create a new post** in Sanity Studio with categories
2. Check Vercel logs or local console for update logs
3. Go to **Content → Categories** in Sanity Studio
4. Verify the category count increased

### Test Category Change

1. **Edit an existing post** and change its categories
2. Check logs - should update both old and new categories
3. Verify counts in Sanity Studio

### Test Post Deletion

1. **Delete a post** from Sanity Studio
2. Check logs - should decrease category counts
3. Verify counts decreased correctly

## Troubleshooting

### Category count is zero/wrong

**Solutions:**
1. Check if Webhook 1 includes `_id` in projection (see Setup step 1)
2. Run bulk update: `curl -X POST /api/webhooks/postCount/all`
3. Check Vercel logs for errors during webhook processing

### Updates not triggering

**Check:**
1. Webhook 1 is active in Sanity dashboard
2. Webhook delivery succeeded (check Sanity webhook history)
3. `SANITY_WEBHOOK_SECRET` is set correctly
4. Logs show the webhook was received at `/api/revalidate`

### Partial updates (some categories update, others don't)

**Possible causes:**
1. Network issues - webhook may have timed out
2. Invalid category references in post
3. Check logs for specific category update failures

## Manual Operations

### Update Single Category

```typescript
import { updateCategoryCount } from '@/src/lib/utils/category-count';

await updateCategoryCount('category-id-here');
```

### Update All Categories for a Post

```typescript
import { updateCategoriesForPost } from '@/src/lib/utils/category-count';

await updateCategoriesForPost('post-id-here');
```

### Bulk Update All Categories

Via API:
```bash
curl -X POST https://your-domain.com/api/webhooks/postCount/all
```

Via code:
```typescript
import { updateAllCategoryCounts } from '@/src/lib/utils/category-count';

const updatedCount = await updateAllCategoryCounts();
console.log(`Updated ${updatedCount} categories`);
```

## Performance Considerations

- **Async execution**: Count updates don't block webhook responses
- **Batch processing**: Bulk updates process 10 categories at a time
- **Efficient queries**: Uses GROQ `count()` function for optimal performance
- **Minimal impact**: Only affected categories are updated, not all categories

## Future Enhancements

Possible improvements:
- Add count validation checks
- Create Sanity Studio action for manual recalculation
- Add category count history/audit trail
- Implement count caching at the application level

---

**Last Updated:** 2025-11-03
**Version:** 1.0.0
