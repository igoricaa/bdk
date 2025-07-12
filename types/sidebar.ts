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
  icon: ComponentType<{ className?: string }>;
  items: SidebarItem[];
  basePath: string;
  defaultOpen?: boolean;
}

export interface GenericSidebarProps {
  sections: SidebarSection[];
  mobileTitle: string;
  mobileOnly?: boolean;
  className?: string;
  onCategoryClick?: (categorySlug: string) => void; // For client-side category selection
  isClientSide?: boolean; // Whether to use client-side clicks instead of links
}

export interface CategoriesTransformResult {
  sections: SidebarSection[];
  mobileTitle: string;
}
