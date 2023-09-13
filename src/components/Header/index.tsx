import { Layout } from 'antd';
import styled from 'styled-components';
import { Wrapper } from '../common';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Button } from '../Button';
import { useCallback, useState } from 'react';
import { useLogout } from '@/hooks';

const { Header } = Layout;

const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export function HeaderComponent() {
  const [showAuthButtons, setShowAuthButtons] = useState(false);

  const { handleLogout } = useLogout();

  const logout = useCallback(() => {
    handleLogout();
    setShowAuthButtons(() => false);
  }, [handleLogout, setShowAuthButtons]);

  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: '#ffffff' }}>
      <Wrapper>
        <div>logo</div>
        {/*
        <Button title="auth" onClick={() => setShowAuthButtons((show) => !show)}>
          <AuthWrapper>
            <UserOutlined />
            <DownOutlined />
          </AuthWrapper>
        </Button>
        */}
      </Wrapper>
      {showAuthButtons && (
        <div>
          <button>修改密碼</button>
          <button type="button" onClick={logout}>
            登出
          </button>
        </div>
      )}
    </Header>
  );
}
