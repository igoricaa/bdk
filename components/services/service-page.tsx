import { Lawyer, Post, SERVICE_QUERYResult } from '@/sanity.types';
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
}

const ServicePage = ({
  serviceType,
  currentService,
  practices,
  industries,
  foreignDesks,
}: ServicePageProps) => {
  if (!currentService) {
    return <div>No {serviceType} found</div>;
  }

  console.log(currentService);

  const newsroomPosts = (
    currentService.newsroom && currentService.newsroom.length > 0
      ? currentService.newsroom
      : []
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
      <ServiceHeroSection
        title={currentService.title || ''}
        illustration={
          (currentService as SERVICE_QUERYResult['currentService'])
            ?.illustration as NonNullable<
            SERVICE_QUERYResult['currentService']
          >['illustration']
        }
      />

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

      {currentService.lawyers && currentService.lawyers.length > 0 && (
        <ServiceExpertsSection lawyers={currentService.lawyers as Lawyer[]} />
      )}

      {serviceType !== 'foreign-desk' &&
        'testimonials' in currentService &&
        currentService.testimonials &&
        currentService.testimonials.length > 0 && (
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
