import { sanityFetch } from '@/sanity/lib/live';
import { PRACTICE_QUERY, PRACTICES_QUERY } from '@/sanity/lib/queries';
import ServicePage from '@/components/services/service-page';
import { PRACTICE_QUERYResult, PRACTICES_QUERYResult } from '@/sanity.types';

// export async function generateStaticParams() {
//   const practices: PRACTICES_QUERYResult = await sanityFetch({
//     query: PRACTICES_QUERY,
//   });

//   return practices.map((practice) => ({
//     slug: practice.slug.current,
//   }));
// }

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data }: { data: PRACTICE_QUERYResult } = await sanityFetch({
    query: PRACTICE_QUERY,
    params: { slug },
  });

  const {
    currentPractice: currentService,
    otherPractices: otherServices,
    industries,
    foreignDesks,
    autoNewsroom,
  } = data;

  if (!currentService) {
    return <div>Practice not found</div>;
  }

  // Convert practices list from otherServices since PRACTICE_QUERY doesn't include practices separately
  const practices = otherServices;

  return (
    <ServicePage
      serviceType='practice'
      currentService={currentService}
      otherServices={otherServices}
      practices={practices}
      industries={industries}
      foreignDesks={foreignDesks}
      autoNewsroom={autoNewsroom}
    />
  );
}
