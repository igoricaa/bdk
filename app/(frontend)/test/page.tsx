import { sanityFetch } from '@/sanity/lib/client';
import PortableText from '../../components/bamPortabletext';
import {
  AUTHORS_QUERYResult,
  LAWYERS_QUERYResult,
  PRACTICES_QUERYResult,
} from '@/sanity.types';
import type { PortableTextBlock } from '@portabletext/types';
import {
  AUTHORS_QUERY,
  LAWYERS_QUERY,
  PRACTICES_QUERY,
} from '@/sanity/lib/queries';

export default async function TestPage() {
  const lawyers: LAWYERS_QUERYResult = await sanityFetch({
    query: LAWYERS_QUERY,
    tags: ['lawyers', 'partners'],
    revalidate: 43200,
  });
  const practices: PRACTICES_QUERYResult = await sanityFetch({
    query: PRACTICES_QUERY,
    tags: ['practices', 'services'],
    revalidate: 43200,
  });
  const authors: AUTHORS_QUERYResult = await sanityFetch({
    query: AUTHORS_QUERY,
    tags: ['authors'],
    revalidate: 43200,
  });

  return (
    <main>
      {/* <h1>Lawyers</h1>
      <ul>
        {lawyers.map((lawyer: Lawyer) => (
          <li key={lawyer._id}>
            <h2>{lawyer.name}</h2>
            <p>{lawyer.title}</p>
            <p>{lawyer.contactInfo?.email}</p>
            <p>{lawyer.contactInfo?.phone}</p>
            {lawyer.bio && (
              <PortableText value={lawyer.bio as PortableTextBlock[]} />
            )}
            <h3>Testimonials</h3>
            <ul>
              {lawyer.testimonials?.map((testimonial: any) => (
                <li key={testimonial._id}>
                  <p>{testimonial.text}</p>
                  <p>{testimonial.author}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul> */}

      <h1>Practices</h1>
      <ul>
        {practices.map((practice) => (
          <li key={practice._id}>
            <h2>{practice.title}</h2>
            {practice.lawyers &&
              practice.lawyers.length > 0 &&
              practice.lawyers.map((lawyer, index) => (
                <div key={lawyer._id}>
                  <h3>Assigned to: {lawyer.name}</h3>

                  <p>{lawyer.contactInfo?.email}</p>
                  <p>{lawyer.contactInfo?.phone}</p>
                  <PortableText value={lawyer.bio as PortableTextBlock[]} />
                </div>
              ))}
            ¡
            <PortableText value={practice.description as PortableTextBlock[]} />
          </li>
        ))}
      </ul>
      {/* <div>BROJ AUTORA: {authors.length}</div> */}
      {/* <ul>
        {authors.map((author) => (
          <li key={author._id}>
            {author.type === 'custom' && <h2>{author.customAuthor?.name}</h2>}
          </li>
        ))}
      </ul>

      <section>
        <h2>Posts</h2>
        <p>Posts count: {posts.length}</p>
        <ul>
          {posts.map((post: Post) => (
            <li key={post._id}>
              <h3>{post.title}</h3>
            </li>
          ))}
        </ul>
      </section> */}
    </main>
  );
}
