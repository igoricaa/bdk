import { cn } from '@/src/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Plus } from 'lucide-react';
import CheckmarkIcon from '../ui/icons/checkmark-icon';
import IconButton from '../ui/buttons/icon-button';

export const SimpleAccordion = ({
  className,
  items,
}: {
  className?: string;
  items: {
    title: string;
    description: string | string[];
  }[];
}) => {
  return (
    <Accordion
      type='single'
      collapsible
      className={cn(className, 'flex flex-col gap-3 md:gap-4 w-full')}
      defaultValue={`item-${items[0].title}`}
    >
      {items.map((item) => (
        <SimpleAccordionItem key={item.title} item={item} />
      ))}
    </Accordion>
  );
};
const SimpleAccordionItem = ({
  item,
}: {
  item: {
    title: string;
    description: string | string[];
  };
}) => {
  return (
    <AccordionItem
      value={`item-${item.title}`}
      className='bg-lightest-blue/25 rounded-2xl'
    >
      <AccordionTrigger
        className='text-dark-blue text-2xl md:text-3xl 2xl:text-4xl relative cursor-pointer p-5 pr-11 md:p-5 2xl:p-7.5'
        icon={<PlusIcon />}
      >
        {item.title}
      </AccordionTrigger>
      <AccordionContent className='text-balance pb-6 md:pb-10 flex flex-col md:flex-row-reverse p-5 2xl:px-7.5'>
        <div className='w-full'>
          {Array.isArray(item.description) ? (
            <>
              <ul className='space-y-4 xl:space-y-8'>
                {item.description.map((description) => (
                  <li key={description} className='flex gap-3.5 2xl:gap-4'>
                    <CheckmarkIcon className='mt-1.5 sm:mt-1 xl:mt-0' />
                    <p className='text-grey-text leading-snug text-sm sm:text-base xl:text-lg 2xl:text-2xl'>
                      {description}
                    </p>
                  </li>
                ))}
              </ul>
              <IconButton
                href='#'
                text='Request an Offer'
                className='w-fit mt-8 xl:mt-9 2xl:mt-15'
              />
            </>
          ) : (
            <p className='text-grey-text text-lg 2xl:text-2xl leading-snug '>
              {item.description}
            </p>
          )}
        </div>
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
