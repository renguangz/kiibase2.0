import { Layout } from 'antd';
import { Wrapper } from '../common';
import { useCallback, useState } from 'react';
import { useLogout } from '@/hooks';

const { Header } = Layout;

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
