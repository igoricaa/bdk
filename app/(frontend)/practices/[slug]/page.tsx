import {
  PRACTICE_QUERY,
  PRACTICES_QUERY_WITH_SLUGS,
} from '@/sanity/lib/queries';
import ServicePage from '@/components/services/service-page';
import {
  PRACTICE_QUERYResult,
  PRACTICES_QUERY_WITH_SLUGSResult,
} from '@/sanity.types';
import { sanityFetch } from '@/sanity/lib/client';

export async function generateStaticParams() {
  const practices: PRACTICES_QUERY_WITH_SLUGSResult = await sanityFetch({
    query: PRACTICES_QUERY_WITH_SLUGS,
  });
  return practices.map((practice) => ({
    slug: practice.slug.current,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practice: PRACTICE_QUERYResult = await sanityFetch({
    query: PRACTICE_QUERY,
    params: { slug },
  });

  const { currentPractice, practices, industries, foreignDesks, autoNewsroom } =
    practice;

  if (!currentPractice) {
    return <div>Practice not found</div>;
  }

  return (
    <ServicePage
      serviceType='practice'
      currentService={currentPractice}
      practices={practices}
      industries={industries}
      foreignDesks={foreignDesks}
      autoNewsroom={autoNewsroom}
    />
  );
}
