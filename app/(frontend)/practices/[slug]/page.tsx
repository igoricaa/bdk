import { sanityFetch } from '@/sanity/lib/client';
import { PRACTICE_QUERY } from '@/sanity/lib/queries';
import { Post, PRACTICE_QUERYResult } from '@/sanity.types';
import PracticeHeroSection from '@/components/services/practice-hero-section';
import PracticeContentSection from '@/components/services/practice-content-section';
import PracticeExpertsSection from '@/components/services/practice-experts-section';
import RelatedPostsSection from '@/components/services/related-posts-section';
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
    autoNewsroom,
  }: PRACTICE_QUERYResult = await sanityFetch({
    query: PRACTICE_QUERY,
    params: { slug },
  });

  if (!currentPractice || !otherPractices || !industries || !foreignDesks) {
    return <div>No practice found</div>;
  }

  const newsroomPosts = (
    currentPractice.newsroom && currentPractice.newsroom.length > 0
      ? currentPractice.newsroom
      : autoNewsroom || []
  ).filter((post) => post.title && post.date) as Post[];

  const blogPosts = (
    currentPractice.latestBlogPosts &&
    currentPractice.latestBlogPosts.length > 0
      ? currentPractice.latestBlogPosts
      : []
  ).filter((post) => post.title && post.date) as Post[];

  const insightsPosts = (
    currentPractice.bdkInsights && currentPractice.bdkInsights.length > 0
      ? currentPractice.bdkInsights
      : []
  ).filter((post) => post.title && post.date) as Post[];

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

      <RelatedPostsSection
        newsroomPosts={newsroomPosts}
        blogPosts={blogPosts}
        insightsPosts={insightsPosts}
      />
    </main>
  );
}
