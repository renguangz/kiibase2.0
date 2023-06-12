import { useSidebar } from '@/src/utils/hooks';
import { PanelMenu } from 'primereact/panelmenu';

export function SidebarComponent() {
  const { naviItemData } = useSidebar();

  return (
    <div style={{ height: '100%' }}>
      <PanelMenu model={naviItemData} style={{ height: '100%' }} />
    </div>
  );
}
