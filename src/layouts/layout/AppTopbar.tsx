/* eslint-disable @next/next/no-img-element */
import { classNames } from 'primereact/utils';
import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { AppTopbarRef } from '@/types/types';
import { useRwdConfig } from '@/contexts/rwd-config';
import styled from 'styled-components';
import { OutsideClickHandler } from '@/components';
import { useRouter } from 'next/router';
import { useLogout } from '@/hooks';
import { COLORS } from '@/utils';
import { StyledButton } from '@/components/common';
import Link from 'next/link';

export const Wrapper = styled.div`
  background: #2b3b44;
  height: 60px;
`;

export const LogoImg = styled.img`
  max-height: 32px;
  max-width: 120px;
`;

const ProfileListWrapper = styled.ul`
  background: #fff;
  list-style: none;
  margin: 0;
  margin-top: 6px;
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

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: var(--text-color-secondary);
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: background-color 0.2s;
`;

interface IconProps {
  mouseenter?: boolean;
}

const Icon = styled.i<IconProps>`
  font-size: 1.5rem;
  color: ${(props) => (props.mouseenter ? COLORS.primary : '#fff')};
`;

const AppTopbar = forwardRef<AppTopbarRef>((_props, ref) => {
  const router = useRouter();
  const { push } = router;

  const [mouseenterMenuButton, setMouseenterMenubutton] = useState(false);
  const [mouseenterProfileButton, setMouseenterProfilebutton] = useState(false);

  const { layoutState, onMenuToggle } = useRwdConfig();
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
    <Wrapper className="layout-topbar">
      <Link href="/">
        <LogoImg src="/logo.png" alt="logo" />
      </Link>
      <Button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
        onMouseEnter={() => setMouseenterMenubutton(true)}
        onMouseOut={() => setMouseenterMenubutton(false)}
      >
        <Icon
          className="pi pi-bars"
          mouseenter={mouseenterMenuButton}
          onMouseEnter={() => setMouseenterMenubutton(true)}
          onMouseOut={() => setMouseenterMenubutton(false)}
        />
      </Button>

      <div
        ref={topbarmenuRef}
        className={classNames('layout-topbar-menu', {
          'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible,
        })}
      >
        <div ref={wrapperRef}>
          <Button
            type="button"
            className="p-link layout-topbar-button"
            onClick={() => setShowProfileList((show) => !show)}
            onMouseEnter={() => setMouseenterProfilebutton(true)}
            onMouseOut={() => setMouseenterProfilebutton(false)}
          >
            <Icon
              className="pi pi-user"
              mouseenter={mouseenterProfileButton}
              onMouseEnter={() => setMouseenterProfilebutton(true)}
              onMouseOut={() => setMouseenterProfilebutton(false)}
            ></Icon>
            <span>Profile</span>
          </Button>
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
    </Wrapper>
  );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
