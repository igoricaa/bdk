import {
  SidebarSection,
  SidebarItem,
  CategoriesTransformResult,
} from '@/src/types/sidebar';
import { CategoryWithChildren } from '@/src/lib/utils';
import ServicesIcon from '@/src/components/ui/icons/services-icon';
import IndustriesIcon from '@/src/components/ui/icons/industries-icon';
import ForeignDesksIcon from '@/src/components/ui/icons/foreign-desks-icon';

// Transform services data (practices, industries, foreign desks) to SidebarSection[]
export function transformServicesData({
  practices,
  industries,
  foreignDesks,
  currentServiceType,
}: {
  practices: Array<{ title: string; slug: { current: string } }>;
  industries: Array<{ title: string; slug: { current: string } }>;
  foreignDesks: Array<{ title: string; slug: { current: string } }>;
  currentServiceType: 'practice' | 'industry' | 'foreign-desk';
}): SidebarSection[] {
  return [
    {
      id: 'practice',
      title: 'Practices',
      icon: ServicesIcon,
      items: practices.map((practice) => ({
        id: practice.slug.current,
        title: practice.title,
        slug: practice.slug.current,
      })),
      basePath: '/practices',
      defaultOpen: currentServiceType === 'practice',
    },
    {
      id: 'industry',
      title: 'Industries',
      icon: IndustriesIcon,
      items: industries.map((industry) => ({
        id: industry.slug.current,
        title: industry.title,
        slug: industry.slug.current,
      })),
      basePath: '/industries',
      defaultOpen: currentServiceType === 'industry',
    },
    {
      id: 'foreign-desk',
      title: 'Foreign Desks',
      icon: ForeignDesksIcon,
      items: foreignDesks.map((desk) => ({
        id: desk.slug.current,
        title: desk.title,
        slug: desk.slug.current,
      })),
      basePath: '/foreign-desks',
      defaultOpen: currentServiceType === 'foreign-desk',
    },
  ];
}

// Transform category tree to SidebarSection[]
export function transformCategoriesData(
  categoryTree: CategoryWithChildren
): CategoriesTransformResult {
  const transformCategoryToSidebarItem = (
    category: CategoryWithChildren
  ): SidebarItem => ({
    id: category._id,
    title: category.name,
    slug: category.slug.current,
    count: category.postCount,
    children:
      category.children && category.children.length > 0
        ? category.children.map(transformCategoryToSidebarItem)
        : undefined,
  });

  // Transform first-level children into accordion sections
  const sections: SidebarSection[] = categoryTree.children.map(
    (child, index) => ({
      id: child._id,
      title: child.name,
      items:
        child.children.length > 0
          ? child.children.map(transformCategoryToSidebarItem)
          : [
              {
                id: child._id,
                title: child.name,
                slug: child.slug.current,
                count: child.postCount,
              },
            ],
      basePath: '/blog?category=',
      defaultOpen: index === 0, // First section open by default
    })
  );

  // If no children, fall back to showing the main category as a section
  if (sections.length === 0) {
    sections.push({
      id: categoryTree._id,
      title: categoryTree.name,
      items: [
        {
          id: categoryTree._id,
          title: categoryTree.name,
          slug: categoryTree.slug.current,
          count: categoryTree.postCount,
        },
      ],
      basePath: '/blog?category=',
      defaultOpen: true,
    });
  }

  return {
    sections,
    mobileTitle: categoryTree.name,
  };
}
