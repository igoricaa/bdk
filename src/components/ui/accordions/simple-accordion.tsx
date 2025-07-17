import { cn } from '@/src/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion';
import { Plus } from 'lucide-react';
import CheckmarkIcon from '../icons/checkmark-icon';
import IconButton from '../buttons/icon-button';
import { TableValue } from '@sanity/table';
import CustomTable from '../custom-table';

interface OriginalAccordionItemData {
  title: string;
  description: string | string[] | TableValue;
}

interface GroupedSubItem {
  subtitle: string;
  description: TableValue;
}

type ProcessedContent =
  | { type: 'string'; value: string }
  | { type: 'list'; value: string[] }
  | { type: 'table'; value: TableValue }
  | { type: 'grouped-table'; subItems: GroupedSubItem[] };

interface ProcessedAccordionItem {
  title: string;
  content: ProcessedContent;
}

export const SimpleAccordion = ({
  className,
  items,
}: {
  className?: string;
  items: {
    title: string;
    description: string | string[] | TableValue;
  }[];
}) => {
  /**
   * Processes the raw items array, grouping items that share a common
   * title prefix (separated by ' - ').
   * @param itemsToProcess The original array of items from props.
   * @returns A new array of processed and grouped items ready for rendering.
   */
  const processAndGroupItems = (
    itemsToProcess: OriginalAccordionItemData[]
  ): ProcessedAccordionItem[] => {
    // Use a Map to efficiently group items by their common title.
    const groupedItems = new Map<string, ProcessedAccordionItem>();
    const finalItems: ProcessedAccordionItem[] = [];

    for (const item of itemsToProcess) {
      // A robust check to determine if the description is a Sanity Table object.
      const isTable =
        typeof item.description === 'object' &&
        item.description !== null &&
        !Array.isArray(item.description) &&
        'rows' in item.description;

      const separator = ' - ';
      const separatorIndex = item.title.indexOf(separator);

      // Check if the item is a candidate for grouping (is a table and has the separator).
      if (isTable && separatorIndex !== -1) {
        const groupTitle = item.title.substring(0, separatorIndex).trim();
        const subtitle = item.title
          .substring(separatorIndex + separator.length)
          .trim();

        // If this is the first time we see this group, initialize it.
        if (!groupedItems.has(groupTitle)) {
          groupedItems.set(groupTitle, {
            title: groupTitle,
            content: {
              type: 'grouped-table',
              subItems: [],
            },
          });
        }

        // Add the current item as a sub-item to its group.
        const group = groupedItems.get(groupTitle);
        if (group && group.content.type === 'grouped-table') {
          group.content.subItems.push({
            subtitle: subtitle,
            description: item.description as TableValue,
          });
        }
      } else {
        // If the item is not groupable, process it as a standalone item.
        let processedContent: ProcessedContent;
        if (Array.isArray(item.description)) {
          processedContent = { type: 'list', value: item.description };
        } else if (isTable) {
          processedContent = {
            type: 'table',
            value: item.description as TableValue,
          };
        } else {
          processedContent = {
            type: 'string',
            value: item.description as string,
          };
        }
        finalItems.push({ title: item.title, content: processedContent });
      }
    }

    return [...finalItems, ...Array.from(groupedItems.values())];
  };

  const processedItems = processAndGroupItems(items);

  if (!processedItems || processedItems.length === 0) {
    return null;
  }

  return (
    <Accordion
      type='single'
      collapsible
      className={cn(className, 'flex flex-col gap-3 md:gap-4 w-full')}
      defaultValue={`item-${processedItems[0].title}`}
    >
      {processedItems.map((item) => (
        <SimpleAccordionItem key={item.title} item={item} />
      ))}
    </Accordion>
  );
};
const SimpleAccordionItem = ({ item }: { item: ProcessedAccordionItem }) => {
  const { title, content } = item;

  const renderContent = () => {
    switch (content.type) {
      case 'grouped-table':
        return (
          <div className='space-y-8'>
            {content.subItems.map((subItem, index) => (
              <div key={index}>
                <h4 className='text-md font-semibold mb-3 text-dark-blue sm:text-lg xl:text-xl'>
                  {subItem.subtitle}
                </h4>
                <CustomTable value={subItem.description} />
              </div>
            ))}
          </div>
        );
      case 'list':
        return (
          <>
            <ul className='space-y-4 xl:space-y-8'>
              {content.value.map((description) => (
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
        );
      case 'table':
        return <CustomTable value={content.value} />;
      case 'string':
        return (
          <p className='text-grey-text text-lg 2xl:text-2xl leading-snug '>
            {content.value}
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <AccordionItem
      value={`item-${title}`}
      className='bg-lightest-blue/25 rounded-2xl'
    >
      <AccordionTrigger
        className='text-dark-blue text-2xl md:text-3xl 2xl:text-4xl relative cursor-pointer p-5 pr-11 md:p-5 2xl:p-7.5 text-left'
        icon={<PlusIcon />}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent className='text-balance pb-6 md:pb-10 flex flex-col p-5 2xl:px-7.5'>
        <div className='w-full'>{renderContent()}</div>
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
