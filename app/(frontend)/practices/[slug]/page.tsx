import { client } from '@/sanity/lib/client';
import { PRACTICE_QUERY } from '@/sanity/lib/queries';
import { PRACTICE_QUERYResult } from '@/sanity.types';
import PracticeHeroSection from '@/components/services/practice-hero-section';
import PracticeContentSection from '@/components/services/practice-content-section';
import PracticeExpertsSection from '@/components/services/practice-experts-section';
import TestimonialsSection from '@/components/services/testimonials-section';
import { Testimonial } from '@/sanity/schemaTypes/services/testimonialTypes';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const {
    currentPractice,
    otherPractices,
    industries,
    foreignDesks,
  }: PRACTICE_QUERYResult = await client.fetch(PRACTICE_QUERY, {
    slug,
  });

  if (!currentPractice || !otherPractices || !industries || !foreignDesks) {
    return <div>No practice found</div>;
  }

  return (
    <main>
      <PracticeHeroSection currentPractice={currentPractice} />

      <PracticeContentSection
        currentPractice={currentPractice}
        otherPractices={otherPractices}
        industries={industries}
        foreignDesks={foreignDesks}
      />

      <PracticeExpertsSection currentPractice={currentPractice} />
      <TestimonialsSection
        testimonials={currentPractice.testimonials as Testimonial[]}
      />
    </main>
  );
}
