import { ComponentTypes } from '@/utils';
import { StyledButton } from '../common';

interface ButtonProps extends ComponentTypes {
  type?: 'button' | 'submit';
  title?: string;
  onClick: () => void;
}

export function Button({ children, type = 'button', title, onClick }: ButtonProps) {
  return (
    <StyledButton title={title} type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
