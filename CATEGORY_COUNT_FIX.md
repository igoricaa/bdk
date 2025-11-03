# Category Count Update Fix

## Problem

When deleting a post in Sanity, the following errors occurred:

```
Error: GROQ query parse error:
> 1 | *[_type == "post" && _id == $postId][0]{ 'categories': categories[]{'_ref'} }
    |                                                                    ^^^^^^
    Attribute or a string key expected
```

Additionally, category counts were not being updated properly on post deletion because the post no longer existed to query.

## Root Causes

1. **GROQ Syntax Error**: `categories[]{'_ref'}` is invalid syntax
   - Can't use object projection `{}` inside array dereference `[]`
   - Correct syntax: `categories[]._ref`

2. **Deletion Logic Flaw**: When a post is deleted, querying it returns `null`, preventing category count updates

## Solution

### 1. Fixed GROQ Syntax Error
**File:** `src/lib/utils/category-count.ts` (line 53)

```groq
// OLD (broken):
categories[]{'_ref'}

// NEW (fixed):
categories[]._ref
```

### 2. Added Webhook Category Data
**Files:** `WEBHOOK_SETUP_GUIDE.md`, `WEBHOOK_QUICK_REFERENCE.md`

Updated Webhook 1 projection to include category refs:

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

### 3. Updated TypeScript Interfaces
**File:** `src/app/api/revalidate/route.ts` (line 22)

```typescript
interface RevalidateBody {
  _type: string;
  _id?: string;
  slug?: string;
  categorySlug?: string;
  oldCategorySlug?: string;
  locale?: string;
  categories?: string[]; // NEW: Category refs from webhook
}
```

### 4. Modified Category Update Logic
**File:** `src/lib/utils/category-count.ts` (lines 35-65)

- Added `categoryRefsFromWebhook` parameter
- Prioritizes webhook category data over database query
- Falls back to database query if webhook data not available
- Handles deletion case (webhook provides categories even when post is deleted)

**File:** `src/app/api/revalidate/route.ts` (line 144)

```typescript
// Pass webhook categories to update function
updateCategoriesForPost(body._id, body.categories)
```

## How It Works Now

### On Post Create:
1. Webhook fires with `categories: ["cat-id-1", "cat-id-2"]`
2. Function uses webhook categories
3. Increments count for all categories ✅

### On Post Update:
1. Webhook fires with current categories
2. Function uses webhook categories
3. Updates counts for all current categories ✅

### On Post Delete:
1. Webhook fires with categories from deleted post (captured before deletion)
2. Post query returns `null` (expected - post is deleted)
3. Function uses webhook categories (fallback)
4. Decrements count for all categories ✅

## Testing

After deploying these changes, test each scenario:

### Test Create:
1. Create a new post with 2 categories
2. Check Vercel logs: `✓ Using 2 category refs from webhook`
3. Verify both category counts increased

### Test Update:
1. Update a post (add/remove categories)
2. Check logs: Category counts updated
3. Verify counts are correct

### Test Delete:
1. Delete a post with categories
2. Check logs: `✓ Using N category refs from webhook`
3. Verify category counts decreased
4. **No GROQ parse errors** ✅

## Post-Implementation Steps

1. ✅ Update code (complete)
2. ⚠️ Update Webhook 1 in Sanity Studio:
   - Go to API → Webhooks → "Posts & Content Updates"
   - Update projection with new code from `WEBHOOK_QUICK_REFERENCE.md`
   - Save webhook
3. ⚠️ Deploy to Vercel
4. ⚠️ Test create/update/delete operations
5. ⚠️ Verify no errors in logs

## Files Modified

- ✅ `src/lib/utils/category-count.ts` - Fixed GROQ syntax, added webhook fallback
- ✅ `src/app/api/revalidate/route.ts` - Updated interface, passed categories parameter
- ✅ `WEBHOOK_SETUP_GUIDE.md` - Updated Webhook 1 projection
- ✅ `WEBHOOK_QUICK_REFERENCE.md` - Updated Webhook 1 projection
- ✅ `CATEGORY_COUNT_FIX.md` - This document (new)

## Related Documentation

- `CATEGORY_COUNT_SETUP.md` - Original category count setup
- `WEBHOOK_SETUP_GUIDE.md` - Complete webhook configuration
- `CACHING_ARCHITECTURE.md` - Overall caching strategy
