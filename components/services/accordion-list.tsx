import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Plus } from 'lucide-react';
import ServicesIcon from '../ui/icons/services-icon';
import IndustriesIcon from '../ui/icons/industries-icon';
import ForeignDesksIcon from '../ui/icons/foreign-desks-icon';
import { LinkWithArrow } from '../ui/link-arrow';

interface AccordionData {
  title: string;
  slug: { current: string };
}

interface AccordionListProps {
  serviceType: 'practice' | 'industry' | 'foreign-desk';
  practices: AccordionData[];
  industries: AccordionData[];
  foreignDesks: AccordionData[];
  className?: string;
  mobileOnly?: boolean;
}

const AccordionList = ({
  serviceType,
  practices,
  industries,
  foreignDesks,
  className,
  mobileOnly,
}: AccordionListProps) => {
  const accordionData = [
    {
      id: 'practice',
      title: 'Practices',
      icon: ServicesIcon,
      data: practices,
      basePath: '/practices',
    },
    {
      id: 'industry',
      title: 'Industries',
      icon: IndustriesIcon,
      data: industries,
      basePath: '/industries',
    },
    {
      id: 'foreign-desk',
      title: 'Foreign Desks',
      icon: ForeignDesksIcon,
      data: foreignDesks,
      basePath: '/foreign-desks',
    },
  ];

  const initialValue = accordionData.find(
    (accordion) => accordion.id === serviceType
  )?.id;

  return (
    <Accordion
      type='single'
      collapsible
      className={cn('flex flex-col gap-2.5', className)}
      defaultValue={mobileOnly ? '' : initialValue}
    >
      {accordionData.map((accordion, index) => (
        <ServiceAccordionItem
          key={accordion.id}
          data={accordion.data}
          title={accordion.title}
          icon={accordion.icon}
          basePath={accordion.basePath}
          value={accordion.id}
        />
      ))}
    </Accordion>
  );
};

export default AccordionList;

const ServiceAccordionItem = ({
  data,
  title,
  icon: Icon,
  basePath,
  value,
}: {
  data: AccordionData[];
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  basePath: string;
  value: string;
}) => {
  if (!data) {
    return null;
  }

  return (
    <AccordionItem value={value}>
      <AccordionTrigger
        className='flex items-center justify-between py-2.5 pl-4 pr-2.5 2xl:py-3.25 2xl:pl-5 2xl:pr-3 cursor-pointer bg-light-blue/15 text-dark-blue text-base 2xl:text-lg'
        icon={<PlusIcon />}
      >
        <div className='flex items-center gap-2.5 2xl:gap-3.5'>
          <Icon className='w-4 h-4 2xl:w-5 2xl:h-5' />
          <span className='leading-none'>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pl-13 2xl:pl-15 py-4 2xl:py-8'>
        <ul className='space-y-4 2xl:space-y-4.75'>
          {data.map((item, index) => (
            <li key={item.slug.current}>
              <LinkWithArrow
                href={`${basePath}/${item.slug.current}`}
                label={item.title}
                iconSize={24}
              />
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
        'text-light-blue pointer-events-none size-4.5 2xl:size-6 shrink-0 transition-transform duration-200'
      )}
      strokeWidth={1}
    />
  );
};
