import { useState } from 'react';
import styled from 'styled-components';

const ParaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  cursor: pointer;
`;

interface IconButtonProps {
  show: boolean;
}

const IconButton = styled.i<IconButtonProps>`
  color: #e6edf3;
  font-size: 12px;
  transform: rotate(${(props) => (props.show ? 90 : 0)}deg);
`;

export interface ToggleParaProps {
  element: JSX.Element;
  children: JSX.Element;
}

export function TogglePara({ element, children }: ToggleParaProps) {
  const [showCode, setShowCode] = useState(false);

  const toggleCodeDisplay = () => {
    setShowCode((show) => !show);
  };

  return (
    <>
      <ParaWrapper onClick={toggleCodeDisplay}>
        <IconButton show={showCode} className="pi pi-chevron-right" />
        {children}
      </ParaWrapper>
      {showCode && element}
    </>
  );
}
