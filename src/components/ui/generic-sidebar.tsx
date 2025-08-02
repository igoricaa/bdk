import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/src/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import GenericAccordionList from './generic-accordion-list';
import { GenericSidebarProps } from '@/src/types/sidebar';
import { cn } from '@/src/lib/utils';
import PostCategoriesAccordion from './post-categories-accordion';

const GenericSidebar = ({
  sections,
  mobileTitle,
  className,
  mobileOnly,
  forPosts = false,
  accordionValue,
  onAccordionValueChange,
}: GenericSidebarProps) => {
  return (
    <div
      id={mobileOnly ? 'stickyTopbar' : ''}
      className={cn(
        'sticky top-0 xl:static bg-light-blue-bg rounded-b-[10px] py-2.5 md:py-5 xl:min-w-xs 2xl:min-w-[26rem] z-10 transition-transform duration-300 h-fit',
        className
      )}
    >
      <Accordion 
        type='single' 
        collapsible 
        className='xl:hidden'
        value={accordionValue}
        onValueChange={onAccordionValueChange}
      >
        <AccordionItem value='sidebar-content'>
          <AccordionTrigger
            className='flex items-center justify-between text-lg py-0 [&[data-state=open]>svg]:rotate-180'
            icon={
              <ChevronDown
                strokeWidth={1}
                stroke='hsl(var(--grey-text))'
                className='size-6 md:size-8 transition-transform duration-200'
              />
            }
          >
            {mobileTitle}
          </AccordionTrigger>
          <AccordionContent className='mt-5 pb-2 md:pt-6 md:pb-0 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 xl:max-h-none xl:overflow-visible'>
            {forPosts ? (
              <PostCategoriesAccordion
                sections={sections}
                mobileOnly={mobileOnly}
              />
            ) : (
              <GenericAccordionList
                sections={sections}
                mobileOnly={mobileOnly}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className='hidden xl:block'>
        {forPosts ? (
          <PostCategoriesAccordion
            sections={sections}
            mobileOnly={mobileOnly}
          />
        ) : (
          <GenericAccordionList sections={sections} mobileOnly={mobileOnly} />
        )}
      </div>
    </div>
  );
};

export default GenericSidebar;
