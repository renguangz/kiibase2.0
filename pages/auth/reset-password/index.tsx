import { StyledButton } from '@/src/components/common';
import { ButtonWrapper, Input, InputWrapper, Label, Title, TitleWrapper } from '@/src/components/LoginForm';
import { useResetPassword } from '@/src/utils/hooks';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 268px;
  height: 564px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  gap: 8px;
`;

export default function ResetPasswordPage() {
  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    newConfirmPassword,
    setNewConfirmPassword,
    disabledComfirmButton,
    handleReset,
  } = useResetPassword();

  return (
    <Wrapper>
      <TitleWrapper>
        <Title>重設密碼</Title>
      </TitleWrapper>
      <InputWrapper>
        <Label>舊密碼</Label>
        <Input
          data-testid="oldPassword"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>新密碼</Label>
        <Input
          data-testid="newPassword"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <Label>確認新密碼</Label>
        <Input
          data-testid="newConfirmPassword"
          type="password"
          value={newConfirmPassword}
          onChange={(e) => setNewConfirmPassword(e.target.value)}
        />
      </InputWrapper>
      <ButtonWrapper>
        <StyledButton type="button" disabled={disabledComfirmButton} onClick={handleReset}>
          確認
        </StyledButton>
      </ButtonWrapper>
    </Wrapper>
  );
}