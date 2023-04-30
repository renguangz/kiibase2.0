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

  beforeEach(() => {
    jest.resetAllMocks();

    (useSWR as jest.Mock).mockImplementation((url) => ({
      data: url.includes('getFields') ? CreateBannerFieldsData : EditBanner4,
    }));

    render(<EditContentPage />);
  });

  it('should have delete button, title and list link', () => {
    const deleteButton = screen.queryByRole('button', { name: '刪除首頁底圖' }) as HTMLButtonElement;
    expect(deleteButton).toBeInTheDocument();

    const title = screen.queryByRole('heading', { name: '首頁底圖修改' });
    expect(title).toBeInTheDocument();

    const linkButton = screen.queryByRole('link', { name: '首頁底圖列表' });
    expect(linkButton).toHaveAttribute('href', '/testrouter');
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

  it('should success update with new payload and route to list page', async () => {
    const submitButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
    expect(submitButton).toBeInTheDocument();

    const input = screen.getByRole('textbox') as HTMLInputElement;
    expect(input).toHaveValue('kitchen');
    await userEvent.clear(input);
    await userEvent.type(input, 'test update');
    expect(input).toHaveValue('test update');

    const comboboxes = screen.getAllByRole('combobox');
    expect(comboboxes).toHaveLength(2);
    await userEvent.click(comboboxes[0]);
    await userEvent.click(screen.getByText('手機版'));

    const numberInput = screen.getByRole('spinbutton');
    expect(numberInput).toHaveValue(100);
    await userEvent.clear(numberInput);
    await userEvent.type(numberInput, '90');
    expect(numberInput).toHaveValue(90);

    await userEvent.click(submitButton);
    expect(mockFetch.fetchPutData).toHaveBeenCalledTimes(1);
    expect(mockFetch.fetchPutData).toHaveBeenCalledWith(expect.stringContaining('/testrouter/15'), {
      ...EditBanner4,
      module: [
        {
          ...EditBanner4.module[0],
          data: {
            ...EditBanner4.module[0].data,
            title: 'test update',
            device: 'MOBILE',
            status: 'offline',
            pic: 'banner/20220510-bOx9jBL50ocG3h1CwmbW1w0ueSNFPk5PYU72TTg2.png',
            order: 90,
          },
        },
      ],
    });
  });
});
