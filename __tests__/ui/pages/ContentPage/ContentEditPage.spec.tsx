import EditContentPage from '@/pages/[content]/[editId]/edit';
import { render, screen } from '@testing-library/react';
import EditBanner4 from '@/src/mock/db/utils/EditContent/EditBanner4.json';
import CreateBannerFieldsData from '@/src/mock/db/utils/getFields/bannerFieldsApi.json';
import useSWR from 'swr';

jest.mock('swr');

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/testrouter',
  }),
}));

describe('ContentEditPage', () => {
  const expectDefaultValue = EditBanner4.module[0].data;

  (useSWR as jest.Mock).mockImplementation((url) => ({
    data: url.includes('getFields') ? CreateBannerFieldsData : EditBanner4,
  }));

  beforeEach(() => render(<EditContentPage />));

  it('should have delete button, title and list link', () => {
    const deleteButton = screen.queryByRole('button', { name: '刪除首頁底圖' }) as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    const title = screen.queryByRole('heading', { name: '首頁底圖修改' });
    expect(title).toBeInTheDocument();

    const linkButton = screen.queryByRole('link', { name: '首頁底圖列表' });
    expect(linkButton).toBeInTheDocument();
  });

  it('should have 5 fields with default values', async () => {
    const titleInput = screen.queryByRole('textbox');
    expect(titleInput).toHaveValue(expectDefaultValue.title);
    const comboboxes = screen.queryAllByRole('combobox');
    expect(comboboxes).toHaveLength(2);
    // expect(comboboxes[0]).toHaveValue(expectDefaultValue.device);
    expect(comboboxes[1]).toHaveValue(expectDefaultValue.status);
    const orderInput = screen.queryByRole('spinbutton');
    expect(orderInput).toHaveValue(expectDefaultValue.order);
  });
});
