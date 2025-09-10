import ServicePage from '@/src/components/services/service-page';
import {
  getServicePageData,
  getServicesData,
} from '@/src/sanity/lib/cached-queries';

export async function generateStaticParams() {
  const industries = await getServicesData();
  return industries.industries.map((industry) => ({
    slug: industry.slug.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const serviceResult = await getServicePageData('industry', slug);

  const { currentService } = serviceResult;

  if (!currentService) {
    return <div>Industry not found</div>;
  }

  return (
    <ServicePage
      serviceType='industry'
      currentService={currentService}
    />
  );
}
