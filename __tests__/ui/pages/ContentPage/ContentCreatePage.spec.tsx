import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContentCreatePage from '@/pages/[content]/create';
import userEvent from '@testing-library/user-event';
import CreateBannerSuccess from '@/src/mock/db/utils/CreateContent/CreateBannerSuccess.json';
import UploadImageData from '@/src/mock/db/utils/uploadFile/uploadImage.json';
import BannerConfig from '@/src/mock/db/utils/getConfig/bannerConfig.json';
import AdminUserConfig from '@/src/mock/db/utils/getConfig/adminUserConfig.json';
import useSWR from 'swr';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { renderHook } from '@testing-library/react-hooks';
import * as requestUtils from '@/src/utils/request';

window.watchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

const mockAsPath = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    // asPath: '/banner/create',
    asPath: mockAsPath(),
    push: jest.fn(),
  }),
}));

jest.mock('swr', () => jest.fn());

jest.mock('@/src/utils/request', () => ({
  ...jest.requireActual('@/src/utils/request'),
  request: jest.fn(),
}));

describe('ContentCreatePage', () => {
  const setup = (queryTitle: string, queryLink: string, configData: any) => {
    (useSWR as jest.Mock).mockReturnValue({ data: configData });

    const { result } = renderHook(() => useForm());

    render(<ContentCreatePage />);
    const title = screen.queryByRole('heading', { name: queryTitle });
    const linkButton = screen.queryByRole('link', { name: queryLink }) as HTMLLinkElement;
    const submitButton = screen.getByRole('button', { name: '確定' }) as HTMLButtonElement;
    return { title, linkButton, submitButton, form: result.current };
  };

  describe('Banner', () => {
    let result: {
      title: HTMLElement | null;
      linkButton: HTMLLinkElement;
      submitButton: HTMLButtonElement;
      form: UseFormReturn<FieldValues, any>;
    };
    beforeEach(() => {
      mockAsPath.mockReturnValue('/banner/create');
      result = setup('Banner建立', 'Banner列表', BannerConfig);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should have title `首頁底圖建立` and link `首頁底圖列表`', async () => {
      const { title, linkButton } = result;
      expect(title).toBeInTheDocument();
      expect(linkButton).toBeInTheDocument();
      expect(linkButton.href).toContain('/banner');
      userEvent.click(linkButton);
      expect(window.location.href).not.toContain('create');
    });

    // it('should not disable confirm button if required fields were all filled', async () => {
    //   const { submitButton } = result;
    //   const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    //   expect(inputs).toHaveLength(2);
    //   await userEvent.type(inputs[0], 'filled up input1');
    //   expect(submitButton).toBeDisabled();
    //   await userEvent.type(inputs[1], 'filled up input2');
    //   expect(inputs[0]).toHaveValue('filled up input1');
    //   const comboBoxes = screen.getAllByRole('combobox');
    //   expect(comboBoxes).toHaveLength(2);
    //   await userEvent.click(comboBoxes[0]);
    //   expect(screen.getByTitle('手機版')).toBeInTheDocument();
    //   await userEvent.click(screen.getByTitle('手機版'));
    //
    //   await userEvent.click(comboBoxes[1]);
    //   expect(screen.getByTitle('下架')).toBeInTheDocument();
    //   await userEvent.click(screen.getByTitle('下架'));
    //
    //   expect(submitButton).toBeEnabled();
    // });

    // it('button should disable after clicking and enable after changing filled data', () => {
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
    // });

    // it('button should enable after filled up required field and disabled after clearing any required fields', async () => {
    //   const { submitButton } = result;
    //   const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
    //   expect(inputs).toHaveLength(2);
    //   await userEvent.type(inputs[0], 'filled up input1');
    //   await userEvent.type(inputs[1], 'filled up input2');
    //   expect(inputs[0]).toHaveValue('filled up input1');
    //   const comboBoxes = screen.getAllByRole('combobox');
    //   expect(comboBoxes).toHaveLength(2);
    //   await userEvent.click(comboBoxes[0]);
    //   expect(screen.getByTitle('手機版')).toBeInTheDocument();
    //   await userEvent.click(screen.getByTitle('手機版'));
    //
    //   await userEvent.click(comboBoxes[1]);
    //   expect(screen.getByTitle('下架')).toBeInTheDocument();
    //   await userEvent.click(screen.getByTitle('下架'));
    //
    //   expect(submitButton).toBeEnabled();
    //
    //   await userEvent.clear(inputs[0]);
    //   expect(submitButton).toBeDisabled();
    //
    //   await userEvent.type(inputs[0], 'a');
    //   expect(submitButton).toBeEnabled();
    // });

    it('should submit with create data and change module[0].data to `{ title: "test title", pic: "testPic", device: "PC", status: "ONLINE", order: 0 }`', async () => {
      (requestUtils.request as jest.Mock).mockImplementation((url: string) =>
        url.includes('/upload/file') ? UploadImageData : CreateBannerSuccess,
      );
      global.URL.createObjectURL = jest.fn(() => 'imageURL');
      const file = new File(['test file'], 'testImage.png', { type: 'image/png' });

      const { submitButton } = result;
      const numberInput = screen.getByRole('spinbutton');
      await userEvent.type(numberInput, '1');
      const comboBoxes = screen.getAllByRole('combobox');
      expect(comboBoxes).toHaveLength(1);
      await userEvent.click(comboBoxes[0]);
      await userEvent.click(screen.queryByRole('option', { name: '桌機版' }) as HTMLDivElement);
      const imageUploadInput = screen.getByTestId('photo-uploader') as HTMLInputElement;
      await waitFor(() => {
        fireEvent.change(imageUploadInput, { target: { files: [file] } });
      });
      expect(requestUtils.request).toHaveBeenCalledTimes(1);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', '/banner');
      expect(requestUtils.request).toHaveBeenCalledWith(
        '/model/banner/upload/file',
        {
          body: formData,
          method: 'POST',
        },
        true,
      );
      await act(async () => {});

      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(2);

      const body = JSON.stringify({
        pic: UploadImageData.data.filePath,
        status: 'ONLINE',
        order: 1,
      });

      expect(requestUtils.request).toHaveBeenNthCalledWith(2, '/model/banner', {
        method: 'POST',
        body,
      });
    });

    it('should submit with default value `{ title: "not default title", device: "PC", status: "online", order: "0" }`', async () => {
      (requestUtils.request as jest.Mock).mockResolvedValue(CreateBannerSuccess);

      const { submitButton } = result;
      expect(requestUtils.request).toHaveBeenCalledTimes(0);

      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      const body = JSON.stringify({
        status: 'ONLINE',
        order: 0,
      });
      expect(requestUtils.request).toHaveBeenCalledWith('/model/banner', {
        method: 'POST',
        body,
      });
    });
  });

  describe('AdminUser', () => {
    let result: {
      title: HTMLElement | null;
      linkButton: HTMLLinkElement;
      submitButton: HTMLButtonElement;
      form: UseFormReturn<FieldValues, any>;
    };

    beforeEach(() => {
      mockAsPath.mockReturnValue('/adminUser/create');
      result = setup('後台管理者建立', '後台管理者列表', AdminUserConfig);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should submit with default data', async () => {
      (requestUtils.request as jest.Mock).mockResolvedValue(CreateBannerSuccess);
      const { submitButton } = result;
      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      const expectResult = JSON.stringify({
        status: 'ONLINE',
      });
      expect(requestUtils.request).toHaveBeenCalledWith('/model/adminUser', {
        method: 'POST',
        body: expectResult,
      });
    });

    it('should submit with account and password data', async () => {
      (requestUtils.request as jest.Mock).mockResolvedValue(CreateBannerSuccess);
      const inputs = screen.getAllByRole('textbox');
      await userEvent.type(inputs[0], 'testaccount');
      await userEvent.type(inputs[1], 'testpassword');
      const select = screen.queryByRole('combobox') as HTMLDivElement;
      expect(select).toBeInTheDocument();
      await userEvent.click(select);
      const offline = screen.queryByText('停用') as HTMLDivElement;
      expect(offline).toBeInTheDocument();
      await userEvent.click(offline);
      const { submitButton } = result;
      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(1);
      const expectResult = JSON.stringify({
        account: 'testaccount',
        password: 'testpassword',
        status: 'OFFLINE',
      });
      expect(requestUtils.request).toHaveBeenCalledWith('/model/adminUser', {
        method: 'POST',
        body: expectResult,
      });
    });
  });
});
