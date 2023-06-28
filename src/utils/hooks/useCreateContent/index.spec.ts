import { formatOptions, formatSelectData } from '.';

jest.mock('swr');

jest.mock('../../request');

const mockRouterPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe('useCreateContent', () => {
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
