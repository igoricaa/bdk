import { client } from '@/src/sanity/lib/client';
import { groq } from 'next-sanity';
import { NextRequest, NextResponse } from 'next/server';
import { normalizeString } from '@/src/lib/utils/normalize-string';

const LAWYER_SEARCH_QUERY = groq`
  *[_type == "lawyer" && ($category == "all" || category->slug.current == $category)] {
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

  if (searchQuery === '') {
    return NextResponse.json([]);
  }

  try {
    console.warn(
      'Performing a non-indexed search for lawyers. For large datasets, this may be slow.'
    );
    const lawyers = await client.fetch(LAWYER_SEARCH_QUERY, {
      category,
    });

    const normalizedQuery = normalizeString(searchQuery);

    const filteredLawyers = lawyers.filter((lawyer: any) => {
      const name = lawyer.name ? normalizeString(lawyer.name) : '';
      return name.includes(normalizedQuery);
    });

    return NextResponse.json(filteredLawyers);
  } catch (error) {
    console.error('Error fetching lawyers:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
