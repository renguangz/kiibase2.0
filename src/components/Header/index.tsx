import { Layout } from 'antd';
import styled from 'styled-components';
import { Wrapper } from '../common';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Button } from '../Button';

const { Header } = Layout;

const AuthWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export function HeaderComponent() {
  return (
    <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: '#ffffff' }}>
      <Wrapper>
        <div>logo</div>
        <Button>
          <AuthWrapper>
            <UserOutlined />
            <DownOutlined />
          </AuthWrapper>
        </Button>
      </Wrapper>
    </Header>
  );
}
