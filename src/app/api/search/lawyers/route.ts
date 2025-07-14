import { client } from '@/src/sanity/lib/client';
import { groq, QueryParams } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';

// This is the GROQ query that will power our search.
// It searches for lawyers by name and optionally filters by category.
const LAWYER_SEARCH_QUERY = groq`
  *[_type == "lawyer" && name match $searchQuery + "*" && ($category == "all" || category->slug.current == $category)] {
    _id,
    name,
    title,
    picture,
    slug,
    contactInfo {
      linkedin
    }
  }
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'all';

  // If the query is empty, we can return all lawyers for that category
  // This makes the endpoint versatile.
  if (searchQuery === '') {
    // You could fetch all lawyers for the category here, but for now,
    // we'll return an empty array to signify no search is active.
    // The client will use its initial data in this case.
    return NextResponse.json([]);
  }

  try {
    const lawyers = await client.fetch(LAWYER_SEARCH_QUERY, {
      searchQuery,
      category,
    });
    return NextResponse.json(lawyers);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
