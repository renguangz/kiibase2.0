import { renderHook } from '@testing-library/react-hooks';
import { useForm } from 'react-hook-form';
import {
  formatDateForm,
  formatDateString,
  formatNumberForm,
  formatObjectDateToString,
  formatObjectValueWithPlus,
  getContentPath,
  hasEmptyString,
  isNotContentDynamicRouteYet,
  pipeFormatObject,
  reduceQueryParams,
  replaceFirstQuery,
  replaceSpacesWithPlus,
} from '.';

describe('Functions', () => {
  describe('query params to string', () => {
    it('should return `?testParams=test&others=othersData`', () => {
      const queryParams = {
        testParams: 'test',
        others: 'othersData',
      };

      const result = reduceQueryParams(queryParams);
      expect(result).toEqual('&testParams=test&others=othersData');

      const replaceString = replaceFirstQuery(result);
      expect(replaceString).toEqual('?testParams=test&others=othersData');
    });

    it('should return `` if no query params is empty object', () => {
      const queryParams = {};
      const result = reduceQueryParams(queryParams);
      expect(result).toEqual('');

      const replaceString = replaceFirstQuery(result);
      expect(replaceString).toEqual('');
    });
  });

  describe('getContentPath', () => {
    it('should return `/banner` if path is `/banner/something/blabla/123/test`', () => {
      const paramPath = '/banner/something/blabla/123/test';
      expect(getContentPath(paramPath)).toBe('/banner');
    });

    it('should return `/banner` if path is `/banner/create` or `/banner/123/edit`', () => {
      const paramPath = '/banner/create';
      const anotherParamPath = '/banner/123/edit';
      expect(getContentPath(paramPath)).toBe('/banner');
      expect(getContentPath(anotherParamPath)).toBe('/banner');
    });
  });

  describe('isNotContentDynamicRouteYet', () => {
    it('should return false if route is `/banner/123/edit` or `/banner/create`', () => {
      const path1 = '/banner/123/edit';
      const path2 = '/banner/create';
      expect(isNotContentDynamicRouteYet(path1)).toBeFalsy();
      expect(isNotContentDynamicRouteYet(path2)).toBeFalsy();
    });

    it('should return true if route is `/[content]/123/edit` or `/[content]`/create', () => {
      const path1 = '/[content]/123/edit';
      const path2 = '/[content]/create';
      expect(isNotContentDynamicRouteYet(path1)).toBeTruthy();
      expect(isNotContentDynamicRouteYet(path2)).toBeTruthy();
    });
  });

  describe('FormatObjectValueWithPlus', () => {
    describe('ReplaceSpacesWithPlus', () => {
      it('should return `no+content+with+plus`', async () => {
        const target = 'no content with plus';
        const expectResult = 'no+content+with+plus';
        expect(replaceSpacesWithPlus(target)).toEqual(expectResult);
      });
    });

    it('should return `{ test1: "test+1+2", test2: "test2", test3: "test3+1" }`', async () => {
      const target = {
        test1: 'test 1 2',
        test2: 'test2',
        test3: 'test3 1',
      };
      const expectResult = { test1: 'test+1+2', test2: 'test2', test3: 'test3+1' };

      expect(formatObjectValueWithPlus(target)).toStrictEqual(expectResult);
    });

    it('should return empty object', async () => {
      const target = {};
      const expectResult = {};

      expect(formatObjectValueWithPlus(target)).toStrictEqual(expectResult);
    });

    it('should remove undefined', async () => {
      const target = {
        test1: undefined,
        test2: 'test2 1 3',
        test3: undefined,
      };
      const expectResult = {
        test2: 'test2+1+3',
      };
      expect(formatObjectValueWithPlus(target)).toStrictEqual(expectResult);
    });
  });

  describe('FormatDateForm', () => {
    const defaultValues = {
      title: 'test title',
      pic: '',
      device: 'PC',
      status: 'online',
      testNumber: '123',
      order: '1',
      start_at: new Date('2023/04/06'),
      end_at: new Date('2023/04/08'),
    };
    it('should format date form', async () => {
      const { result } = renderHook(() => useForm({ defaultValues }));
      const expectResult = { start_at: '2023/4/6', end_at: '2023/4/8' };
      expect(formatDateForm(result.current.control._formValues)).toStrictEqual(expectResult);
    });
  });

  describe('FormatNumberForm', () => {
    it('should format number form', async () => {
      const target = [
        {
          type: 'InputTextComponent',
          label: '標題',
          model: 'title',
          required: true,
          readonly: false,
          hint: '此欄位必填',
          name: 'title',
        },
        {
          type: 'NotFound',
          label: '封面圖',
          model: 'pic',
          required: true,
          readonly: false,
          hint: '此欄位必填',
          help: '<p>檔案類型：.jpg</p><p>桌機版上傳尺寸：1920 x 500px</p><p>手機版上傳尺寸：414 x 460px</p>',
          name: 'pic',
        },
        {
          type: 'SingleSelectComponent',
          label: '所在位置',
          model: 'device',
          required: true,
          readonly: false,
          hint: '此欄位必填',
          options: [[Object], [Object]],
          name: 'device',
        },
        {
          type: 'SingleSelectComponent',
          label: '狀態',
          model: 'status',
          required: true,
          readonly: false,
          hint: '此欄位必填',
          options: [[Object], [Object]],
          name: 'status',
        },
        {
          type: 'InputTextComponent',
          inputType: 'number',
          label: '權重',
          model: 'testNumber',
          required: true,
          readonly: false,
          hint: '此欄位必填',
          name: 'testNumber',
        },
        {
          type: 'InputTextComponent',
          inputType: 'number',
          label: '權重',
          model: 'order',
          required: true,
          readonly: false,
          hint: '此欄位必填',
          name: 'order',
        },
      ];
      const defaultValues = {
        title: 'test title',
        pic: '',
        device: 'PC',
        status: 'online',
        testNumber: '123',
        order: '1',
      };
      const { result } = renderHook(() => useForm({ defaultValues }));
      const expectResult = { order: 1, testNumber: 123 };
      expect(formatNumberForm(target, result.current.getValues)).toStrictEqual(expectResult);
    });
  });

  describe('FormaObjectDateToString', () => {
    const testDate = new Date('2023/04/26');
    describe('FormatDateString', () => {
      it('should return format date with string type', async () => {
        const target = testDate;
        const expectResult = '2023-04-26';
        expect(formatDateString(target)).toEqual(expectResult);
      });

      it('should return `2020-01-01`', () => {
        const target = new Date('2020/1/1');
        expect(formatDateString(target)).toEqual('2020-01-01');
      });
    });

    it('should return to correct object', async () => {
      const target = {
        test1: 'test 1 2 3',
        test2: testDate,
        test3: 23,
        test4: undefined,
      };
      const expectResult = {
        test1: 'test 1 2 3',
        test2: '2023-04-26',
        test3: 23,
        test4: undefined,
      };
      expect(formatObjectDateToString(target)).toStrictEqual(expectResult);
    });

    it('should return same target if no date types in object', async () => {
      const target = {
        test1: 'test 1 2 3',
        test2: '2023-04-26',
        test3: 23,
        test4: undefined,
      };
      expect(formatObjectDateToString(target)).toStrictEqual(target);
    });
  });

  describe('Final Record Format', () => {
    const testDate = new Date('2023/4/6');
    const resultDate = '2023-04-06';
    const testDate2 = new Date('2023/12/24');
    const resultDate2 = '2023-12-24';
    it('should return correct formatted object', async () => {
      const target = {
        test1: 'test 1 2 3',
        test2: testDate,
        test3: testDate2,
        test4: undefined,
        test5: 'test',
      };
      const expectResult = {
        test1: 'test+1+2+3',
        test2: resultDate,
        test3: resultDate2,
        test5: 'test',
      };
      expect(pipeFormatObject(target)).toStrictEqual(expectResult);
    });
  });

  describe('hasEmptyString', () => {
    it('should return false if there is not empty string', () => {
      const testValues = ['test1', 'test2'];
      expect(hasEmptyString(testValues)).toBeFalsy();
    });

    it('should return true if there is empty string', () => {
      const testValues = ['test1', '', 'test3'];
      expect(hasEmptyString(testValues)).toBeTruthy();
    });
  });
});
