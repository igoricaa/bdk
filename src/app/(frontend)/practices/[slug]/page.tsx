import ServicePage from '@/src/components/services/service-page';
import {
  getServicePageData,
  getServiceRelatedPosts,
  getServicesData,
} from '@/src/sanity/lib/cached-queries';

export async function generateStaticParams() {
  const practices = await getServicesData();
  return practices.practices.map((practice) => ({
    slug: practice.slug.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const serviceResult = await getServicePageData('practice', slug);

  const { currentService } = serviceResult;

  if (!currentService) {
    return <div>Practice not found</div>;
  }

  const relatedPosts = await getServiceRelatedPosts(
    currentService.latestBlogPostsRefs || [],
    currentService.bdkInsightsRefs || []
  );

  return (
    <ServicePage
      serviceType='practice'
      currentService={currentService}
      relatedPosts={relatedPosts}
    />
  );
}
