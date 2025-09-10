import GenericSidebar from '@/src/components/ui/generic-sidebar';
import { ServiceData } from '@/src/types/service';
import { transformRelatedExpertise } from '@/src/lib/utils/sidebar-transformers';

interface SidebarProps {
  currentService: ServiceData;
  className?: string;
  serviceType: 'practice' | 'industry' | 'foreign-desk';
  mobileOnly?: boolean;
}

const Sidebar = ({
  currentService,
  serviceType,
  className,
  mobileOnly,
}: SidebarProps) => {
  // Filter out unexpanded references and only use expanded ones
  const expandedRelatedExpertise = (currentService.relatedExpertise || [])
    .filter((item: any) => item && typeof item === 'object' && 'title' in item && 'slug' in item)
    .map((item: any) => ({
      _type: item._type,
      title: item.title,
      slug: { current: item.slug?.current || item.slug }
    }));

  const sections = transformRelatedExpertise({
    relatedExpertise: expandedRelatedExpertise,
    currentServiceType: serviceType,
  });

  return (
    <GenericSidebar
      sections={sections}
      mobileTitle={currentService?.title || 'Expertise'}
      className={className}
      mobileOnly={mobileOnly}
    />
  );
};

export default Sidebar;
