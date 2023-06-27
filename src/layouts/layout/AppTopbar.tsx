/* eslint-disable @next/next/no-img-element */

import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { AppTopbarRef } from '@/src/types/types';
import { LayoutContext } from './context/layoutcontext';
import styled from 'styled-components';
import { OutsideClickHandler } from '@/src/components';
import { useRouter } from 'next/router';
import { useLogout } from '@/src/utils/hooks';
import { COLORS } from '@/src/utils';
import { StyledButton } from '@/src/components/common';

const ProfileListWrapper = styled.ul`
  background: #fff;
  list-style: none;
  border: 1px solid ${COLORS.lightGray};
  padding: 10px 0;
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProfileList = styled.li`
  width: 100%;
  cursor: pointer;
`;

const AppTopbar = forwardRef<AppTopbarRef>((_props, ref) => {
  const router = useRouter();
  const { push } = router;

  const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const wrapperRef = useRef<HTMLDivElement>(null!);

  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));

  const { handleLogout } = useLogout();

  const [showProfileList, setShowProfileList] = useState(false);

  const profiles = useMemo(
    () => [
      { name: '更改密碼', onClick: () => push('/auth/reset-password') },
      { name: '登出', onClick: () => handleLogout() },
    ],
    [push, handleLogout],
  );

  return (
    <div className="layout-topbar">
      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames('layout-topbar-menu', {
          'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
        })}
      >
        <div ref={wrapperRef}>
          <button
            type="button"
            className="p-link layout-topbar-button"
            onClick={() => setShowProfileList((show) => !show)}
          >
            <i className="pi pi-user"></i>
            <span>Profile</span>
          </button>
          {showProfileList && (
            <OutsideClickHandler wrapperRef={wrapperRef} onOutsideClick={() => setShowProfileList(false)}>
              <ProfileListWrapper>
                {profiles.map((profile) => (
                  <ProfileList key={profile.name}>
                    <StyledButton type="button" variant="text" onClick={profile.onClick}>
                      {profile.name}
                    </StyledButton>
                  </ProfileList>
                ))}
              </ProfileListWrapper>
            </OutsideClickHandler>
          )}
        </div>
      </div>
    </div>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
