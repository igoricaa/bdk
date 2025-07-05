import { Testimonial } from '@/sanity/schemaTypes/services/testimonialTypes';
import TestimonialsCarousel from './testimonials-carousel';

const TestimonialsSection = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  return (
    <section className='flex flex-col md:flex-row gap-13 md:justify-between bg-white rounded-t-main px-side pt-20 pb-35 md:pt-24 md:pb-30 xl:pt-30 xl:pb-37 2xl:py-42 '>
      <h2 className='text-dark-blue text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl'>
        Mentions
      </h2>
      <div className='border-l-[3px] border-light-blue pl-5 2xl:pl-8 md:max-w-4/6 xl:max-w-6/10'>
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
};

export default TestimonialsSection;
