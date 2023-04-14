import { act, render, screen } from '@testing-library/react';
import ContentCreatePage from '@/pages/[content]/create';
import userEvent from '@testing-library/user-event';
import CreateCatalog from '@/src/mock/db/utils/CreateContent/CreateCatalog';
import CreateBanner from '@/src/mock/db/utils/CreateContent/CreateBanner';
import CreateBannerFieldsData from '@/src/mock/db/utils/getFields/bannerFields';
import useSWR from 'swr';

window.watchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/testrouter',
  }),
}));

jest.mock('swr', () => jest.fn());

describe('ContentCreatePage', () => {
  const setup = (queryTitle: string, queryLink: string, mockCreateContentData: any) => {
    (useSWR as jest.Mock).mockImplementation((url) => {
      return {
        data: url.includes('getFields') ? CreateBannerFieldsData : mockCreateContentData,
      };
    });

    render(<ContentCreatePage />);
    const title = screen.queryByRole('heading', { name: queryTitle });
    const linkButton = screen.queryByRole('link', { name: queryLink }) as HTMLLinkElement;
    const submitButton = screen.getByRole('button', { name: '確定' }) as HTMLButtonElement;
    return { title, linkButton, submitButton };
  };

  describe('Banner', () => {
    let result: {
      title: HTMLElement | null;
      linkButton: HTMLLinkElement;
      submitButton: HTMLButtonElement;
    };
    beforeEach(() => {
      result = setup('首頁底圖建立', '首頁底圖列表', CreateBanner);
    });
    it('should have title `首頁底圖建立` and link `首頁底圖列表`', async () => {
      const { title, linkButton } = result;
      expect(title).toBeInTheDocument();
      expect(linkButton).toBeInTheDocument();
      expect(linkButton.href).toContain('/banner');
      userEvent.click(linkButton);
      expect(window.location.href).not.toContain('create');
    });

    it('should have disabled button when page finished loading', () => {
      const { submitButton } = result;
      expect(submitButton).toBeDisabled();
    });

    it('should not disable confirm button if required fields were all filled', () => {
      // const { submitButton } = result;
      // 填完資料
      // expect(submitButton).not.toBeDisabled();
    });

    it('button should disable after clicking and enable after changing filled data', () => {
      // const { submitButton } = result;
      // 填完資料
      // expect(submitButton.disabled).toBeFalsy();
      // act(() => {
      //   // 如果點擊可能會有報錯，例如資料填寫有錯誤才需要下面這段
      //   userEvent.click(submitButton);
      //   expect(submitButton.disabled).toBeTruthy();
      //   // userEvent.type()
      //   expect(submitButton.disabled).toBeFalsy();
      // userEvent.clear()
    });

    it('button should enable after filled up required field and disabled after clearing any required fields', () => {
      // const { submitButton } = result;
      // // 填完資料
      // expect(submitButton).toBeEnabled();
      // act(() => {
      //   // clear input
      //   // userEvent.clear()
      //   expect(submitButton).toBeDisabled();
      //   // add one word to the same input
      //   expect(submitButton).toBeEnabled();
      // });
    });
  });

  describe('Catalog', () => {
    let result: any;
    beforeEach(() => {
      result = setup('電子型錄建立', '電子型錄列表', CreateCatalog);
    });

    it('should have title `電子型錄建立` and link `電子型錄列表`', async () => {
      const { title, linkButton } = result;
      expect(title).toBeInTheDocument();
      expect(linkButton).toBeInTheDocument();
      expect(linkButton.href).toContain('/catalog');
      userEvent.click(linkButton);
      expect(window.location.href).not.toContain('create');
    });

    it.todo('should route to Catalog List page if required fields were filled');
    it.todo('should stop and show error hints if required fields were not filled');
  });
});
