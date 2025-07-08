import { urlFor } from '@/sanity/lib/image';
import { TextShimmer } from '../ui/text-shimmer';
import { SERVICE_QUERYResult } from '@/sanity.types';

const ServiceHeroSection = ({
  title,
  illustration,
}: {
  title: string;
  illustration: NonNullable<
    SERVICE_QUERYResult['currentService']
  >['illustration'];
}) => {
  return (
    <section className='bg-dark-blue flex rounded-b-main px-side pb-12 md:pb-24 2xl:pb-34 relative aspect-[393/550] md:aspect-[834/500] xl:aspect-[1440/600] 2xl:aspect-[1920/800] overflow-hidden'>
      {illustration &&
        (illustration.desktop ||
          illustration.tablet ||
          illustration.mobile) && (
          <picture className='w-full object-cover absolute top-0 right-0 max-w-full md:max-w-3/5'>
            <source
              media='(min-width: 1280px)'
              srcSet={urlFor(illustration.desktop).url()}
            />
            <source
              media='(min-width: 768px)'
              srcSet={urlFor(illustration.tablet).url()}
            />
            <img
              src={urlFor(illustration.mobile).url()}
              alt={`BDK Advokati - ${title}`}
              className='w-full h-full object-cover'
            />
          </picture>
        )}
      <h1 className='text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl mt-auto'>
        <TextShimmer
          className='[--base-color:#fff] [--base-gradient-color:hsl(var(--light-blue))]'
          spread={5}
          duration={2.5}
        >
          {title}
        </TextShimmer>
      </h1>
    </section>
  );
};

export default ServiceHeroSection;
