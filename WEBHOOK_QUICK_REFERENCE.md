# 📋 Webhook Quick Reference Card

## Copy-Paste Ready Configurations

---

## Webhook 1: Posts & Content 🔴

```
Name: Posts & Content Updates
URL: https://bdk-two.vercel.app/api/revalidate
Method: POST
```

**Filter:**
```groq
_type in ['post', 'category', 'author']
```

**Projection:**
```groq
{
  "_type": _type,
  "slug": slug.current,
  "categorySlug": select(
    _type == "post" => categories[0]->slug.current,
    _type == "category" => slug.current
  )
}
```

**Revalidates:** Posts, categories, authors, featured posts, home page

---

## Webhook 2: Lawyers & Team 🟡

```
Name: Lawyers & Team Structure
URL: https://bdk-two.vercel.app/api/revalidate
Method: POST
```

**Filter:**
```groq
_type in ['lawyer', 'lawyerCategory']
```

**Projection:**
```groq
{
  "_type": _type,
  "slug": slug.current
}
```

**Revalidates:** Lawyers, team pages, people page

---

## Webhook 3: Services 🟡

```
Name: Services & Expertise
URL: https://bdk-two.vercel.app/api/revalidate
Method: POST
```

**Filter:**
```groq
_type in ['practice', 'industry', 'foreignDesk']
```

**Projection:**
```groq
{
  "_type": _type,
  "slug": slug.current
}
```

**Revalidates:** Service pages, service listings, home page services

---

## Webhook 4: Site Config 🟢

```
Name: Site Structure & Config
URL: https://bdk-two.vercel.app/api/revalidate
Method: POST
```

**Filter:**
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

**Projection:**
```groq
{
  "_type": _type,
  "locale": language
}
```

**Revalidates:** Singleton pages, footer, legal pages, job listings, forms

---

## All Webhooks Settings

✅ **On Create:** Enabled
✅ **On Update:** Enabled
✅ **On Delete:** Enabled
✅ **HTTP Headers:** `Content-Type: application/json`
✅ **Secret:** Use your `SANITY_WEBHOOK_SECRET`

---

## Quick Test Commands

**Test Webhook 1 (Posts):**
1. Create a new post in Sanity
2. Check logs: `Revalidating tags: posts, global-featured-posts, home-page-data, post-{slug}`
3. Visit home page → New post appears

**Test Webhook 4 (Footer):**
1. Update an office address in Countries
2. Check logs: `Revalidating tags: general-info`
3. Visit any page → Footer updated

---

## Environment Variable

```env
SANITY_WEBHOOK_SECRET=your-secret-here
```

Set in:
- `.env.local` (local dev)
- Vercel Environment Variables (production)
- Sanity webhook configuration (all 4 webhooks)

---

**Full Documentation:**
- Setup: `WEBHOOK_SETUP_GUIDE.md`
- Testing: `WEBHOOK_TESTING_GUIDE.md`
- Summary: `WEBHOOK_IMPLEMENTATION_SUMMARY.md`
