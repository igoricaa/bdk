import { Lawyer, Slug, SERVICE_QUERYResult, SERVICE_RELATED_POSTS_QUERYResult } from '@/sanity.types';
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
  relatedPosts?: SERVICE_RELATED_POSTS_QUERYResult;
}

interface RelatedPost {
  title: string;
  slug: Slug;
  date: string;
}

const ServicePage = ({
  serviceType,
  currentService,
  relatedPosts,
}: ServicePageProps) => {
  if (!currentService) {
    return <div>No {serviceType} found</div>;
  }

  const blogPosts: RelatedPost[] = (
    relatedPosts?.latestBlogPosts && relatedPosts.latestBlogPosts.length > 0
      ? relatedPosts.latestBlogPosts
      : []
  )
    .filter((post): post is NonNullable<typeof post> =>
      Boolean(post.title && post.date && post.slug)
    )
    .map(post => ({
      title: post.title!,
      slug: post.slug!,
      date: post.date!,
    }));

  const insightsPosts: RelatedPost[] = (
    relatedPosts?.bdkInsights && relatedPosts.bdkInsights.length > 0
      ? relatedPosts.bdkInsights
      : []
  )
    .filter((post): post is NonNullable<typeof post> =>
      Boolean(post.title && post.date && post.slug)
    )
    .map(post => ({
      title: post.title!,
      slug: post.slug!,
      date: post.date!,
    }));

  const hasAnyPosts =
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
        serviceType={serviceType}
        mobileOnly={true}
        className='-ml-0! w-screen px-side xl:hidden'
      />

      <SimpleServiceContentSection
        currentService={currentService}
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
        blogPosts={blogPosts}
        insightsPosts={insightsPosts}
        underColor={postsUnderColor}
      />
    </main>
  );
};

export default ServicePage;
