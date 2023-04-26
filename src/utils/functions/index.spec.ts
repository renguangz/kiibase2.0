import {
  formatObjectValueWithPlus,
  getContentPath,
  isNotContentDynamicRouteYet,
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
});
