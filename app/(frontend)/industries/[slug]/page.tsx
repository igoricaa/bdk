import { sanityFetch } from '@/sanity/lib/client';
import { INDUSTRY_QUERY, INDUSTRIES_QUERY } from '@/sanity/lib/queries';
import ServicePage from '@/components/services/service-page';
import { INDUSTRIES_QUERYResult, INDUSTRY_QUERYResult } from '@/sanity.types';

export async function generateStaticParams() {
  const industries: INDUSTRIES_QUERYResult = await sanityFetch({
    query: INDUSTRIES_QUERY,
  });
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
  const industry: INDUSTRY_QUERYResult = await sanityFetch({
    query: INDUSTRY_QUERY,
    params: { slug },
  });

  const { currentIndustry, practices, industries, foreignDesks, autoNewsroom } =
    industry;

  if (!currentIndustry) {
    return <div>Industry not found</div>;
  }

  return (
    <ServicePage
      serviceType='industry'
      currentService={currentIndustry}
      practices={practices}
      industries={industries}
      foreignDesks={foreignDesks}
      autoNewsroom={autoNewsroom}
    />
  );
}
