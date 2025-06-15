import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion';
import Link from 'next/link';
import { Industry, Practice } from '@/sanity.types';

const ServicesAccordion = ({
  className,
  industries,
  practices,
}: {
  className?: string;
  industries: Industry[];
  practices: Practice[];
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
        title='Practices'
        slug='practices'
        index={1}
      />
      <ServicesAccordionItem
        data={industries}
        title='Industries'
        slug='industries'
        index={2}
      />
    </Accordion>
  );
};

export default ServicesAccordion;

const ServicesAccordionItem = ({
  data,
  title,
  slug,
  index,
}: {
  data: Practice[] | Industry[];
  title: string;
  slug: string;
  index: number;
}) => {
  return (
    <AccordionItem
      value={`item-${index}`}
      className='bg-lightest-blue/25 rounded-2xl p-5'
    >
      <AccordionTrigger
        className='text-dark-blue text-3xl xl:text-[2.5rem] p-0 relative cursor-pointer'
        iconClassName='absolute right-0 top-1/2 -translate-y-1/2'
      >
        {title}
      </AccordionTrigger>
      <AccordionContent className='text-balance md:mt-6 xl:mt-5'>
        <ul className='grid grid-cols-1 xl:grid-cols-2 xl:gap-x-12 2xl:gap-x-16 gap-y-2 md:gap-y-0 xl:gap-y-8 2xl:gap-y-5'>
          {data.map((item, index) => (
            <li key={item.title}>
              <Link
                href={`/${slug}/${item.slug.current}`}
                className='text-dark-blue text-lg 2xl:text-2xl flex gap-10 justify-between pt-[10px] h-14 md:h-16 xl:h-14 2xl:h-17 border-t border-t-[rgba(137, 138, 141, 0.5)]'
              >
                {item.title}
                <span className='text-light-blue'>0{index + 1}</span>
              </Link>
            </li>
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
