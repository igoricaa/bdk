import { Lawyer, Post, SERVICE_QUERYResult } from '@/sanity.types';
import { ServiceData } from '@/src/types/service';
import ServiceHeroSection from './service-hero-section';
import SimpleServiceContentSection from './simple-service-content-section';
import ServiceExpertsSection from './service-experts-section';
import RelatedPostsSection from './related-posts-section';
import TestimonialsSection from './testimonials-section';
import { Testimonial } from '@/src/sanity/schemaTypes/services/testimonialTypes';
import Sidebar from './sidebar';
import { FooterBackgroundHandler } from '../ui/footer-background-handler';
import { AnimateOnLoad } from '../animations/animate-on-load';

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

  const hasAnyPosts =
    (newsroomPosts && newsroomPosts.length > 0) ||
    (blogPosts && blogPosts.length > 0) ||
    (insightsPosts && insightsPosts.length > 0);

  const hasTestimonials =
    serviceType !== 'foreign-desk' &&
    'testimonials' in currentService &&
    currentService.testimonials &&
    currentService.testimonials.length > 0;

  const footerColor =
    !hasTestimonials && !hasAnyPosts
      ? 'hsl(var(--dark-blue))'
      : hasTestimonials && !hasAnyPosts
        ? 'hsl(var(--light-blue-bg))'
        : !hasTestimonials && hasAnyPosts
          ? 'hsl(var(--dark-blue))'
          : '';

  const postsUnderColor =
    !hasTestimonials && hasAnyPosts ? 'bg-dark-blue' : 'bg-white';

  return (
    <main className='pt-header'>
      <FooterBackgroundHandler
        changeColor={!hasAnyPosts || !hasTestimonials}
        color={footerColor}
      />
      <AnimateOnLoad>
        <ServiceHeroSection
          title={currentService.title || ''}
          illustration={
            (currentService as SERVICE_QUERYResult['currentService'])
              ?.illustration as NonNullable<
              SERVICE_QUERYResult['currentService']
            >['illustration']
          }
        />
      </AnimateOnLoad>

      <Sidebar
        currentService={currentService}
        practices={practices}
        industries={industries}
        foreignDesks={foreignDesks}
        serviceType={serviceType}
        mobileOnly={true}
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

      {hasTestimonials && (
        <TestimonialsSection
          testimonials={currentService.testimonials as Testimonial[]}
          bgVariant={hasAnyPosts ? 'light' : 'blue'}
        />
      )}

      <RelatedPostsSection
        title='Related posts'
        newsroomPosts={newsroomPosts}
        blogPosts={blogPosts}
        insightsPosts={insightsPosts}
        underColor={postsUnderColor}
      />
    </main>
  );
};

export default ServicePage;
