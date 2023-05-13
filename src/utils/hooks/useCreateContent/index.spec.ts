import { act, renderHook } from '@testing-library/react-hooks';
import { formatOptions, formatSelectData, useCreateContent } from '.';
import useSWR from 'swr';
import * as requestUtils from '../../request';
import CreateCatalog from '@/src/mock/db/utils/CreateContent/CreateCatalog.json';
import CreateBannerFieldsData from '@/src/mock/db/utils/getFields/bannerFields.json';
import CreateBannerFieldsDataApi from '@/src/mock/db/utils/getFields/bannerFieldsApi.json';
import CreateBannerSuccess from '@/src/mock/db/utils/CreateContent/CreateBannerSuccess.json';

jest.mock('swr');

jest.mock('../../request');

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('useCreateContent', () => {
  describe('Catalog', () => {
    it('should return create config data', async () => {
      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getFields') ? CreateBannerFieldsData : CreateCatalog,
      }));

      const { result } = renderHook(() => useCreateContent('/searchLog'));
      const data = result.current.data;

      expect(data?.topic).toEqual('電子型錄');
      expect(data?.routes).toEqual('catalog');
    });
  });

  describe('Banner', () => {
    beforeEach(() => jest.resetAllMocks());

    it('should have options with value and label in third and forth item', () => {
      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getFields') ? CreateBannerFieldsDataApi : CreateCatalog,
      }));
      const { result } = renderHook(() => useCreateContent('/banner/create'));
      const fieldsData = result.current.fieldsData;
      const thirdItemOptions = fieldsData?.[2]?.options;
      const forthItemOptions = fieldsData?.[3]?.options;
      thirdItemOptions.forEach((option: any) => {
        expect(option).toHaveProperty('value');
      });
      forthItemOptions.forEach((option: any) => {
        expect(option).toHaveProperty('value');
      });
    });

    it('should route to `banner list` page after create successfully', async () => {
      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getFields') ? CreateBannerFieldsDataApi : CreateCatalog,
      }));

      (requestUtils.request as jest.Mock).mockResolvedValue(CreateBannerSuccess);

      const { result } = renderHook(() => useCreateContent('/banner/create'));

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockRouterPush).toHaveBeenCalledTimes(1);
      expect(mockRouterPush).toHaveBeenCalledWith('/banner');
    });

    it('should not route to `banner list` page if api response error', async () => {
      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getFields') ? CreateBannerFieldsDataApi : CreateCatalog,
      }));

      (requestUtils.request as jest.Mock).mockResolvedValue({ ...CreateBannerSuccess, status: 400 });

      const { result } = renderHook(() => useCreateContent('/banner/create'));

      await act(async () => {
        await result.current.handleSubmit();
      });

      expect(mockRouterPush).toHaveBeenCalledTimes(0);
    });
  });

  describe('FormatOptions', () => {
    it('should return expect options after formatting options', () => {
      const initOptions = [
        { id: 'test1', name: 'test' },
        { id: '123', name: 'test123' },
        { id: '1234', name: 'test' },
      ];
      const expectOptions = [
        { value: 'test1', label: 'test' },
        { value: '123', label: 'test123' },
        { value: '1234', label: 'test' },
      ];
      formatOptions(initOptions).forEach((option, index) => {
        expect(option.value).toEqual(expectOptions[index].value);
        expect(option.label).toEqual(expectOptions[index].label);
      });
    });
  });

  describe('FormatSelectData', () => {
    it('should return options in data with value and label', () => {
      const testData = [
        { type: 'test', label: 'test', name: 'test' },
        {
          type: 'select',
          label: 'test',
          options: [
            { id: 'teset13', name: 'name1' },
            { id: 'id1', name: 'name2' },
          ],
          name: 'test',
        },
        { type: 'select', label: 'test', name: 'test', options: [{ id: 'eq', name: 'name4' }] },
        { type: 'test', label: 'test', name: 'test', hint: 'test hint' },
      ];
      const expectData = [
        { type: 'test', label: 'test', name: 'test' },
        {
          type: 'select',
          label: 'test',
          options: [
            { value: 'teset13', label: 'name1' },
            { value: 'id1', label: 'name2' },
          ],
          name: 'test',
        },
        { type: 'select', label: 'test', name: 'test', options: [{ value: 'eq', label: 'name4' }] },
        { type: 'test', label: 'test', name: 'test', hint: 'test hint' },
      ];
      const result = formatSelectData(testData);
      result.forEach((item, index) => {
        expect(item).toStrictEqual(expectData[index]);
      });
    });
  });
});
