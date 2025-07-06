import { client } from '@/sanity/lib/client';
import { POST_QUERY } from '@/sanity/lib/queries';
import type { POST_QUERYResult } from '@/sanity.types';

const TestPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  try {
    const result: POST_QUERYResult = await client.fetch(POST_QUERY, {
      slug,
    });

    return (
      <div className='p-8 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>Debug: Adjacent Posts Query</h1>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Query Parameters</h2>
          <p>
            Current slug:{' '}
            <code className='bg-gray-100 px-2 py-1 rounded'>{slug}</code>
          </p>
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Current Post</h2>
          {result?.currentPost ? (
            <div className='bg-green-50 p-4 rounded'>
              <p>
                <strong>Title:</strong> {result.currentPost.title}
              </p>
              <p>
                <strong>Date:</strong> {result.currentPost.date}
              </p>
              <p>
                <strong>Status:</strong> {result.currentPost.status}
              </p>
              <p>
                <strong>Categories:</strong>{' '}
                {result.currentPost.categories?.map((c) => c.name).join(', ')}
              </p>
            </div>
          ) : (
            <div className='bg-red-50 p-4 rounded'>
              <p>No current post found</p>
            </div>
          )}
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Previous Post</h2>
          {result?.previousPost ? (
            <div className='bg-blue-50 p-4 rounded'>
              <p>
                <strong>Slug:</strong> {result.previousPost.slug.current}
              </p>
              <p>
                <strong>Navigation URL:</strong>{' '}
                <code>/bdknowledge/{result.previousPost.slug.current}</code>
              </p>
            </div>
          ) : (
            <div className='bg-gray-50 p-4 rounded'>
              <p>No previous post found</p>
            </div>
          )}
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Next Post</h2>
          {result?.nextPost ? (
            <div className='bg-blue-50 p-4 rounded'>
              <p>
                <strong>Slug:</strong> {result.nextPost.slug.current}
              </p>
              <p>
                <strong>Navigation URL:</strong>{' '}
                <code>/bdknowledge/{result.nextPost.slug.current}</code>
              </p>
            </div>
          ) : (
            <div className='bg-gray-50 p-4 rounded'>
              <p>No next post found</p>
            </div>
          )}
        </div>

        <div className='mb-8'>
          <h2 className='text-xl font-semibold mb-2'>Raw Query Result</h2>
          <pre className='bg-gray-100 p-4 rounded overflow-auto text-sm'>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className='p-8 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4 text-red-600'>Error</h1>
        <div className='bg-red-50 p-4 rounded'>
          <p>
            <strong>Error:</strong>{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
};

export default TestPage;
