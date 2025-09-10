import ServicePage from '@/src/components/services/service-page';
import {
  getForeignDeskPageData,
  getServicesData,
} from '@/src/sanity/lib/cached-queries';

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

  const serviceResult = await getForeignDeskPageData(slug);

  const { currentForeignDesk } = serviceResult;

  if (!currentForeignDesk) {
    return <div>Foreign desk not found</div>;
  }

  return (
    <ServicePage
      serviceType='foreign-desk'
      currentService={currentForeignDesk}
    />
  );
}
