import EditContentPage from '@/pages/[content]/[editId]/edit';
import { render, screen } from '@testing-library/react';
import EditBanner4 from '@/src/mock/db/utils/EditContent/EditBanner4.json';
import CreateBannerFieldsData from '@/src/mock/db/utils/getFields/bannerFieldsApi.json';
import useSWR from 'swr';
import userEvent from '@testing-library/user-event';
import * as mockFetch from '@/src/utils/fetch';

jest.mock('swr');

const routerPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/testrouter/15/edit',
    query: { editId: '15' },
    push: routerPush,
  }),
}));

jest.mock('../../../../src/utils/fetch');

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
    expect(screen.queryByText('桌機版')).toBeInTheDocument();
    expect(screen.queryByText('下架')).toBeInTheDocument();
    const orderInput = screen.queryByRole('spinbutton');
    expect(orderInput).toHaveValue(expectDefaultValue.order);
  });

  it('should open confirm modal and close it after clicking cancel button', async () => {
    const deleteButton = screen.getByRole('button', { name: '刪除首頁底圖' });
    await userEvent.click(deleteButton);

    const modal = screen.queryByRole('alert');
    expect(modal).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: '取消' });
    await userEvent.click(cancelButton);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should open confirm modal then call delete api and change route to list page after clicking delete confirm button', async () => {
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();

    const deleteButton = screen.getByRole('button', { name: '刪除首頁底圖' });
    await userEvent.click(deleteButton);

    const modal = screen.queryByRole('alert');
    expect(modal).toBeInTheDocument();

    const confirmButton = screen.getByRole('button', { name: '確認刪除' });
    await userEvent.click(confirmButton);

    expect(mockFetch.fetchDeleteData).toHaveBeenCalled();
    expect(mockFetch.fetchDeleteData).toHaveBeenCalledWith(expect.stringContaining('api/testrouter/15'));

    expect(routerPush).toHaveBeenCalled();
    expect(routerPush).toHaveBeenCalledWith('/testrouter/');
  });
});
