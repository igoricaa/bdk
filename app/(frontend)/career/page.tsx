import SplitSection from '@/components/ui/split-section';
import type { CAREER_PAGE_QUERYResult, OpenPosition } from '@/sanity.types';
import { getCareerPageData } from '@/sanity/lib/cached-queries';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Section from '@/components/ui/section';
import Subtitle from '@/components/ui/subtitle';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import ArrowUpRight from '@/components/ui/arrow-up-right';

const CareerPage = async () => {
  const {
    careerPage: careerPageData,
  }: { careerPage: CAREER_PAGE_QUERYResult['careerPage'] } =
    await getCareerPageData();

  if (!careerPageData) {
    return <div>No data</div>;
  }

  return (
    <main className='pt-header'>
      <SplitSection
        heading={careerPageData.hero.heading}
        image={careerPageData.hero.backgroundImage}
        description={careerPageData.hero.description}
        customComponent={<OpenPositions careerPageData={careerPageData} />}
        className='px-side'
      />
    </main>
  );
};

export default CareerPage;

const OpenPositions = ({
  careerPageData,
}: {
  careerPageData: CAREER_PAGE_QUERYResult['careerPage'];
}) => {
  if (!careerPageData) {
    return null;
  }

  const pdfFile =
    careerPageData.hero.openPositionsSection.openPositions?.[0]?.pdfFile;

  if (!pdfFile) {
    return null;
  }

  // Extract the file ID from the reference
  const fileId = pdfFile.asset?._ref.replace('file-', '').replace('-pdf', '');

  // Construct the Sanity CDN URL for the PDF
  const pdfUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.pdf`;

  const fileName = `${careerPageData.hero.openPositionsSection.heading.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;

  return (
    <section className='mt-13'>
      <p className='text-dark-blue text-2xl 2xl:text-3xl border-b border-lightest-blue pb-7.5 md:pb-5 xl:pb-7.5 2xl:pb-10'>
        {careerPageData.hero.openPositionsSection.heading}
      </p>
      <ul>
        {careerPageData.hero.openPositionsSection.openPositions?.map(
          (openPosition) => (
            <li
              key={openPosition._id}
              className='py-7.5 md:py-5 xl:py-7.5 border-b border-lightest-blue relative'
            >
              <a
                href={pdfUrl}
                target={'_blank'}
                rel={'noopener noreferrer'}
                className='flex flex-col gap-4 '
              >
                <p className='text-dark-blue text-2xl 2xl:text-3xl'>
                  {openPosition.title}
                </p>
                <p className='text-grey-text text-lg 2xl:text-2xl'>
                  {openPosition.location}
                </p>
                <ArrowUpRight className='absolute top-8 md:top-5 2xl:top-8 right-0' />
              </a>
            </li>
          )
        )}
      </ul>
    </section>
  );
};

interface PdfDownloadLinkProps {
  pdfFile: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
  title: string;
  className?: string;
  showAsDownload?: boolean; // if true, forces download, if false opens in new tab
}

const PdfDownloadLink: React.FC<PdfDownloadLinkProps> = ({
  pdfFile,
  title,
  className = '',
  showAsDownload = true,
}) => {
  if (!pdfFile?.asset?._ref) {
    return null;
  }

  // Extract the file ID from the reference
  const fileId = pdfFile.asset._ref.replace('file-', '').replace('-pdf', '');

  // Construct the Sanity CDN URL for the PDF
  const pdfUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${fileId}.pdf`;

  const fileName = `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;

  return (
    <a
      href={pdfUrl}
      download={showAsDownload ? fileName : undefined}
      target={showAsDownload ? undefined : '_blank'}
      rel={showAsDownload ? undefined : 'noopener noreferrer'}
      className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 no-underline ${className}`}
    >
      {showAsDownload ? <>Download PDF</> : <>View PDF</>}
    </a>
  );
};
