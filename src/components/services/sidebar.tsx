import GenericSidebar from '@/src/components/ui/generic-sidebar';
import { ServiceData } from '@/src/types/service';
import { transformServicesData } from '@/src/lib/utils/sidebar-transformers';

interface SidebarProps {
  currentService: ServiceData;
  practices: Array<{ title: string; slug: { current: string } }>;
  industries: Array<{ title: string; slug: { current: string } }>;
  foreignDesks:
    | Array<{ title: string; slug: { current: string } }>
    | Array<{ title: string; slug: { current: string } }>;
  className?: string;
  serviceType: 'practice' | 'industry' | 'foreign-desk';
  mobileOnly?: boolean;
}

const Sidebar = ({
  currentService,
  practices,
  industries,
  foreignDesks,
  serviceType,
  className,
  mobileOnly,
}: SidebarProps) => {
  const sections = transformServicesData({
    practices,
    industries,
    foreignDesks,
    currentServiceType: serviceType,
  });

  return (
    <GenericSidebar
      sections={sections}
      mobileTitle={currentService?.title || 'Services'}
      className={className}
      mobileOnly={mobileOnly}
    />
  );
};

export default Sidebar;
