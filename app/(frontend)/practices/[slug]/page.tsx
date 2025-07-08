import ServicePage from '@/components/services/service-page';
import {
  getServicePageData,
  getServicesData,
} from '@/sanity/lib/cached-queries';

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

  const [serviceResult, servicesResult] = await Promise.all([
    getServicePageData('practice', slug),
    getServicesData(),
  ]);

  const { currentService } = serviceResult;
  const { practices, industries, foreignDesks } = servicesResult;

  if (!currentService) {
    return <div>Practice not found</div>;
  }

  return (
    <ServicePage
      serviceType='practice'
      currentService={currentService}
      practices={practices}
      industries={industries}
      foreignDesks={foreignDesks}
    />
  );
}
