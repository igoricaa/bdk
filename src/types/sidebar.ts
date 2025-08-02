import { ComponentType } from 'react';

export interface SidebarItem {
  id: string;
  title: string;
  slug: string;
  children?: SidebarItem[];
  count?: number;
}

export interface SidebarSection {
  id: string;
  title: string;
  icon?: ComponentType<{ className?: string }>;
  items: SidebarItem[];
  basePath: string;
  defaultOpen?: boolean;
}

export interface GenericSidebarProps {
  sections: SidebarSection[];
  mobileTitle: string;
  mobileOnly?: boolean;
  className?: string;
  forPosts?: boolean;
  // Optional controlled accordion props
  accordionValue?: string;
  onAccordionValueChange?: (value: string) => void;
}

export interface CategoriesTransformResult {
  sections: SidebarSection[];
  mobileTitle: string;
}
