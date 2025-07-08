import { sanityFetch } from '@/sanity/lib/live';
import { INDUSTRY_QUERY, INDUSTRIES_QUERY } from '@/sanity/lib/queries';
import ServicePage from '@/components/services/service-page';
import { INDUSTRIES_QUERYResult, INDUSTRY_QUERYResult } from '@/sanity.types';

export async function generateStaticParams() {
  const { data }: { data: INDUSTRIES_QUERYResult } = await sanityFetch({
    query: INDUSTRIES_QUERY,
  });
  return data.industries.map((industry) => ({
    slug: industry.slug.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data }: { data: INDUSTRY_QUERYResult } = await sanityFetch({
    query: INDUSTRY_QUERY,
    params: { slug },
  });

  const {
    currentIndustry: currentService,
    otherIndustries: otherServices,
    practices,
    industries,
    foreignDesks,
    autoNewsroom,
  } = data;

  if (!currentService) {
    return <div>Industry not found</div>;
  }

  return (
    <ServicePage
      serviceType='industry'
      currentService={currentService}
      otherServices={otherServices}
      practices={practices}
      industries={industries}
      foreignDesks={foreignDesks}
      autoNewsroom={autoNewsroom}
    />
  );
}
