import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ContentCreatePage from '@/pages/[content]/create';
import userEvent from '@testing-library/user-event';
import CreateBannerSuccess from '@/src/mock/db/utils/CreateContent/CreateBannerSuccess.json';
import UploadImageData from '@/src/mock/db/utils/uploadFile/uploadImage.json';
import BannerConfig from '@/src/mock/db/utils/getConfig/bannerConfig.json';
import MachineConfig from '@/src/mock/db/utils/getConfig/machineConfig.json';
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

    it('should disable confirm button initial', async () => {
      const { submitButton } = result;
      expect(submitButton).toBeDisabled();
    });

    it('should be enabled after fireEvent change image', async () => {
      (requestUtils.request as jest.Mock).mockImplementation((url: string) =>
        url.includes('/upload/file') ? UploadImageData : CreateBannerSuccess,
      );
      global.URL.createObjectURL = jest.fn(() => 'imageURL');
      const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
      const { submitButton } = result;

      const imageUploadInput = screen.getByTestId('photo-uploader-pic') as HTMLInputElement;
      await waitFor(() => {
        fireEvent.change(imageUploadInput, { target: { files: [file] } });
        expect(submitButton).toBeEnabled();
      });
    });

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
      const imageUploadInput = screen.getByTestId('photo-uploader-pic') as HTMLInputElement;
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
      (requestUtils.request as jest.Mock).mockImplementation((url: string) =>
        url.includes('/upload/file') ? UploadImageData : CreateBannerSuccess,
      );
      global.URL.createObjectURL = jest.fn(() => 'imageURL');
      const file = new File(['test file'], 'testImage.png', { type: 'image/png' });

      const { submitButton } = result;
      expect(requestUtils.request).toHaveBeenCalledTimes(0);

      const imageUploadInput = screen.getByTestId('photo-uploader-pic') as HTMLInputElement;
      await waitFor(() => {
        fireEvent.change(imageUploadInput, { target: { files: [file] } });
      });

      await userEvent.click(submitButton);
      expect(requestUtils.request).toHaveBeenCalledTimes(2);
      const body = JSON.stringify({
        pic: 'testimageresponse',
        status: 'ONLINE',
        order: 0,
      });
      expect(requestUtils.request).toHaveBeenNthCalledWith(2, '/model/banner', {
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

  describe('Machine', () => {
    let result: {
      title: HTMLElement | null;
      linkButton: HTMLLinkElement;
      submitButton: HTMLButtonElement;
      form: UseFormReturn<FieldValues, any>;
    };

    beforeEach(() => {
      mockAsPath.mockReturnValue('/machine/create');
      result = setup('機台建立', '機台列表', MachineConfig);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should have 8 text area fields', async () => {
      const textareas = screen.queryAllByRole('dialog');
      expect(textareas).toHaveLength(8);
    });

    it('should submit with all required fields filled and default value with not required fields', async () => {
      (requestUtils.request as jest.Mock).mockImplementation((url: string) =>
        url.includes('/upload/file') ? UploadImageData : CreateBannerSuccess,
      );
      global.URL.createObjectURL = jest.fn(() => 'imageURL');
      const file = new File(['test file'], 'testImage.png', { type: 'image/png' });
      const { submitButton } = result;
      expect(submitButton).toBeDisabled();
      const select = screen.queryByRole('combobox') as HTMLDivElement;
      expect(select).toBeInTheDocument();
      await userEvent.click(select);
      const firstOption = screen.queryByText(/印刷機/) as HTMLDivElement;
      expect(firstOption).toBeInTheDocument();
      await userEvent.click(firstOption);
      const textareas = screen.queryAllByRole('dialog');
      textareas.forEach((textarea) => {
        fireEvent.change(textarea, { target: { value: 'test textarea' } });
      });
      expect(submitButton).toBeDisabled();
      const imgFields = MachineConfig.data.field.filter((field) => field.type === 'ImageUpload');
      expect(imgFields).toHaveLength(5);
      imgFields.forEach((field) => {
        const imgInput = screen.queryByTestId(`photo-uploader-${field.model}`) as HTMLInputElement;
        expect(imgInput).toBeInTheDocument();
        fireEvent.change(imgInput, { target: { files: [file] } });
      });
      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });
      await userEvent.click(submitButton);
      const body = MachineConfig.data.field.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.model]:
            cur.model === 'machine_category_id'
              ? 1
              : cur.type === 'ImageUpload'
              ? 'testimageresponse'
              : cur.type === 'Input'
              ? ''
              : 'test textarea',
        }),
        {},
      );
      const expectBody = JSON.stringify({
        ...body,
        order: 0,
      });
      expect(requestUtils.request).toHaveBeenLastCalledWith('/model/machine', {
        method: 'POST',
        body: expectBody,
      });
    });
  });
});
