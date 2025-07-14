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

  const [serviceResult, servicesResult] = await Promise.all([
    getServicePageData('industry', slug),
    getServicesData(),
  ]);

  const { currentService } = serviceResult;
  const { practices, industries, foreignDesks } = servicesResult;

  if (!currentService) {
    return <div>Industry not found</div>;
  }

  return (
    <ServicePage
      serviceType='industry'
      currentService={currentService}
      practices={practices}
      industries={industries}
      foreignDesks={foreignDesks}
    />
  );
}
