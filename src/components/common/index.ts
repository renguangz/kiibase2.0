import { COLORS } from '@/src/utils';
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

export const StyledButton = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background: none;
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
