import { getContentPath, isNotContentDynamicRouteYet, reduceQueryParams, replaceFirstQuery } from '.';

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
});
