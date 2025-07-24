import { client } from '@/src/sanity/lib/client';
import { groq } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';
import { normalizeString } from '@/src/lib/utils/normalize-string';

const GLOBAL_SEARCH_QUERY = groq`
  *[_type in ["post", "lawyer", "industry", "practice", "foreignDesk"]] {
    _id,
    _type,
    title,
    name,
    "slug": slug.current,
    "details": select(_type == "lawyer" => name, null),
    "content": pt::text(content)
  }
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length < 2) {
    return NextResponse.json(
      { error: 'Query must be at least 2 characters long' },
      { status: 400 }
    );
  }

  try {
    console.warn(
      'Performing a non-indexed search. For large datasets, this may be slow.'
    );
    const allDocuments = await client.fetch(GLOBAL_SEARCH_QUERY);
    const normalizedQuery = normalizeString(query);

    const filteredResults = allDocuments
      .filter((doc: any) => {
        const title = doc.title ? normalizeString(doc.title) : '';
        const name = doc.name ? normalizeString(doc.name) : '';
        const content = doc.content ? normalizeString(doc.content) : '';

        return (
          title.includes(normalizedQuery) ||
          name.includes(normalizedQuery) ||
          content.includes(normalizedQuery)
        );
      })
      .slice(0, 10);

    return NextResponse.json(filteredResults);
  } catch (error) {
    console.error('Global search error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
