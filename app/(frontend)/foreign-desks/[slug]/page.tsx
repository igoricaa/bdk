import { sanityFetch } from '@/sanity/lib/client';
import {
  FOREIGN_DESK_QUERY,
  FOREIGN_DESKS_QUERY_WITH_SLUGS,
} from '@/sanity/lib/queries';
import ServicePage from '@/components/services/service-page';
import { FOREIGN_DESK_QUERYResult } from '@/sanity.types';

export async function generateStaticParams() {
  const foreignDesks = await sanityFetch({
    query: FOREIGN_DESKS_QUERY_WITH_SLUGS,
  });
  return foreignDesks.map((foreignDesk) => ({
    slug: foreignDesk.slug.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const foreignDesk: FOREIGN_DESK_QUERYResult = await sanityFetch({
    query: FOREIGN_DESK_QUERY,
    params: { slug },
  });

  const {
    currentForeignDesk,
    practices,
    industries,
    foreignDesks,
    autoNewsroom,
  } = foreignDesk;

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
      autoNewsroom={autoNewsroom}
    />
  );
}
