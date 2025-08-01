import LawyerInfoCard from '@/src/components/lawyers/lawyer-info-card';
import { Lawyer } from '@/sanity.types';

const ServiceExpertsSection = ({ lawyers }: { lawyers: Lawyer[] }) => {
  if (!lawyers || lawyers.length === 0) {
    return null;
  }

  return (
    <section className='bg-dark-blue rounded-t-main px-side pt-17.5 pb-25 md:pt-25 md:pb-30 2xl:py-42'>
      <h2 className='text-white text-sm bg-white/10 px-4 py-2 rounded-[500px] w-fit'>
        Our Experts in This Field
      </h2>
      <div className='mt-6 md:mt-8 2xl:mt-15 grid grid-cols-2 gap-5 md:gap-7.5 xl:gap-9 2xl:gap-10'>
        {lawyers.map((lawyer) => (
          <LawyerInfoCard key={lawyer.slug.current} lawyer={lawyer as Lawyer} />
        ))}
      </div>
    </section>
  );
};

export default ServiceExpertsSection;
