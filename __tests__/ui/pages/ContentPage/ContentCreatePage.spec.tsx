import { render, screen } from '@testing-library/react';
import ContentCreatePage from '@/pages/[content]/create';
import userEvent from '@testing-library/user-event';
import CreateCatalog from '@/src/mock/db/utils/CreateContent/CreateCatalog';
import CreateBanner from '@/src/mock/db/utils/CreateContent/CreateBanner';
import CreateBannerFieldsData from '@/src/mock/db/utils/getFields/bannerFieldsApi';
import useSWR from 'swr';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { renderHook } from '@testing-library/react-hooks';
import * as fetchUtils from '@/src/utils/fetch';

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

jest.mock('@/src/utils/fetch', () => ({
  fetchPostData: jest.fn(),
}));

describe('ContentCreatePage', () => {
  const setup = (queryTitle: string, queryLink: string, mockCreateContentData: any) => {
    (useSWR as jest.Mock).mockImplementation((url) => {
      return {
        data: url.includes('getFields') ? CreateBannerFieldsData : mockCreateContentData,
      };
    });

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
      result = setup('首頁底圖建立', '首頁底圖列表', CreateBanner);
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

    // it('should have disabled button when page finished loading', () => {
    //   const { submitButton } = result;
    //   expect(submitButton).toBeDisabled();
    // });

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

    it('should submit with create data and change module[0].data to `{ title: "test title", device: "PC", status: "ONLINE", order: 0 }`', async () => {
      const { submitButton } = result;
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      expect(inputs).toHaveLength(1);
      const numberInput = screen.getByRole('spinbutton');
      await userEvent.type(inputs[0], 'test title');
      await userEvent.type(numberInput, '1');
      const comboBoxes = screen.getAllByRole('combobox');
      expect(comboBoxes).toHaveLength(2);
      await userEvent.click(comboBoxes[0]);
      await userEvent.click(screen.queryByRole('option', { name: '桌機版' }) as HTMLDivElement);
      await userEvent.click(comboBoxes[1]);
      await userEvent.click(screen.queryByText('上架') as HTMLDivElement);
      expect(fetchUtils.fetchPostData).toHaveBeenCalledTimes(0);

      await userEvent.click(submitButton);
      expect(fetchUtils.fetchPostData).toHaveBeenCalledTimes(1);
      expect(fetchUtils.fetchPostData).toHaveBeenCalledWith(expect.anything(), {
        ...CreateBanner,
        module: [
          {
            ...CreateBanner.module[0],
            data: {
              title: 'test title',
              device: 'PC',
              status: 'online',
              order: 1,
              pic: '',
            },
          },
        ],
      });
    });

    it('should submit with default value `{ title: "not default title", device: "PC", status: "online", order: "0" }`', async () => {
      const { submitButton } = result;
      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[];
      await userEvent.type(inputs[0], 'not default title');
      expect(fetchUtils.fetchPostData).toHaveBeenCalledTimes(0);

      await userEvent.click(submitButton);
      expect(fetchUtils.fetchPostData).toHaveBeenCalledTimes(1);
      expect(fetchUtils.fetchPostData).toHaveBeenCalledWith(expect.anything(), {
        ...CreateBanner,
        module: [
          {
            ...CreateBanner.module[0],
            data: {
              title: 'not default title',
              device: 'PC',
              pic: '',
              status: 'ONLINE',
              order: 0,
            },
          },
        ],
      });
    });

    // it('should have default value display `桌機版`, `上架` `0`', async () => {
    //   expect(screen.getByText('桌機版')).toBeVisible();
    //   expect(screen.getByText('上架')).toBeVisible();
    //   expect(screen.getByText('0')).toBeVisible();
    // });
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
