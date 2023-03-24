import { reduceQueryParams, replaceFirstQuery } from '.';

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
});
