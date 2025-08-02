# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## High-Level Architecture

This is a **Next.js 15** application with **Sanity CMS** integration, featuring:

### Core Technologies
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **CMS**: Sanity with multi-language support (English/Serbian)
- **Styling**: Tailwind CSS with Radix UI components
- **Animations**: Motion (Framer Motion alternative), Lenis smooth scrolling
- **State Management**: TanStack Query, React Hook Form with Zod validation
- **Deployment**: Optimized for Vercel with image optimization

### Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (frontend)/              # Main website routes
│   ├── actions/                 # Server actions
│   ├── api/                     # API routes (webhooks, search)
│   └── studio/                  # Sanity Studio integration
├── components/                  # React components
│   ├── ui/                      # Reusable UI components
│   ├── home/                    # Homepage sections
│   ├── lawyers/                 # Legal team components
│   ├── posts/                   # Blog/content components
│   └── services/                # Service page components
├── sanity/                      # Sanity CMS configuration
│   ├── lib/                     # Sanity utilities
│   │   ├── cached-queries.ts    # Cached data fetching functions
│   │   ├── queries.ts           # GROQ queries
│   │   └── client.ts            # Sanity client setup
│   └── schemaTypes/             # Content schemas
└── lib/                         # Utility functions and hooks
```

### Caching Architecture

The application implements a sophisticated **dual-layer caching strategy**:

1. **React cache()**: Request-level memoization
2. **Next.js fetch cache**: Long-term caching with tag-based invalidation
3. **Webhook revalidation**: Real-time content updates via 4 specialized webhooks

**Key cached query functions** (use these instead of direct sanityFetch):
- `getHomePageData()` - Complete homepage data
- `getLawyers()` - Legal team members
- `getPractices()` - Practice areas
- `getGeneralInfoData()` - Site configuration

### Content Management

- **Sanity Studio**: Available at `/studio` route
- **Multi-language**: English (primary) + Serbian with next-intl
- **Content Types**: Lawyers, practices, posts, pages, testimonials
- **Media**: Mux video integration, optimized images
- **Revalidation**: Automatic via webhooks on content changes

### Special Features

- **Custom cursor**: Desktop interaction enhancement
- **Splash screen**: Branded loading experience
- **Page transitions**: Smooth navigation with motion
- **Smooth scrolling**: Lenis integration
- **Search functionality**: Multi-endpoint search (lawyers, content)

### Development Guidelines

- Use **cached query functions** from `src/sanity/lib/cached-queries.ts`
- Follow **import sorting** rules (simple-import-sort plugin)
- Prefer **named exports** over default exports (except for pages/configs)
- Use **TypeScript strict mode** - all types are auto-generated from Sanity schemas
- Components use **Radix UI** + **Tailwind CSS** for consistency

### Key Files to Understand

- `src/sanity/lib/cached-queries.ts` - Main data fetching layer
- `src/app/(frontend)/layout.tsx` - App providers and layout
- `CACHING_ARCHITECTURE.md` - Detailed caching strategy documentation
- `src/sanity/lib/queries.ts` - All GROQ queries
- `sanity.config.ts` - CMS configuration

### API Routes

- `/api/revalidate` - Webhook endpoint for cache invalidation
- `/api/search/*` - Search endpoints for lawyers and content
- `/api/webhooks/postCount` - Post count tracking

The codebase emphasizes **performance optimization** through intelligent caching, **developer experience** with type safety, and **content management** flexibility with Sanity CMS.