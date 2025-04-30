import { client } from '@/sanity/lib/client';
import PortableText from '../components/PortableText';
import { Author, Lawyer } from '@/sanity.types';
import type { PortableTextBlock } from '@portabletext/types';
import { AUTHORS_QUERY, LAWYERS_QUERY, SERVICES_QUERY } from '@/sanity/lib/queries';

export default async function Home() {
  const lawyers: Lawyer[] = await client.fetch(LAWYERS_QUERY);
  const services = await client.fetch(SERVICES_QUERY);
  const authors: Author[] = await client.fetch(AUTHORS_QUERY);

  return (
    <main>
      <h1>Lawyers</h1>
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
      </ul>

      <h1>Services</h1>
      <ul>
        {services.map((service) => (
          <li key={service._id}>
            <h2>{service.title}</h2>
            {service.lawyer && (
              <div>
                <h3>Assigned to: {service.lawyer?.name}</h3>

                <p>{service.lawyer.contactInfo?.email}</p>
                <p>{service.lawyer.contactInfo?.phone}</p>
              </div>
            )}

            <PortableText value={service.description as PortableTextBlock[]} />
          </li>
        ))}
      </ul>
      <div>BROJ AUTORA: {authors.length}</div>
      <ul>
        {authors.map((author) => (
          <li key={author._id}>
            {author.type === 'custom' && (
              <h2>{author.customAuthor?.name}</h2>
            )}
            {/* {author.type === 'lawyer' && (
              <h2>{author.lawyer?.name}</h2>
            )} */}
          </li>
        ))}
      </ul>
    </main>
  );
}
