import { COLORS } from '@/utils';
import styled from 'styled-components';

type FakeDivType = {
  width?: string;
  height?: string;
};

export const FakeDiv = styled.div<FakeDivType>`
  width: ${(props) => props.width ?? '100%'};
  height: ${(props) => props.height ?? '100%'};
`;

export const Wrapper = styled(FakeDiv)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export type ColorConfig = 'primary' | 'secondary' | 'warning' | 'danger';

export const mapColorFromConfig = (color: ColorConfig) => COLORS[color];

type StyledButtonType = {
  width?: string | number;
  height?: string | number;
  variant?: 'contained' | 'outline' | 'text';
  color?: ColorConfig;
  disabled?: boolean;
};

export const StyledButton = styled.button<StyledButtonType>`
  cursor: ${(props) => (props.disabled ? 'auto' : 'pointer')};
  outline: none;
  border: 1px solid
    ${(props) =>
      props.variant === 'outline' && props.disabled
        ? COLORS.disabledBackground
        : props.variant === 'outline' && !props.disabled
        ? mapColorFromConfig(props.color ?? 'primary')
        : 'transparent'};

  border-radius: none;
  font-family: var(--font-family);
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 17px;
  background: ${(props) =>
    !props.variant
      ? COLORS.primary
      : props.variant !== 'contained'
      ? 'none'
      : props.disabled
      ? COLORS.disabledBackground
      : mapColorFromConfig(props.color ?? 'primary')};
  color: ${(props) =>
    !props.variant || props.variant === 'contained'
      ? '#fff'
      : props.disabled
      ? COLORS.disabledText
      : mapColorFromConfig(props.color ?? 'primary')};
  padding: 8px 12px;
`;

type BottomBorderType = {
  height: number;
  borderColor?: string;
};

export const BottomBorder = styled.div<BottomBorderType>`
  border-bottom: solid 1px ${(props) => props.borderColor ?? COLORS.lightGray};
  width: 100%;
  height: ${(props) => props.height}px;
  margin-bottom: ${(props) => props.height}px;
`;
