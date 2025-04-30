import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

import type { Post } from '@/sanity.types';
import type { PortableTextBlock } from '@portabletext/types';
import PortableText from '@/app/components/PortableText';

interface Props {
  params: {
    slug: string;
  };
}

interface Author {
  _id: string;
  name: string;
  type?: 'lawyer' | 'custom';
  lawyer?: {
    name: string;
    title: string;
  };
  customAuthor?: {
    name: string;
  };
}

interface Category {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
}

interface PostWithExpandedReferences
  extends Omit<Post, 'authors' | 'categories'> {
  authors?: Author[];
  categories?: Category[];
}

async function getPost(
  slug: string
): Promise<PostWithExpandedReferences | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      date,
      modified,
      status,
      content,
      excerpt,
      featuredMedia,
      authors[]->{
        _id,
        name,
        type,
        lawyer->{
          name,
          title
        },
        customAuthor{
          name
        }
      },
      categories[]->{
        _id,
        name,
        slug
      }
    }`,
    { slug }
  );
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  const getAuthorName = (author?: Author) => {
    if (!author) return null;
    if (author.type === 'lawyer' && author.lawyer) {
      return `${author.lawyer.name}, ${author.lawyer.title}`;
    }
    return author.customAuthor?.name || author.name;
  };

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
            {post.authors.map((author, index) => (
              <span key={author._id}>
                {getAuthorName(author)}
                {index < post.authors!.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
        {post.date && (
          <div>Published on {new Date(post.date).toLocaleDateString()}</div>
        )}
      </div>

      {post.categories && post.categories.length > 0 && (
        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Categories</h2>
          <div className='flex gap-2'>
            {post.categories.map((category) => (
              <span
                key={category._id}
                className='bg-gray-100 px-3 py-1 rounded-full text-sm'
              >
                {category.name}
              </span>
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
