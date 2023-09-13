import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from '@/contexts/menucontext';
import { useSidebar } from '@/hooks';

const AppMenu = () => {
  const { naviItemData } = useSidebar();

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {naviItemData.map((item, i) => (
          <div key={`${item.link}-${i}`}>
            <AppMenuitem item={item} root={true} index={i} key={i} />
          </div>
        ))}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
