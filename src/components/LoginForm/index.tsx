import { COLORS } from '@/src/utils';
import { useLogin } from '@/src/utils/hooks';
import Link from 'next/link';
import styled from 'styled-components';
import { StyledButton } from '../common';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 268px;
  gap: 8px;
`;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Title = styled.h2`
  margin: 0;
  color: #000;
  font-size: 24px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 4px;
`;

export const Label = styled.h5`
  font-size: 15px;
  margin: 0;
  color: #000;
`;

export const Input = styled.input`
  all: unset;
  background: #fff;
  border: 1px solid ${COLORS.lightGray};
  height: 30px;
  padding: 0 8px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export function Loginform() {
  const { account, setAccount, password, setPassword, handleLogin, loginDisabled } = useLogin();

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>登入</Title>
      </TitleWrapper>
      <InputWrapper>
        <Label>帳號</Label>
        <Input data-testid="authAccount" value={account} onChange={(e) => setAccount(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <Label>密碼</Label>
        <Input
          data-testid="authPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </InputWrapper>
      <ButtonWrapper>
        <StyledButton data-testid="authLogin" type="button" onClick={handleLogin} disabled={loginDisabled}>
          登入
        </StyledButton>
      </ButtonWrapper>
    </Wrapper>
  );
}
