# Category Count Update Fix (Including Parent Categories)

## Problems Solved

### Problem 1: GROQ Syntax Error on Deletion

When deleting a post in Sanity, the following errors occurred:

```
Error: GROQ query parse error:
> 1 | *[_type == "post" && _id == $postId][0]{ 'categories': categories[]{'_ref'} }
    |                                                                    ^^^^^^
    Attribute or a string key expected
```

Additionally, category counts were not being updated properly on post deletion because the post no longer existed to query.

### Problem 2: Parent Category Counts Not Updating

When a post was added/updated/deleted with a child category, the **parent categories** were not getting their counts updated.

**Example:**
```
Category Hierarchy:
- Blog (parent) - count: 100
  └─ Real Estate (child) - count: 25

When post added to "Real Estate":
✅ Real Estate count updated: 25 → 26
❌ Blog count stayed at: 100 (should be 101)
```

## Root Causes

1. **GROQ Syntax Error**: `categories[]{'_ref'}` is invalid syntax
   - Can't use object projection `{}` inside array dereference `[]`
   - Correct syntax: `categories[]._ref`

2. **Deletion Logic Flaw**: When a post is deleted, querying it returns `null`, preventing category count updates

3. **Missing Parent Updates**: The update function only updated directly referenced categories, not their parents recursively

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
**File:** `src/lib/utils/category-count.ts`

**Added helper function (lines 9-41):**
```typescript
async function getAllParentCategoryIds(
  categoryId: string,
  visited: Set<string> = new Set()
): Promise<string[]>
```
- Recursively fetches all parent category IDs for a given category
- Prevents infinite loops with visited set
- Handles multi-level hierarchies (grandparents, great-grandparents, etc.)

**Modified main function (lines 75-146):**
- Added `categoryRefsFromWebhook` parameter
- Prioritizes webhook category data over database query
- Falls back to database query if webhook data not available
- Handles deletion case (webhook provides categories even when post is deleted)
- **NEW:** Recursively gets all parent categories for each direct category
- **NEW:** Deduplicates parent IDs (if post has multiple children of same parent)
- **NEW:** Updates all categories (direct + parents) in parallel

**File:** `src/app/api/revalidate/route.ts` (line 144)

```typescript
// Pass webhook categories to update function
updateCategoriesForPost(body._id, body.categories)
```

## How It Works Now

### On Post Create with Child Category:
```
Category Hierarchy:
- Blog (parent)
  └─ Real Estate (child)

Post created with "Real Estate":
```

1. Webhook fires with `categories: ["real-estate-id"]`
2. Function gets direct category: `["real-estate-id"]`
3. Function recursively fetches parents: `["blog-id"]`
4. Deduplicates: `["real-estate-id", "blog-id"]`
5. Updates counts for both ✅

**Logs:**
```
⟳ Updating counts for 1 direct categories + 1 parent categories from post abc-123
✓ Updated count for category real-estate-id: 26 posts
✓ Updated count for category blog-id: 101 posts
✓ Successfully updated 2 category counts (1 direct + 1 parents)
```

### On Post with Multiple Child Categories (Same Parent):
```
Category Hierarchy:
- Blog (parent)
  ├─ Real Estate (child)
  └─ Corporate Law (child)

Post created with both children:
```

1. Webhook: `categories: ["real-estate-id", "corporate-law-id"]`
2. Direct categories: `["real-estate-id", "corporate-law-id"]`
3. Get parents for each: Both have `["blog-id"]`
4. Deduplicate: `["real-estate-id", "corporate-law-id", "blog-id"]`
5. Updates all 3 (Blog only updated once) ✅

### On Post with Multi-Level Hierarchy:
```
Knowledge (grandparent)
└─ Blog (parent)
   └─ Real Estate (child)

Post created with "Real Estate":
```

1. Webhook: `categories: ["real-estate-id"]`
2. Get parents: `["blog-id"]`
3. Get grandparents: `["knowledge-id"]`
4. All categories: `["real-estate-id", "blog-id", "knowledge-id"]`
5. Updates all 3 levels ✅

### On Post Delete:
1. Webhook fires with categories from deleted post (captured before deletion)
2. Post query returns `null` (expected - post is deleted)
3. Function uses webhook categories (fallback)
4. Gets all parents recursively
5. Decrements count for all categories (direct + parents) ✅
6. **No GROQ parse errors** ✅

## Testing

After deploying these changes, test each scenario:

### Test 1: Create Post with Child Category
1. Create post with "Real Estate" (child of "Blog")
2. Check Vercel logs:
   ```
   ✓ Using 1 category refs from webhook
   ⟳ Updating counts for 1 direct categories + 1 parent categories
   ✓ Successfully updated 2 category counts (1 direct + 1 parents)
   ```
3. Verify both "Real Estate" and "Blog" counts increased ✅

### Test 2: Multiple Children of Same Parent
1. Create post with ["Real Estate", "Corporate Law"] (both children of "Blog")
2. Check logs: `Updating counts for 2 direct categories + 1 parent categories`
3. Verify all 3 counts increased (Blog only updated once) ✅

### Test 3: Multi-Level Hierarchy
1. Create post with category that has grandparent
2. Check logs: Shows all levels being updated
3. Verify child, parent, and grandparent all updated ✅

### Test 4: Update Post Categories
1. Update post (add/remove categories)
2. Check logs: All affected categories (+ parents) updated
3. Verify counts are correct ✅

### Test 5: Delete Post
1. Delete post with child categories
2. Check logs:
   ```
   ✓ Using N category refs from webhook
   ⟳ Updating counts for N direct categories + M parent categories
   ```
3. Verify all counts (children + parents) decreased ✅
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

## Performance Considerations

- **API Calls**: For each direct category, fetches its parents (1 extra call per category)
- **Deduplication**: Uses `Set` to avoid duplicate updates (e.g., multiple children of same parent)
- **Parallel Updates**: All category counts updated in parallel (not sequential)
- **Async Background**: Runs asynchronously, doesn't block webhook response
- **Circular Reference Protection**: `visited` Set prevents infinite loops

**Example Performance:**
- Post with 1 child category → 2 API calls (child + fetch parents) + 2 count updates
- Post with 2 children (same parent) → 3 API calls + 3 count updates (parent deduplicated)
- Post with 3-level hierarchy → 3 API calls (child + parent + grandparent) + 3 count updates

## Files Modified

- ✅ `src/lib/utils/category-count.ts` - Fixed GROQ syntax, added webhook fallback, added recursive parent updates
- ✅ `src/app/api/revalidate/route.ts` - Updated interface, passed categories parameter
- ✅ `WEBHOOK_SETUP_GUIDE.md` - Updated Webhook 1 projection
- ✅ `WEBHOOK_QUICK_REFERENCE.md` - Updated Webhook 1 projection
- ✅ `CATEGORY_COUNT_FIX.md` - This document (updated)

## Related Documentation

- `CATEGORY_COUNT_SETUP.md` - Original category count setup
- `WEBHOOK_SETUP_GUIDE.md` - Complete webhook configuration
- `CACHING_ARCHITECTURE.md` - Overall caching strategy
