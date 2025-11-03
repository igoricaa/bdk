# 🧪 Webhook Testing Guide

## Overview

This guide provides comprehensive testing procedures to verify that your Sanity webhooks are working correctly and triggering proper cache invalidation.

---

## Pre-Testing Checklist

Before testing, ensure:

- [ ] All 4 webhooks are configured in Sanity (see `WEBHOOK_SETUP_GUIDE.md`)
- [ ] `SANITY_WEBHOOK_SECRET` is set in Vercel environment variables
- [ ] Latest code is deployed to production
- [ ] You have access to Vercel logs
- [ ] You have access to Sanity Studio

---

## Testing Strategy

### Testing Approach

1. **Create/Update/Delete** a document in Sanity
2. **Wait** 2-3 seconds for webhook to fire
3. **Check logs** in Vercel for revalidation confirmation
4. **Verify** content update on the website
5. **Repeat** for each webhook and document type

---

## Webhook 1: Posts & Content

### Test 1.1: Create a New Post

**Document Type:** `post`

**Steps:**
1. Go to Sanity Studio
2. Navigate to **Content** → **Posts**
3. Click **Create new post**
4. Fill in:
   - Title: "Webhook Test Post [timestamp]"
   - Slug: "webhook-test-[timestamp]"
   - Status: "Publish"
   - Date: Today's date
   - Category: Select "Blog" or "Newsroom"
   - Content: Add some test content
5. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: posts, global-featured-posts, home-page-data, post-webhook-test-[timestamp], posts-by-category-blog, nested-categories-blog
```

**Verification:**
- [ ] Visit home page → New post appears in featured posts section
- [ ] Visit `/blog` → New post appears in blog listing
- [ ] Visit `/webhook-test-[timestamp]` → Post page loads correctly

**Expected Time:** Within 5 seconds

---

### Test 1.2: Update an Existing Post

**Document Type:** `post`

**Steps:**
1. Open the test post created in Test 1.1
2. Change the title to "Webhook Test Post [timestamp] - UPDATED"
3. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: posts, global-featured-posts, home-page-data, post-webhook-test-[timestamp], posts-by-category-blog, nested-categories-blog
```

**Verification:**
- [ ] Visit `/webhook-test-[timestamp]` → Title is updated
- [ ] Visit `/blog` → Updated title shows in listing
- [ ] Visit home page → Updated title shows in featured posts (if still featured)

**Expected Time:** Within 5 seconds

---

### Test 1.3: Change Post Category

**Document Type:** `post`

**Steps:**
1. Open the test post
2. Change category from "Blog" to "Newsroom"
3. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: posts, global-featured-posts, home-page-data, post-webhook-test-[timestamp], posts-by-category-newsroom, nested-categories-newsroom, posts-by-category-blog, nested-categories-blog
```

**Verification:**
- [ ] Visit `/blog` → Post no longer appears
- [ ] Visit `/newsroom` → Post now appears
- [ ] Category navigation updates correctly

**Expected Time:** Within 5 seconds

---

### Test 1.4: Create a New Category

**Document Type:** `category`

**Steps:**
1. Navigate to **Settings** → **Categories**
2. Click **Create new category**
3. Fill in:
   - Name: "Webhook Test Category"
   - Slug: "webhook-test-category"
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: categories, posts
```

**Verification:**
- [ ] Category appears in navigation menus
- [ ] Visit `/webhook-test-category` → Category page loads (even if empty)

**Expected Time:** Within 5 seconds

---

### Test 1.5: Update Author Information

**Document Type:** `author`

**Steps:**
1. Navigate to **Settings** → **Authors**
2. Select an existing author (or create a new one)
3. Update the author's name
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: authors, author-{slug}
```

**Verification:**
- [ ] Visit `/authors/{author-slug}` → Updated name displays
- [ ] Visit posts by this author → Updated name shows in author byline

**Expected Time:** Within 5 seconds

---

## Webhook 2: People & Legal Team

### Test 2.1: Update Lawyer Bio

**Document Type:** `lawyer`

**Steps:**
1. Navigate to **People** → **Lawyers**
2. Select any lawyer
3. Update their bio (add a test sentence)
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: lawyers, people-page-data, lawyer-{slug}
```

**Verification:**
- [ ] Visit `/people/{lawyer-slug}` → Updated bio displays
- [ ] Visit `/people` → Lawyer information updated in team listing
- [ ] Posts authored by this lawyer show updated info

**Expected Time:** Within 5 seconds

---

### Test 2.2: Change Lawyer Visibility

**Document Type:** `lawyer`

**Steps:**
1. Open a lawyer document
2. Toggle the "isVisible" field to `false`
3. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: lawyers, people-page-data, lawyer-{slug}
```

**Verification:**
- [ ] Visit `/people` → Lawyer no longer appears in team listing
- [ ] Visit `/people/{lawyer-slug}` → Returns 404 or "not found"

**Expected Time:** Within 5 seconds

---

### Test 2.3: Reorder Lawyers in Category

**Document Type:** `lawyerCategory`

**Steps:**
1. Navigate to **Settings** → **Lawyer Categories**
2. Select a category
3. Reorder the lawyers in the "Ordered Lawyers" field
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: lawyer-categories, lawyers
```

**Verification:**
- [ ] Visit `/people` → Lawyers appear in new order within their category
- [ ] Visit individual lawyer pages → "Other Team Members" section shows new order

**Expected Time:** Within 5 seconds

---

## Webhook 3: Services & Business

### Test 3.1: Update Practice Description

**Document Type:** `practice`

**Steps:**
1. Navigate to **Services** → **Practices**
2. Select any practice
3. Update the description
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: practices, services, home-page-data, practice-{slug}
```

**Verification:**
- [ ] Visit `/practices/{practice-slug}` → Updated description displays
- [ ] Visit home page → Services section updated (if practices are shown)

**Expected Time:** Within 5 seconds

---

### Test 3.2: Update Industry

**Document Type:** `industry`

**Steps:**
1. Navigate to **Services** → **Industries**
2. Select any industry
3. Update the title or description
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: industries, services, home-page-data, industry-{slug}
```

**Verification:**
- [ ] Visit `/industries/{industry-slug}` → Updated content displays
- [ ] Services listing pages show updated industry

**Expected Time:** Within 5 seconds

---

### Test 3.3: Update Foreign Desk

**Document Type:** `foreignDesk`

**Steps:**
1. Navigate to **Services** → **Foreign Desks**
2. Select any foreign desk
3. Update the description
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: foreign-desks, services, foreignDesk-{slug}
```

**Verification:**
- [ ] Visit `/foreign-desks/{desk-slug}` → Updated description displays
- [ ] Foreign desk listings show updated information

**Expected Time:** Within 5 seconds

---

## Webhook 4: Site Config & References

### Test 4.1: Update Home Page Configuration

**Document Type:** `homePage`

**Steps:**
1. Navigate to **Pages** → **Home Page**
2. Update any hero section text
3. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: home-page-data
```

**Verification:**
- [ ] Visit `/` → Updated hero text displays

**Expected Time:** Within 5 seconds

---

### Test 4.2: Update Office Location (Country)

**Document Type:** `country`

**Steps:**
1. Navigate to **Settings** → **Countries**
2. Select any country
3. Update the address or phone number
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: general-info
```

**Verification:**
- [ ] Visit any page with a footer → Updated office info displays
- [ ] Footer shows the new address/phone immediately

**Expected Time:** Within 5 seconds

**Note:** This is a critical test because country documents are referenced by generalInfo, which affects ALL pages via the footer.

---

### Test 4.3: Add New Open Position

**Document Type:** `openPosition`

**Steps:**
1. Navigate to **Career** → **Open Positions**
2. Click **Create new open position**
3. Fill in:
   - Title: "Test Position"
   - Location: "Belgrade"
   - Upload a test PDF
4. Click **Publish**
5. Go to **Pages** → **Career Page**
6. Add the new open position to the "Open Positions" array
7. Click **Publish** on the career page

**Expected Logs (Vercel):**
```
Revalidating tags: career-page-data
```

**Verification:**
- [ ] Visit `/career` → New position appears in the list
- [ ] PDF link works correctly

**Expected Time:** Within 5 seconds

---

### Test 4.4: Update Blinkdraft Page (Locale-Specific)

**Document Type:** `blinkdraft`

**Steps:**
1. Navigate to **Pages** → **Blinkdraft**
2. Select the English version
3. Update the hero heading
4. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: blinkdraft, blinkdraft-en
```

**Verification:**
- [ ] Visit `/blinkdraft/en` → Updated heading displays
- [ ] Visit `/blinkdraft/sr` → Serbian version unchanged

**Expected Time:** Within 5 seconds

---

### Test 4.5: Update General Info (Footer/Header)

**Document Type:** `generalInfo`

**Steps:**
1. Navigate to **Settings** → **General Info**
2. Update a social media link
3. Click **Publish**

**Expected Logs (Vercel):**
```
Revalidating tags: general-info
```

**Verification:**
- [ ] Visit any page → Header/footer shows updated social link
- [ ] All pages across the site reflect the change

**Expected Time:** Within 5 seconds

---

## Comprehensive End-to-End Test

### Scenario: Publishing a Major News Article

This test simulates a real-world scenario where you publish a breaking news article that should appear immediately across the site.

**Steps:**

1. **Create a new author** (if needed)
   - Webhook 1 fires → `'authors'` revalidated

2. **Create the news post**
   - Title: "Breaking: Major Legal Update [timestamp]"
   - Category: "Newsroom"
   - Author: The author from step 1
   - Featured Media: Upload an image
   - Status: Publish
   - Webhook 1 fires → Multiple tags revalidated

3. **Verify cascade:**
   - [ ] Home page shows the post in featured posts (within 5 seconds)
   - [ ] `/newsroom` lists the new post (within 5 seconds)
   - [ ] `/breaking-major-legal-update-[timestamp]` loads correctly (within 5 seconds)
   - [ ] Author page shows the new post (within 5 seconds)
   - [ ] Related category pages update (within 5 seconds)

4. **Update the post**
   - Change the title to add "- UPDATED"
   - Webhook 1 fires again

5. **Verify updates:**
   - [ ] All locations show updated title (within 5 seconds)
   - [ ] No stale content visible anywhere

**Expected Total Time:** Under 30 seconds for complete propagation

---

## Troubleshooting Tests

### Test: Webhook Not Firing

**Symptoms:** Content changes don't appear on site

**Debug Steps:**

1. **Check Sanity Webhook History:**
   - Go to API → Webhooks → Select webhook → View deliveries
   - Look for recent delivery attempts
   - Check delivery status (success/failure)

2. **Check Payload:**
   - Click on a delivery
   - Verify the payload contains expected data
   - Ensure `_type`, `slug`, and other fields are present

3. **Check Response:**
   - Look at the response from your endpoint
   - Should be 200 OK with `{"revalidated": true, ...}`
   - If 401: Secret mismatch
   - If 500: Server error

4. **Check Vercel Logs:**
   - Go to Vercel → Your project → Logs
   - Filter by `/api/revalidate`
   - Look for error messages

5. **Verify Environment Variables:**
   - Vercel → Settings → Environment Variables
   - Ensure `SANITY_WEBHOOK_SECRET` is set
   - Match it with Sanity webhook secret

---

### Test: Cache Not Invalidating

**Symptoms:** Webhook fires successfully but cache doesn't update

**Debug Steps:**

1. **Check Revalidated Tags:**
   - Look at Vercel logs
   - Find the revalidation log message
   - Verify correct tags are being revalidated

2. **Check Tag Matching:**
   - Compare tags in logs with tags in `cached-queries.ts`
   - Ensure tags match exactly (case-sensitive)

3. **Hard Refresh Test:**
   - Open DevTools → Network tab
   - Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
   - Check if content is now fresh
   - If yes: CDN caching issue
   - If no: Tag mismatch or query issue

4. **Check Query Tags:**
   - Open `src/sanity/lib/cached-queries.ts`
   - Find the relevant query function
   - Verify it uses the correct tags
   - Example: `getHomePageData()` should include `'home-page-data'` tag

---

## Performance Testing

### Test: Webhook Response Time

**Goal:** Ensure webhooks respond quickly

**Steps:**

1. Trigger a webhook (e.g., update a post)
2. Check Sanity webhook delivery history
3. Look at "Response Time" metric

**Expected:** < 1 second
**Acceptable:** < 3 seconds
**Action Required:** > 5 seconds (investigate server performance)

---

### Test: Concurrent Webhooks

**Goal:** Ensure multiple webhooks can fire simultaneously

**Steps:**

1. Open multiple Sanity Studio tabs
2. Simultaneously:
   - Update a post (Webhook 1)
   - Update a lawyer (Webhook 2)
   - Update a practice (Webhook 3)
3. Click "Publish" on all within 1 second

**Expected:**
- All webhooks fire successfully
- All deliveries show 200 OK
- No rate limiting errors
- All tags revalidated correctly

---

## Automated Testing Script

### Using cURL to Test Webhooks

You can test the revalidation endpoint directly:

```bash
# Test post revalidation
curl -X POST https://bdk-two.vercel.app/api/revalidate \
  -H "Content-Type: application/json" \
  -H "Sanity-Webhook-Signature: YOUR_SIGNATURE" \
  -d '{
    "_type": "post",
    "slug": "test-post",
    "categorySlug": "blog"
  }'
```

**Note:** You'll need to generate a valid HMAC signature. For quick testing, temporarily disable signature verification or use the Sanity webhook delivery history to replay a request.

---

## Testing Checklist

After completing all tests, verify:

### Webhook 1 (Posts & Content)
- [ ] New post creation triggers revalidation
- [ ] Post updates trigger revalidation
- [ ] Post deletion triggers revalidation
- [ ] Category changes trigger revalidation
- [ ] Author updates trigger revalidation
- [ ] Featured posts update on home page
- [ ] Category listing pages update

### Webhook 2 (Lawyers)
- [ ] Lawyer bio updates trigger revalidation
- [ ] Lawyer visibility changes trigger revalidation
- [ ] Lawyer category reordering triggers revalidation
- [ ] People page updates
- [ ] Individual lawyer pages update

### Webhook 3 (Services)
- [ ] Practice updates trigger revalidation
- [ ] Industry updates trigger revalidation
- [ ] Foreign desk updates trigger revalidation
- [ ] Service listing pages update
- [ ] Home page services section updates

### Webhook 4 (Site Config)
- [ ] Home page updates trigger revalidation
- [ ] Country (office) updates trigger revalidation
- [ ] Open position updates trigger revalidation
- [ ] Blinkdraft locale-specific updates work
- [ ] Footer updates across all pages
- [ ] Legal pages (privacy, cookies) update

### General
- [ ] All webhooks fire within 5 seconds
- [ ] No 401 (signature) errors
- [ ] No 500 (server) errors
- [ ] Logs show correct tags being revalidated
- [ ] No stale content visible after updates
- [ ] Concurrent webhooks work correctly

---

## Success Criteria

Your webhook setup is successful when:

✅ **All tests pass** without manual intervention
✅ **Updates appear within 5 seconds** on the website
✅ **Logs confirm** correct tags are being revalidated
✅ **No errors** in Sanity webhook delivery history
✅ **No errors** in Vercel function logs
✅ **Content stays fresh** across all pages

---

## Next Steps

After successful testing:

1. Monitor webhook performance over the next week
2. Track any failed deliveries in Sanity
3. Set up alerts for webhook failures (optional)
4. Document any edge cases discovered
5. Share this guide with your team

---

**Last Updated:** $(date +%Y-%m-%d)

**Version:** 1.0.0
