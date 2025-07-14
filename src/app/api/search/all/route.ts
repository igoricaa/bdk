import { client } from '@/src/sanity/lib/client';
import { groq } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';

// This GROQ query searches across multiple document types.
// - It uses `_type in [...]` to target the correct documents.
// - `coalesce(title, name)` handles documents that use `name` (like lawyers) instead of `title`.
// - `pt::text(content)` is an optional but powerful way to search within Portable Text fields.
// - `order(_score desc)` prioritizes more relevant results.
// - `[0...10]` limits the results to a reasonable number for a dropdown.
const GLOBAL_SEARCH_QUERY = groq`
  *[_type in ["post", "lawyer", "industry", "practice", "foreignDesk"] && (
      title match $searchQuery + "*" ||
      name match $searchQuery + "*" ||
      pt::text(content) match $searchQuery + "*"
    )
  ] | order(_score desc) [0...10] {
    _id,
    _type,
    title,
    "slug": slug.current,
    "details": select(_type == "lawyer" => name, null)
  }
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  // Basic validation
  if (!query || query.trim().length < 2) {
    return NextResponse.json(
      { error: 'Query must be at least 2 characters long' },
      { status: 400 }
    );
  }

  try {
    const results = await client.fetch(GLOBAL_SEARCH_QUERY, {
      searchQuery: query,
    });
    return NextResponse.json(results);
  } catch (error) {
    console.error('Global search error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
