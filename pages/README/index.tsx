import styled from 'styled-components';
import { Code, MarkdownTable, TogglePara } from '/src/components/Markdowns';
import { CodeData } from '/src/utils/data/readme/codes';
import { TableColumns, TableData } from '/src/utils/data/readme/tables';
import { Button } from 'primereact/button';

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

const FixedButton = styled.a`
  all: unset;
  position: fixed;
  z-index: 10;
  bottom: 32px;
  right: 32px;
`;

export default function ReadmePage() {
  return (
    <Wrapper>
      <FixedButton target="_blank" href="/demo">
        <Button type="button">Demo</Button>
      </FixedButton>
      <Title>KiiBase v2.0</Title>
      <Para>
        Kiibase v2.0 是一個後台系統，透過 API
        傳遞設定檔，快速生成後台畫面，讓後端開發者能夠專注於後端開發，無需等待前端介入。只需簡單地創建模組並設定相關參數，就能輕鬆生成所需的後台界面，提高開發效率，節省時間和資源。這個系統的目的是讓開發流程更加順暢，減少前後端協作的瓶頸，讓開發工作更加高效。
      </Para>
      <Title2>Auth</Title2>
      <TogglePara element={<Code contents={CodeData.postLogin} />}>
        <Para>
          登入 API Example：<CodeText>method: POST, endpoint: /api/login</CodeText>
        </Para>
      </TogglePara>
      <TogglePara element={<Code contents={CodeData.registerUser} />}>
        <Para>
          註冊使用者(目前沒有在前端上面實作，若要創建使用者，前端可以在 Create Page 完成) API Example：
          <CodeText>method: POST, endpoint: /api/register</CodeText>
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
        編輯渲染元件設定 API Example：
        <CodeText>
          method: GET, endpoint: /api/{'{model}'}/{'{id}'}/getConfig
        </CodeText>
      </Para>
      <TogglePara element={<Code contents={CodeData.getConfig} />}>
        <Para>API Example</Para>
      </TogglePara>
      <Title2>List Page</Title2>
      <Para>
        需呼叫 <CodeText>/api/{'{ model }'}/getConfig</CodeText>
      </Para>
      <TogglePara element={<Code contents={CodeData.getListPage} />}>
        <Para>
          取得列表資料 API Example： <CodeText>method: GET, endpoint: /api/{'{model}'}</CodeText>
        </Para>
      </TogglePara>
      <Title2>Create Page</Title2>
      <Para>
        需呼叫 <CodeText>/api/{'{model}'}/getConfig</CodeText>
      </Para>
      <TogglePara element={<Code contents={CodeData.postCreatePage} />}>
        <Para>
          確定新增資料 API Example：<CodeText>method: POST, endpoint: /api/{'{model}'}</CodeText>
        </Para>
      </TogglePara>
      <Title2>Edit Page</Title2>
      <Para>
        需呼叫{' '}
        <CodeText>
          /api/{'{model}'}/{'id'}/getConfig
        </CodeText>
      </Para>
      <TogglePara element={<Code contents={CodeData.putUpdatePage} />}>
        <Para>
          確定更新資料 API Example：
          <CodeText>
            method: PUT, endpoint: /api/{'{model}'}/{'id'}
          </CodeText>
        </Para>
      </TogglePara>
      <TogglePara element={<Code contents={CodeData.deleteData} />}>
        <Para>
          刪除該筆資料 API Example：
          <CodeText>
            method: PUT, endpoint: /api/{'{model}'}/{'id'}
          </CodeText>
        </Para>
      </TogglePara>
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
