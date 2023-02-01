import { ComponentTypes } from 'src/utils';
import { StyledButton } from '../common';

interface ButtonProps extends ComponentTypes {
  type?: 'button' | 'submit';
}

export function Button({ children, type = 'button' }: ButtonProps) {
  return <StyledButton type={type}>{children}</StyledButton>;
}
