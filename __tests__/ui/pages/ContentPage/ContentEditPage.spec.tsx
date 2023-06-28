import EditContentPage from '@/pages/[content]/[editId]/edit';
import { render, screen } from '@testing-library/react';
import EditBanner4 from '@/src/mock/db/utils/EditContent/EditBanner4.json';
import CreateBannerFieldsData from '@/src/mock/db/utils/getFields/bannerFieldsApi.json';
import CreateBannerSuccess from '@/src/mock/db/utils/CreateContent/CreateBannerSuccess.json';
import BannerConfig73 from '@/src/mock/db/utils/getConfig/bannerConfig73.json';
import useSWR from 'swr';
import userEvent from '@testing-library/user-event';
import * as requestUtils from '@/src/utils/request';

jest.mock('swr');

const routerPush = jest.fn();
const mockAsPath = jest.fn();
const mockQuery = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: mockAsPath(),
    query: mockQuery(),
    push: routerPush,
  }),
}));

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));

describe('ContentEditPage', () => {
  describe('Banner 73', () => {
    beforeEach(() => {
      mockAsPath.mockReturnValue('/banner/73/edit');
      mockQuery.mockReturnValue({ editId: '73' });

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('/banner/73/getConfig') ? BannerConfig73 : {},
      }));

      render(<EditContentPage />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should have delete button, title and list link', async () => {
      const deleteButton = screen.queryByRole('button', { name: '刪除Banner' }) as HTMLButtonElement;
      expect(deleteButton).toBeInTheDocument();

      const title = screen.queryByRole('heading', { name: 'Banner修改' });
      expect(title).toBeInTheDocument();

      const linkButton = screen.queryByRole('link', { name: 'Banner列表' });
      expect(linkButton).toHaveAttribute('href', '/banner');
      expect(linkButton).toBeInTheDocument();
    });

    it('should have 3 fields with default values', async () => {
      const picField = screen.queryByRole('img');
      expect(picField).toBeInTheDocument();
      expect(picField).toHaveAttribute('src', BannerConfig73.data.field[0].url);
    });

    it('should open confirm modal and close it after clicking cancel button', async () => {
      const deleteButton = screen.getByRole('button', { name: '刪除Banner' });
      await userEvent.click(deleteButton);

      const modal = screen.queryByRole('alert');
      expect(modal).toBeInTheDocument();

      const cancelButton = screen.getByRole('button', { name: '取消' });
      await userEvent.click(cancelButton);

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should open confirm modal then call delete api and change route to list page after clicking delete confirm button', async () => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();

      const deleteButton = screen.getByRole('button', { name: '刪除Banner' });
      await userEvent.click(deleteButton);

      const modal = screen.queryByRole('alert');
      expect(modal).toBeInTheDocument();

      const confirmButton = screen.getByRole('button', { name: '確認刪除' });
      await userEvent.click(confirmButton);

      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      expect(requestUtils.request).toHaveBeenCalledWith('/model/banner/73', { method: 'DELETE' });

      expect(routerPush).toHaveBeenCalled();
      expect(routerPush).toHaveBeenCalledWith('/banner/');
    });

    it('should call api with default values', async () => {
      (requestUtils.request as jest.Mock).mockReturnValue(CreateBannerSuccess);

      const submitButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
      expect(submitButton).toBeInTheDocument();

      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      const body = JSON.stringify({
        pic: BannerConfig73.data.field[0].default,
        status: 'ONLINE',
        order: 1012,
      });
      expect(requestUtils.request).toHaveBeenCalledWith('/model/banner/73', {
        method: 'PUT',
        body,
      });
    });

    it('should success update with new payload and route to list page', async () => {
      (requestUtils.request as jest.Mock).mockResolvedValue(CreateBannerSuccess);

      const submitButton = screen.queryByRole('button', { name: '確定' }) as HTMLButtonElement;
      expect(submitButton).toBeInTheDocument();

      const select = screen.queryByRole('combobox') as HTMLDivElement;
      expect(select).toBeInTheDocument();
      await userEvent.click(select);
      const offline = screen.queryByText('下架') as HTMLDivElement;
      expect(offline).toBeInTheDocument();
      await userEvent.click(offline);

      const numberInput = screen.getByRole('spinbutton');
      expect(numberInput).toHaveValue(1012);
      await userEvent.clear(numberInput);
      await userEvent.type(numberInput, '90');
      expect(numberInput).toHaveValue(90);

      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      const body = JSON.stringify({
        pic: BannerConfig73.data.field[0].default,
        status: 'OFFLINE',
        order: 90,
      });
      expect(requestUtils.request).toHaveBeenCalledWith('/model/banner/73', {
        method: 'PUT',
        body,
      });
    });
  });
});
