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
          <div>
            <AppMenuitem item={item} root={true} index={i} key={i} />
          </div>
        ))}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
