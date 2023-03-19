import { ItemType } from 'antd/es/menu/hooks/useItems';
import { MenuItemsDataType } from './hooks';

export const isArray = (data: any): boolean => Array.isArray(data);

export const isEvery = (rule: Function) => (data: Array<any>) => data.every((item) => rule(item));

export const hasTitleRule = <T>(item: T) => 'title' in item;

export const isEveryItemHasTitle = isEvery(hasTitleRule);
