import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';
import AccordionList from './accordion-list';
import { ServiceData } from '@/types/service';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentService: ServiceData;
  otherServices: Array<{ title: string; slug: { current: string } }>;
  services: Array<{ title: string; slug: { current: string } }>;
  foreignDesks:
    | Array<{ title: string; slug: { current: string } }>
    | Array<{ title: string; slug: { current: string } }>;
  className?: string;
}

const Sidebar = ({
  currentService,
  otherServices,
  services,
  foreignDesks,
  className,
}: SidebarProps) => {
  return (
    <div
      className={cn(
        'sticky top-0 xl:static bg-light-blue-bg rounded-[10px] py-3 md:py-5 px-side xl:p-4 2xl:px-5 2xl:py-7 xl:min-w-xs 2xl:min-w-[26rem] w-screen xl:w-auto -ml-side xl:ml-0 z-10',
        className
      )}
    >
      <Accordion type='single' collapsible className='xl:hidden'>
        <AccordionItem value='sidebar-content'>
          <AccordionTrigger
            className='flex items-center justify-between text-base py-0 [&[data-state=open]>svg]:rotate-180'
            icon={
              <ChevronDown
                strokeWidth={1}
                stroke='hsl(var(--grey-text))'
                className='size-6 md:size-8 transition-transform duration-200'
              />
            }
          >
            {currentService?.title}
          </AccordionTrigger>
          <AccordionContent className='pt-5 pb-2 md:pt-6 md:pb-0'>
            <AccordionList
              services={otherServices}
              industries={services}
              foreignDesks={foreignDesks}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className='hidden xl:block'>
        <AccordionList
          services={otherServices}
          industries={services}
          foreignDesks={foreignDesks}
        />
      </div>
    </div>
  );
};

export default Sidebar;
