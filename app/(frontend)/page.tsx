import { client } from '@/sanity/lib/client';
import PortableText from '../components/PortableText';
import { Lawyer } from '@/sanity.types';
import type { PortableTextBlock } from '@portabletext/types';

export default async function Home() {
  const lawyers: Lawyer[] = await client.fetch(`*[_type == "lawyer"]`);

  return (
    <main>
      <h1>Lawyers</h1>
      <ul>
        {lawyers.map((lawyer: Lawyer) => (
          <li key={lawyer._id}>
            <h2>{lawyer.firstName}</h2>
            <p>{lawyer.lastName}</p>
            <p>{lawyer.title}</p>
            <p>{lawyer.contactInfo?.email}</p>
            <p>{lawyer.contactInfo?.phone}</p>
            {lawyer.bio && <PortableText value={lawyer.bio as PortableTextBlock[]} />}
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
    </main>
  );
}
