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
  width: 100%;
  height: 100%;
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
