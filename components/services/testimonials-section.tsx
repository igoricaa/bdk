import { Testimonial } from '@/sanity/schemaTypes/services/testimonialTypes';
import TestimonialsCarousel from './testimonials-carousel';
import Section from '../ui/section';

const TestimonialsSection = ({
  testimonials,
  bgVariant = 'dark',
}: {
  testimonials: Testimonial[];
  bgVariant?: 'dark' | 'light' | 'blue';
}) => {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <Section
      variant={bgVariant}
      underColor='bg-dark-blue'
      className='flex flex-col md:flex-row gap-13 md:justify-between'
    >
      <h2 className='text-dark-blue text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl'>
        Mentions
      </h2>
      <TestimonialsCarousel
        testimonials={testimonials}
        className='md:max-w-4/6 xl:max-w-6/10'
      />
    </Section>
  );
};

export default TestimonialsSection;
