import styled from 'styled-components';
import { Code, MarkdownTable, TogglePara } from '/src/components/Markdowns';
import { CodeData } from '/src/utils/data/readme/codes';
import { TableColumns, TableData } from '/src/utils/data/readme/tables';

const Wrapper = styled.div`
  background: #0d1116;
  width: 100%;
  min-height: 100vh;
  padding: 16px 32px;
`;

const Title = styled.h1`
  color: #e6edf3;
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  border-bottom: 1px solid #30363d;
  margin: 0;
  margin-bottom: 16px;
  padding-bottom: 5px;
`;

const Title2 = styled.h2`
  color: #e6edf3;
  padding-bottom: 5px;
  border-bottom: 1px solid #30363d;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 16px;
`;

export const Para = styled.p`
  color: #e6edf3;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

export const CodeText = styled.code`
  background: #343941;
  color: #e6edf3;
  padding: 3px 6px;
  border-radius: 6px;
  margin: 0 4px;
  fonit-size: 13px;
`;

export default function ReadmePage() {
  return (
    <Wrapper>
      <Title>KiiBase v2.0</Title>
      <Title2>What is this?</Title2>
      <Para>讓後端開發者可以透過 api 決定後台需要的元件，讓後端人員能夠更專注在處理後端邏輯</Para>
      <Title2>Auth</Title2>
      <TogglePara element={<Code contents={CodeData.postLogin} />}>
        <Para>
          登入 API Example：<CodeText>method: POST, endpoint: /api/login</CodeText>
        </Para>
      </TogglePara>
      <Title2>NavItem</Title2>
      <TogglePara element={<Code contents={CodeData.getNaviItem} />}>
        <Para>
          側邊欄資料 API Example：<CodeText>method: GET, endpoint: /api/naviItem</CodeText>
        </Para>
      </TogglePara>
      <Para>目前路由都只能單一層</Para>
      <Title2>getConfig</Title2>
      <Para>
        列表頁、新增頁渲染元件設定：<CodeText>method: GET, endpoint: /api/{'{model}'}/getConfig</CodeText>
      </Para>
      <Para>
        編輯渲染元件設定：
        <CodeText>
          method: GET, endpoint: /api/{'{model}'}/{'{id}'}/getConfig
        </CodeText>
      </Para>
      <TogglePara element={<Code contents={CodeData.getConfig} />}>
        <Para>API Example</Para>
      </TogglePara>
      <Title2>List Page</Title2>
      <Title2>Create Page</Title2>
      <Title2>Edit Page</Title2>
      <Title2>Components</Title2>
      <TogglePara
        element={<MarkdownTable columns={TableColumns.listPageComponent} dataSource={TableData.listPageComponent} />}
      >
        <Para>列表頁欄位對照</Para>
      </TogglePara>
      <TogglePara
        element={
          <MarkdownTable columns={TableColumns.detailPageComponent} dataSource={TableData.detailPageComponent} />
        }
      >
        <Para>內頁欄位對照</Para>
      </TogglePara>
    </Wrapper>
  );
}
