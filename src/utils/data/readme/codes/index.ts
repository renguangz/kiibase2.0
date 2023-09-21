import { CodeTextType } from '/src/components/Markdowns';
import { postLogin } from './postLogin';
import { getNaviItem } from './getNaviItem';

export const CodeData: Record<string, CodeTextType[]> = {
  postLogin,
  getNaviItem,
};
