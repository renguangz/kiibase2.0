import { SPACES } from '@/src/utils';
import { Typography } from 'antd';
import styled from 'styled-components';
import { BottomBorder, Wrapper } from '../../common';

const ContentHeaderWrapper = styled(Wrapper)`
  height: auto;
  flex-direction: column;
`;

interface ContentHeaderProps {
  text: string;
  button?: React.ReactNode;
}

export function ContentHeader({ text, button }: ContentHeaderProps) {
  return (
    <ContentHeaderWrapper>
      <Wrapper>
        <Typography>{text}</Typography>
        {button}
      </Wrapper>
      <BottomBorder height={SPACES['space-24']} />
    </ContentHeaderWrapper>
  );
}
