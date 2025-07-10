import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import Link from 'next/link';
import { Industry, Practice } from '@/sanity.types';
import { Plus } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';

const ServicesAccordion = ({
  className,
  industries,
  practices,
  practicesIllustration,
  industriesIllustration,
  setActiveService,
}: {
  className?: string;
  industries: Industry[];
  practices: Practice[];
  practicesIllustration: any;
  industriesIllustration: any;
  setActiveService: (service: Practice | Industry) => void;
}) => {
  return (
    <Accordion
      type='single'
      collapsible
      className={cn(className, 'flex flex-col gap-4')}
      defaultValue='item-1'
    >
      <ServicesAccordionItem
        data={practices}
        illustration={practicesIllustration}
        title='Practices'
        slug='practices'
        index={1}
        setActiveService={setActiveService}
      />
      <ServicesAccordionItem
        data={industries}
        illustration={industriesIllustration}
        title='Industries'
        slug='industries'
        index={2}
        setActiveService={setActiveService}
      />
    </Accordion>
  );
};

export default ServicesAccordion;

const ServicesAccordionItem = ({
  data,
  illustration,
  title,
  slug,
  index,
  setActiveService,
}: {
  data: Practice[] | Industry[];
  illustration: any;
  title: string;
  slug: string;
  index: number;
  setActiveService: (service: Practice | Industry) => void;
}) => {
  return (
    <AccordionItem
      value={`item-${index}`}
      className='bg-lightest-blue/25 rounded-2xl'
    >
      <AccordionTrigger
        className='text-dark-blue text-3xl xl:text-[2.5rem] relative cursor-pointer p-5'
        icon={<PlusIcon />}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent className='text-balance'>
        <div className='md:hidden w-100% bg-dark-blue rounded-bl-[100px] md:rounded-bl-[120px] xl:rounded-bl-[150px] overflow-hidden mt-5 md:mt-7'>
          <img
            src={urlFor(illustration).url()}
            alt='Practices Illustration'
            className='object-cover w-full h-full'
          />
        </div>
        <ul className='grid grid-cols-1 xl:grid-cols-2 xl:gap-x-12 2xl:gap-x-16 gap-y-2 md:gap-y-0 xl:gap-y-8 2xl:gap-y-5 mt-12 md:mt-0 p-5 md:pt-0'>
          {data.map((item, index) => (
            <li key={item.title} onMouseEnter={() => setActiveService(item)}>
              <Link
                href={`/${slug}/${item.slug.current}`}
                className='text-dark-blue text-lg 2xl:text-2xl flex gap-10 justify-between pt-[10px] h-14 md:h-16 xl:h-14 2xl:h-17 border-t border-t-[rgba(137, 138, 141, 0.5)]'
              >
                {item.title}
                <span className='text-light-blue'>
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

const PlusIcon = () => {
  return (
    <Plus
      className={cn(
        'absolute right-2 xl:right-1.5 top-1/2 -translate-y-1/2 text-light-blue pointer-events-none size-11 xl:size-14 shrink-0 transition-transform duration-200'
      )}
      strokeWidth={0.5}
    />
  );
};
