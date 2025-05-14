import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import React from 'react';

import type { Slug, POST_QUERYResult } from '@/sanity.types';
import type { PortableTextBlock } from '@portabletext/types';
import PortableText from '@/app/components/PortableText';
import Link from 'next/link';
import { POST_QUERY } from '@/sanity/lib/queries';

interface Props {
  params: {
    slug: string;
  };
}

interface Author {
  _id: string;
  name: string | null;
  type?: 'lawyer' | 'custom' | null;
  lawyer?: {
    name: string | null;
    title: string | null;
  } | null;
  customAuthor?: {
    name: string | null;
  } | null;
}

interface CategoryWithExpandedReferences {
  _id: string;
  name: string | null;
  slug: Slug | null;
  parentCategories?: CategoryWithExpandedReferences[] | null;
}

async function getPost(slug: string): Promise<POST_QUERYResult | null> {
  return client.fetch(POST_QUERY, { slug });
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const getAuthorName = (author?: Author | null) => {
    if (!author) return null;
    if (author.type === 'lawyer' && author.lawyer) {
      return `${author.lawyer.name}, ${author.lawyer.title}`;
    }
    return author.customAuthor?.name || author.name;
  };

  // const deepestPath = getDeepestCategoryPath(post.categories);

  const uniqueCategories = collectUniqueCategories(post.categories || []);

  return (
    <article className='container mx-auto px-4 py-8'>
      {post.featuredMedia && (
        <div className='mb-8'>
          <img
            src={urlFor(post.featuredMedia).url()}
            alt={post.title || 'Featured image'}
            className='w-full h-auto rounded-lg'
          />
        </div>
      )}

      <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>

      <div className='mb-8 text-gray-600'>
        {post.authors && post.authors.length > 0 && (
          <div className='mb-2'>
            By{' '}
            {post.authors.map((author, index) => {
              const authorName = getAuthorName(author);
              const isLastAuthor = index === post.authors!.length - 1;

              return (
                <React.Fragment key={author._id}>
                  {author.type === 'lawyer' && author.lawyer ? (
                    <Link
                      href={`/lawyers/${author._id}`}
                      className='text-blue-600 hover:underline'
                    >
                      {authorName}
                    </Link>
                  ) : (
                    <span>{authorName}</span>
                  )}
                  {!isLastAuthor && ', '}
                </React.Fragment>
              );
            })}
          </div>
        )}
        {post.date && (
          <div>Published on {new Date(post.date).toLocaleDateString()}</div>
        )}
      </div>
      {uniqueCategories.length > 0 && (
        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Categories</h2>
          <div className='flex flex-wrap gap-2'>
            {uniqueCategories.map((category) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug?.current || ''}`}
                className='bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm transition-colors'
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {post.content && (
        <div className='prose max-w-none'>
          <PortableText value={post.content as PortableTextBlock[]} />
        </div>
      )}
    </article>
  );
}

// function buildCategoryPaths(category: Category): Category[][] {
//   if (!category.parentCategories || category.parentCategories.length === 0)
//     return [[category]];

//   return category.parentCategories.flatMap((parent) =>
//     buildCategoryPaths(parent).map((path) => [...path, category])
//   );
// }

// function getDeepestCategoryPath(categories: Category[] = []): Category[] {
//   let longestPath: Category[] = [];

//   categories.forEach((category) => {
//     buildCategoryPaths(category).forEach((path) => {
//       if (path.length > longestPath.length) longestPath = path;
//     });
//   });

//   return longestPath;
// }

function collectUniqueCategories(
  categories: CategoryWithExpandedReferences[]
): CategoryWithExpandedReferences[] {
  const map = new Map<string, CategoryWithExpandedReferences>();

  function traverse(category: CategoryWithExpandedReferences | undefined | null) {
    if (!category || map.has(category._id)) return;
    map.set(category._id, category);
    if (category.parentCategories) {
      category.parentCategories.forEach(traverse);
    }
  }

  categories.forEach(traverse);

  return Array.from(map.values());
}
