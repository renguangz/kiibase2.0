import React from 'react';
import AppMenuitem from './AppMenuitem';
import { MenuProvider } from './context/menucontext';
import { useSidebar } from '@/src/utils/hooks';

const AppMenu = () => {
  const { naviItemData } = useSidebar();

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {naviItemData.map((item, i) => (
          <AppMenuitem item={item} root={true} index={i} key={item.label} />
        ))}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
