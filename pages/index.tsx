/*
 * @TODO
 * 1. 新增 Select 選擇完去 call api 拿到其他資料 (role 頁面在選擇完 modules 之後去拿到所有的 api_functions)
 * 2. 重設密碼 api 實作(Backend)
 * */
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: #0d1c29;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 600px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-top: 24px;
`;

export default function HomePage() {
  const router = useRouter();
  return (
    <Wrapper>
      <ContentWrapper>
        <Image src="/banner.jpg" alt="banner" width={600} height={337} />
        <ButtonsWrapper>
          <Button
            onClick={() => router.push('/doc')}
            type="button"
            outlined
            style={{ width: 100, display: 'flex', justifyContent: 'center', color: '#24526D', borderColor: '#24526D' }}
          >
            Doc
          </Button>
          <Button
            onClick={() => router.push('/demo')}
            type="button"
            style={{
              width: 100,
              display: 'flex',
              justifyContent: 'center',
              background: '#24526D',
              borderColor: '#24526D',
            }}
          >
            Demo
          </Button>
        </ButtonsWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}
