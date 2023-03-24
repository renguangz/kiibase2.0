export const isArray = (data: any): boolean => Array.isArray(data);

export const isEvery = (rule: Function) => (data: Array<any>) => data.every((item) => rule(item));

export const hasTitleRule = <T>(item: T) => 'title' in item;

export const isEveryItemHasTitle = isEvery(hasTitleRule);

export const reduceQueryParams = (object: Record<string, string>): string =>
  Object.keys(object).reduce((acc, cur) => (object[cur] ? (acc += `&${cur}=${object[cur]}`) : acc), '');

export const replaceFirstQuery = (data: string) => data.replace('&', '?');
