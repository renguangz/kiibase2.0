import { renderHook } from '@testing-library/react-hooks';
import { formatOptions, formatSelectData, useCreateContent } from '.';
import useSWR from 'swr';
import CreateCatalog from '@/src/mock/db/utils/CreateContent/CreateCatalog';
import CreateBannerFieldsData from '@/src/mock/db/utils/getFields/bannerFields';
import CreateBannerFieldsDataApi from '@/src/mock/db/utils/getFields/bannerFieldsApi';

jest.mock('swr');

describe('useCreateContent', () => {
  describe('Catalog', () => {
    it('should return create config data', async () => {
      const mockUseSwr = jest.requireMock('swr').default;
      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getFields') ? CreateBannerFieldsData : CreateCatalog,
      }));

      const { result } = renderHook(() => useCreateContent('/searchLog'));
      const data = result.current.data;
      expect(useSWR).toHaveBeenCalledTimes(2);
      expect(mockUseSwr).toHaveBeenCalledTimes(2);

      expect(data?.topic).toEqual('電子型錄');
      expect(data?.routes).toEqual('catalog');
    });

    it('should have options with code and name in third and forth item', () => {
      (useSWR as jest.Mock).mockImplementation((url: string) => ({
        data: url.includes('getFields') ? CreateBannerFieldsDataApi : CreateCatalog,
      }));
      const { result } = renderHook(() => useCreateContent('/banner'));
      const fieldsData = result.current.fieldsData;
      const thirdItemOptions = fieldsData?.[2]?.options;
      const forthItemOptions = fieldsData?.[3]?.options;
      thirdItemOptions.forEach((option: any) => {
        expect(option).toHaveProperty('code');
      });
      forthItemOptions.forEach((option: any) => {
        expect(option).toHaveProperty('code');
      });
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
        { code: 'test1', name: 'test' },
        { code: '123', name: 'test123' },
        { code: '1234', name: 'test' },
      ];
      formatOptions(initOptions).forEach((option, index) => {
        expect(option.code).toEqual(expectOptions[index].code);
        expect(option.name).toEqual(expectOptions[index].name);
      });
    });
  });

  describe('FormatSelectData', () => {
    it('should return options in data with code and name', () => {
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
            { code: 'teset13', name: 'name1' },
            { code: 'id1', name: 'name2' },
          ],
          name: 'test',
        },
        { type: 'select', label: 'test', name: 'test', options: [{ code: 'eq', name: 'name4' }] },
        { type: 'test', label: 'test', name: 'test', hint: 'test hint' },
      ];
      const result = formatSelectData(testData);
      result.forEach((item, index) => {
        expect(item).toStrictEqual(expectData[index]);
      });
    });
  });
});
