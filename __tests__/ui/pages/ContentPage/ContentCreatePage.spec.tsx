import { render, screen } from '@testing-library/react';
import ContentCreatePage from '@/pages/[content]/create';
import userEvent from '@testing-library/user-event';
import { useCreateContent } from '@/src/utils/hooks/useCreateContent';
import CreateCatalog from '@/src/mock/db/utils/CreateContent/CreateCatalog';
import CreateBanner from '@/src/mock/db/utils/CreateContent/CreateBanner';

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

jest.mock('@/src/utils/hooks/useCreateContent');

describe('ContentCreatePage', () => {
  const setup = (queryTitle: string, queryLink: string, mockCreateContentData: any) => {
    const mockUseCreateContent = useCreateContent as jest.MockedFunction<typeof useCreateContent>;
    mockUseCreateContent.mockReturnValue({
      data: mockCreateContentData,
    });

    render(<ContentCreatePage />);
    const title = screen.queryByRole('heading', { name: queryTitle });
    const linkButton = screen.queryByRole('link', { name: queryLink }) as HTMLLinkElement;
    const submitButton = screen.getByRole('button', { name: '確定' });
    return { title, linkButton, submitButton };
  };

  describe('Banner', () => {
    let result: any;
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

    it.todo('should route to Banner List page if required fields were filled');
    it.todo('should stop and show error hints if required fields were not filled');
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
