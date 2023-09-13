import type { LayoutContextProps } from '@/types/types';
import type { ComponentProps } from 'react';
import { useState, createContext, useContext } from 'react';

const initialLayoutConfig: LayoutContextProps['layoutConfig'] = {
  ripple: false,
  inputStyle: 'outlined',
  menuMode: 'static',
  colorScheme: 'light',
  theme: 'lara-light-indigo',
  scale: 14,
};

const initialLayoutState: LayoutContextProps['layoutState'] = {
  staticMenuDesktopInactive: false,
  overlayMenuActive: false,
  profileSidebarVisible: false,
  configSidebarVisible: false,
  staticMenuMobileActive: false,
  menuHoverActive: false,
};

export const RwdContext = createContext<LayoutContextProps>(null!);

type Props = Omit<ComponentProps<typeof RwdContext.Provider>, 'value'>;

export function RwdConfig({ children }: Props) {
  const [layoutConfig, setLayoutConfig] = useState({ ...initialLayoutConfig });

  const [layoutState, setLayoutState] = useState({ ...initialLayoutState });
  const onMenuToggle = () => menuToggle({ layoutConfig, layoutState, setLayoutConfig, setLayoutState });
  const showProfileSidebar = () => profileSidebar({ setLayoutState });

  const context: LayoutContextProps = {
    layoutConfig,
    setLayoutConfig,
    layoutState,
    setLayoutState,
    onMenuToggle,
    showProfileSidebar,
  };

  return <RwdContext.Provider value={context}>{children}</RwdContext.Provider>;
}

export function useRwdConfig() {
  return useContext(RwdContext);
}

// inner function
function isOverlay(config: LayoutContextProps['layoutConfig']) {
  return config.menuMode === 'overlay';
}

function isDesktop() {
  return window.innerWidth > 991;
}

function menuToggle(
  context: Pick<LayoutContextProps, 'layoutConfig' | 'layoutState' | 'setLayoutConfig' | 'setLayoutState'>,
) {
  const { layoutConfig, layoutState, setLayoutConfig, setLayoutState } = context ?? {};
  if (isOverlay(layoutConfig)) {
    setLayoutState((prev) => ({
      ...prev,
      overlayMenuActive: !prev.overlayMenuActive,
    }));
  }
  if (isDesktop()) {
    setLayoutState((prev) => ({
      ...prev,
      staticMenuDesktopInactive: !prev.staticMenuDesktopInactive,
    }));
  } else {
    setLayoutState((prev) => ({
      ...prev,
      staticMenuMobileActive: !prev.staticMenuMobileActive,
    }));
  }
}

function profileSidebar(context: Pick<LayoutContextProps, 'setLayoutState'>) {
  const { setLayoutState } = context;
  setLayoutState((prev) => ({
    ...prev,
    profileSidebarVisible: !prev.profileSidebarVisible,
  }));
}
