import EditContentPage from '@/pages/[content]/[editId]/edit';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateBannerSuccess from '@/src/mock/db/utils/CreateContent/CreateBannerSuccess.json';
import BannerConfig73 from '@/src/mock/db/utils/getConfig/bannerConfig73.json';
import MachineCategoryConfig5 from '@/src/mock/db/utils/getConfig/machineCategoryConfig5.json';
import AdminUser1Config from '@/src/mock/db/utils/getConfig/adminUserConfig1.json';
import Machine1Config from '@/src/mock/db/utils/getConfig/machineConfig1.json';
import Home1Config from '@/src/mock/db/utils/getConfig/homepageConfig1.json';
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

      const cancelButton = screen.getByRole('button', { name: '取消' });
      await userEvent.click(cancelButton);
    });

    it('should open confirm modal then call delete api and change route to list page after clicking delete confirm button', async () => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();

      const deleteButton = screen.getByRole('button', { name: '刪除Banner' });
      await userEvent.click(deleteButton);

      const confirmButton = screen.getByRole('button', { name: '確定刪除' });
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

  describe('MachineCategory 5', () => {
    beforeEach(() => {
      mockAsPath.mockReturnValue('/machineCategory/5/edit');
      mockQuery.mockReturnValue({ editId: '5' });

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('/machineCategory/5/getConfig') ? MachineCategoryConfig5 : {},
      }));

      render(<EditContentPage />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should not have delete button', async () => {
      const deleteButton = screen.queryByRole('button', { name: /刪除機台/ });
      expect(deleteButton).not.toBeInTheDocument();
    });

    it('should have enabled confirm button', async () => {
      const submitButton = screen.getByRole('button', { name: '確定' });
      await waitFor(async () => {
        expect(submitButton).toBeEnabled();
      });
    });

    it('should disabled confirm button when clear up one input field', async () => {
      const submitButton = screen.getByRole('button', { name: '確定' });
      const inputs = screen.queryAllByRole('textbox');
      expect(inputs).toHaveLength(2);
      await userEvent.clear(inputs[0]);
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Admin User 1', () => {
    beforeEach(() => {
      mockAsPath.mockReturnValue('/adminUser/1/edit');
      mockQuery.mockReturnValue({ editId: '1' });

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('/adminUser/1/getConfig') ? AdminUser1Config : {},
      }));

      render(<EditContentPage />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should have a disabled input field', async () => {
      const input = screen.queryByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toBeDisabled();
    });
  });

  describe('Machine 1', () => {
    beforeEach(() => {
      mockAsPath.mockReturnValue('/machine/1/edit');
      mockQuery.mockReturnValue({ editId: '1' });

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('/machine/1/getConfig') ? Machine1Config : {},
      }));

      render(<EditContentPage />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should have disabled submitButton', async () => {
      (requestUtils.request as jest.Mock).mockReturnValue(CreateBannerSuccess);
      const submitButton = screen.getByRole('button', { name: '確定' });
      expect(submitButton).toBeDisabled();
      const inputs = screen.queryAllByRole('textbox');
      inputs.forEach((input) => {
        fireEvent.change(input, { target: { value: 'test input' } });
      });
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
      await userEvent.click(submitButton);
      const body = Machine1Config.data.field.reduce((acc, cur) => {
        return { ...acc, [cur.model]: cur.type === 'Input' ? 'test input' : cur.default };
      }, {});
      const expectBody = JSON.stringify({
        ...body,
        order: 0,
      });
      expect(requestUtils.request).toHaveBeenLastCalledWith('/model/machine/1', {
        method: 'PUT',
        body: expectBody,
      });
    });

    it('should submit with default values', async () => {
      (requestUtils.request as jest.Mock).mockReturnValue(CreateBannerSuccess);
      const submitButton = screen.getByRole('button', { name: '確定' });
      await waitFor(async () => {
        expect(submitButton).toBeEnabled();
      });
      await userEvent.click(submitButton);
      const body = Machine1Config.data.field.reduce((acc, cur) => {
        return { ...acc, [cur.model]: cur.default };
      }, {});
      const expectBody = JSON.stringify({
        ...body,
      });
      expect(requestUtils.request).toHaveBeenLastCalledWith('/model/machine/1', {
        method: 'PUT',
        body: expectBody,
      });
    });

    it('should disabled submit button if clear up required field', async () => {
      (requestUtils.request as jest.Mock).mockReturnValue(CreateBannerSuccess);
      const submitButton = screen.getByRole('button', { name: '確定' });
      const textareas = screen.queryAllByRole('dialog');
      await userEvent.clear(textareas[0]);
      await waitFor(async () => {
        expect(submitButton).toBeDisabled();
      });
    });

    it('should submit with all required fields filled and default value with not required fields', async () => {
      (requestUtils.request as jest.Mock).mockReturnValue(CreateBannerSuccess);
      const submitButton = screen.getByRole('button', { name: '確定' });
      const inputs = screen.queryAllByRole('textbox') as HTMLInputElement[];
      await userEvent.clear(inputs[0]);
      await waitFor(async () => {
        expect(submitButton).toBeEnabled();
      });
      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      const body = Machine1Config.data.field.reduce((acc, cur) => {
        return { ...acc, [cur.model]: cur.model === 'tabel_column_title_1' ? '' : cur.default };
      }, {});
      const expectBody = JSON.stringify({
        ...body,
      });
      expect(requestUtils.request).toHaveBeenLastCalledWith('/model/machine/1', {
        method: 'PUT',
        body: expectBody,
      });
    });
  });

  describe('Homepage 1', () => {
    beforeEach(() => {
      mockAsPath.mockReturnValue('/homepage/1/edit');
      mockQuery.mockReturnValue({ editId: '1' });

      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('/homepage/1/getConfig') ? Home1Config : {},
      }));

      render(<EditContentPage />);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should not have list link', async () => {
      const listButton = screen.queryByRole('button', { name: '首頁設定列表' });
      expect(listButton).not.toBeInTheDocument();
    });

    it('should not call router push to list page after submit', async () => {
      (requestUtils.request as jest.Mock).mockReturnValue(CreateBannerSuccess);
      const submitButton = screen.getByRole('button', { name: '確定' });
      await waitFor(async () => {
        expect(submitButton).toBeEnabled();
      });
      await userEvent.click(submitButton);
      expect(routerPush).not.toHaveBeenCalled();
    });
  });
});
