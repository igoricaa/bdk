import ServicePage from '@/components/services/service-page';
import {
  getForeignDeskPageData,
  getServicesData,
} from '@/sanity/lib/cached-queries';

export async function generateStaticParams() {
  const foreignDesks = await getServicesData();
  return foreignDesks.foreignDesks.map((foreignDesk) => ({
    slug: foreignDesk.slug.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [serviceResult, servicesResult] = await Promise.all([
    getForeignDeskPageData(slug),
    getServicesData(),
  ]);

  const { currentForeignDesk } = serviceResult;
  const { practices, industries, foreignDesks } = servicesResult;

  if (!currentForeignDesk) {
    return <div>Foreign desk not found</div>;
  }

  return (
    <ServicePage
      serviceType='foreign-desk'
      currentService={currentForeignDesk}
      practices={practices}
      industries={industries}
      foreignDesks={foreignDesks}
    />
  );
}
