import { Post } from '@/sanity.types';
import { ServiceData } from '@/types/service';
import ServiceHeroSection from './service-hero-section';
import SimpleServiceContentSection from './simple-service-content-section';
import ServiceExpertsSection from './service-experts-section';
import RelatedPostsSection from './related-posts-section';
import TestimonialsSection from './testimonials-section';
import { Testimonial } from '@/sanity/schemaTypes/services/testimonialTypes';
import Sidebar from './sidebar';

interface ServicePageProps {
  serviceType: 'practice' | 'industry' | 'foreign-desk';
  currentService: ServiceData;
  practices: Array<{ title: string; slug: { current: string } }>;
  industries: Array<{ title: string; slug: { current: string } }>;
  foreignDesks: Array<{ title: string; slug: { current: string } }>;
  autoNewsroom: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    date: string;
  }>;
}

const ServicePage = ({
  serviceType,
  currentService,
  practices,
  industries,
  foreignDesks,
  autoNewsroom,
}: ServicePageProps) => {
  if (!currentService) {
    return <div>No {serviceType} found</div>;
  }

  const newsroomPosts = (
    currentService.newsroom && currentService.newsroom.length > 0
      ? currentService.newsroom
      : autoNewsroom || []
  ).filter((post) => post.title && post.date) as Post[];

  const blogPosts = (
    currentService.latestBlogPosts && currentService.latestBlogPosts.length > 0
      ? currentService.latestBlogPosts
      : []
  ).filter((post) => post.title && post.date) as Post[];

  const insightsPosts = (
    currentService.bdkInsights && currentService.bdkInsights.length > 0
      ? currentService.bdkInsights
      : []
  ).filter((post) => post.title && post.date) as Post[];

  return (
    <main className='pt-header'>
      <ServiceHeroSection currentService={currentService} />

      <Sidebar
        currentService={currentService}
        practices={practices}
        industries={industries}
        foreignDesks={foreignDesks}
        className='-ml-0! xl:hidden'
      />

      <SimpleServiceContentSection
        currentService={currentService}
        practices={practices}
        industries={industries}
        foreignDesks={foreignDesks}
        serviceType={serviceType}
      />

      <ServiceExpertsSection currentService={currentService} />

      {serviceType !== 'foreign-desk' && 'testimonials' in currentService && (
        <TestimonialsSection
          testimonials={currentService.testimonials as Testimonial[]}
        />
      )}

      <RelatedPostsSection
        title='Related posts'
        newsroomPosts={newsroomPosts}
        blogPosts={blogPosts}
        insightsPosts={insightsPosts}
      />
    </main>
  );
};

export default ServicePage;
