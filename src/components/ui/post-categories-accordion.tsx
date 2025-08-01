'use client';

import { cn } from '@/src/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';
import { Plus } from 'lucide-react';
import { SidebarSection, SidebarItem } from '@/src/types/sidebar';
import { parseAsString, useQueryState } from 'nuqs';
import { LinkWithArrow } from './link-arrow';

interface GenericAccordionListProps {
  sections: SidebarSection[];
  className?: string;
  mobileOnly?: boolean;
}

const PostCategoriesAccordion = ({
  sections,
  className,
  mobileOnly,
}: GenericAccordionListProps) => {
  const [activeCategory, setActiveCategory] = useQueryState(
    'category',
    parseAsString.withDefault('all')
  );

  // Find the first section marked as defaultOpen, or the first section
  const defaultSection =
    sections.find((section) => section.defaultOpen) || sections[0];
  const initialValue = mobileOnly ? '' : defaultSection?.id;

  return (
    <div className='flex flex-col gap-2.5'>
      <button
        onClick={() => {
          setActiveCategory('all');
        }}
        className={cn(
          'w-full justify-start text-left px-4 py-2.5 text-base 2xl:text-lg transition-colors cursor-pointer',
          'text-dark-blue hover:text-light-blue'
        )}
      >
        Reset Category Filter
      </button>

      <Accordion
        type='single'
        collapsible
        className={cn('flex flex-col gap-2.5', className)}
        defaultValue={initialValue}
      >
        {sections.map((section) => (
          <GenericAccordionItem
            key={section.id}
            section={section}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default PostCategoriesAccordion;

const GenericAccordionItem = ({
  section,
  activeCategory,
  setActiveCategory,
}: {
  section: SidebarSection;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) => {
  if (!section.items || section.items.length === 0) {
    return null;
  }

  return (
    <AccordionItem value={section.id}>
      <AccordionTrigger
        className='flex items-center justify-between py-2.5 pl-4 pr-2.5 2xl:py-3.25 2xl:pl-5 2xl:pr-3 cursor-pointer bg-light-blue/15 text-dark-blue text-base 2xl:text-lg'
        icon={<PlusIcon />}
      >
        {section.title}
      </AccordionTrigger>
      <AccordionContent className='pl-13 2xl:pl-15 py-4 2xl:py-8'>
        <ul className='space-y-4 2xl:space-y-4.75'>
          {section.items.map((item) => (
            <SidebarItemRenderer
              key={item.id}
              item={item}
              basePath={`${section.basePath}/${item.slug}`}
              level={0}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

const SidebarItemRenderer = ({
  item,
  basePath,
  level,
  activeCategory,
  setActiveCategory,
}: {
  item: SidebarItem;
  basePath: string;
  level: number;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}) => {
  const getMarginClass = (level: number) => {
    const marginClasses = ['', 'ml-4', 'ml-8', 'ml-12', 'ml-16'];
    return marginClasses[Math.min(level, marginClasses.length - 1)] || 'ml-16';
  };

  const href = basePath.endsWith('=') ? `${basePath}${item.slug}` : basePath;

  const isActive = activeCategory === item.slug;

  return (
    <li>
      <div className={level > 0 ? getMarginClass(level) : ''}>
        <LinkWithArrow
          href={href}
          label={item.title}
          iconSize={24}
          onClick={() => setActiveCategory(item.slug)}
          isActive={isActive}
        />
      </div>
      {item.children && item.children.length > 0 && (
        <ul className='space-y-4 2xl:space-y-4.75 mt-4 2xl:mt-4.75'>
          {item.children.map((child) => (
            <SidebarItemRenderer
              key={child.id}
              item={child}
              basePath={basePath}
              level={level + 1}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const PlusIcon = () => {
  return (
    <Plus
      className={cn(
        'text-light-blue pointer-events-none size-6 2xl:size-8 shrink-0 transition-transform duration-200'
      )}
      strokeWidth={1}
    />
  );
};
