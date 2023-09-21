import { Button } from 'primereact/button';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #161b22;
  padding: 16px;
  font-size: 85%;
  line-height: 1.45;
  width: 100%;
  border-radius: 6px;
  margin-bottom: 16px;
`;

const PasteButton = styled(Button)`
  position: absolute;
  right: 40px;
  transform: translate(0, -8px) rotate(90deg);
  width: 32px;
  height: 34px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

interface CodeTextProps {
  color?: 'white' | 'orange' | 'blue' | 'numberBlue' | 'green' | 'comment';
  customColor?: string;
  tabs?: number;
}

const CodeText = styled.span<CodeTextProps>`
  padding-left: ${(props) => (props.tabs || 0) * 15}px;
  font-size: 13.6px;
  color: ${(props) =>
    props.color === 'green'
      ? '#7ee787'
      : props.color === 'orange'
      ? '#CE9178'
      : props.color === 'blue'
      ? '#79c0ff'
      : props.color === 'numberBlue'
      ? '#79c0ff'
      : props.color === 'comment'
      ? '#8b949e'
      : '#e6edf3'};
`;

export interface CodeTextType extends CodeTextProps {
  type: 'wrap' | 'text';
  text: string;
}

export const areCodeTextType = (obj: unknown): obj is CodeTextType[] => {
  if (obj && typeof obj === 'object' && Array.isArray(obj)) return obj.every((item) => item.type);
  return false;
};

export interface CodeProps {
  contents: CodeTextType[];
}

export function Code({ contents }: CodeProps) {
  return (
    <Wrapper>
      <PasteButton type="button" outlined icon="pi pi-clone" severity="secondary"></PasteButton>
      <ContentWrapper>
        <pre>
          {contents.map((content, index) =>
            content.type === 'text' ? (
              <CodeText key={index} tabs={content.tabs} color={content.color} customColor={content.customColor}>
                {content.text}
              </CodeText>
            ) : (
              <br key={index} />
            ),
          )}
        </pre>
      </ContentWrapper>
    </Wrapper>
  );
}
