'use client';

import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { NavigationRoute } from '@/lib/utils/navigation-routes';
import { cn } from '@/lib/utils';
import { urlFor } from '@/sanity/lib/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { TransitionLink } from '@/components/transition-link';

const navMenuTriggerClasses = cn(
  'group inline-flex h-9 gap-x-1 w-max items-center justify-center rounded-md bg-background text-sm font-medium hover:bg-light-blue-bg hover:text-light-blue focus:bg-light-blue-bg focus:text-light-blue disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-light-blue-bg data-[state=open]:text-light-blue data-[state=open]:focus:bg-light-blue-bg data-[state=open]:bg-light-blue-bg/50 focus-visible:ring-ring/50 outline-none transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1'
);

const BDKnowledgeMenu = ({
  bdknowledgeRoute,
}: {
  bdknowledgeRoute: NavigationRoute;
}) => {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<NavigationRoute>({
    label: 'BDKnowledge',
    href: '',
  });

  const isBDKnowledgeActive = () => {
    return (
      pathname.startsWith('/bdknowledge') ||
      pathname.startsWith('/blog') ||
      pathname.startsWith('/digital-watch') ||
      pathname.startsWith('/insights') ||
      pathname.startsWith('/publications')
    );
  };

  return (
    <NavigationMenuItem value='BDKnowledge'>
      <NavigationMenuTrigger
        className={cn(
          navMenuTriggerClasses,
          isBDKnowledgeActive() && 'bg-light-blue-bg text-light-blue'
        )}
      >
        <span>{bdknowledgeRoute.label}</span>
      </NavigationMenuTrigger>
      <NavigationMenuContent className='absolute! top-19! mt-0!'>
        <TransitionLink href={bdknowledgeRoute.href as string}>
          <article
            key={bdknowledgeRoute.label}
            className={`relative bg-dark-blue rounded-2xl overflow-hidden p-4 w-full h-30 cursor-pointer`}
          >
            <img
              src={urlFor(
                bdknowledgeRoute.illustration?.desktop as SanityImageSource
              ).url()}
              alt={bdknowledgeRoute.label}
              className={`absolute object-cover right-10 bottom-0 h-full`}
            />
            <h3 className='text-lg text-white'>{bdknowledgeRoute.label}</h3>
          </article>
        </TransitionLink>
        <div className='grid grid-cols-[min-content_min-content] gap-2 mt-2'>
          {bdknowledgeRoute.subRoutes?.map((item, index) => {
            const borderRadius =
              index === 0 || index === 3
                ? 'rounded-bl-[50px] rounded-tr-[50px]'
                : 'rounded-tl-[50px] rounded-br-[50px]';

            const bgImgClasses =
              index === 0
                ? 'h-full aspect-[156/309] right-12 top-0'
                : index === 1
                  ? 'bottom-0 right-15 w-47 aspect-[234/193]'
                  : index === 2
                    ? 'w-55 aspect-[271/151] right-0 bottom-0'
                    : 'w-50 aspect-[251/231] right-0 top-1/2 -translate-y-1/2';

            return (
              <TransitionLink
                href={item.href as string}
                key={item.label}
                pageName={item.label}
              >
                <article
                  className={`relative bg-dark-blue ${borderRadius} overflow-hidden p-4 aspect-[530/308] h-30 cursor-pointer`}
                >
                  <img
                    src={urlFor(
                      item.illustration?.desktop as SanityImageSource
                    ).url()}
                    alt={item.label}
                    className={`absolute object-cover ${bgImgClasses}`}
                  />
                  <h3 className='text-lg text-white'>{item.label}</h3>
                </article>
              </TransitionLink>
            );
          })}
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};

export default BDKnowledgeMenu;
