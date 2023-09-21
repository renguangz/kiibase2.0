import { CodeTextType } from '/src/components/Markdowns';
import { postLogin } from './postLogin';
import { getNaviItem } from './getNaviItem';
import { detailInput } from './detailInput';
import { detailSingleSelect } from './detailSingleSelect';
import { detailMultipleSelect } from './detailMultipleSelect';
import { detailEditor } from './detailEditor';
import { detailTextarea } from './detailTextarea';
import { detailImageUpload } from './detailImageUpload';
import { getConfig } from './getConfig';

export const CodeData: Record<string, CodeTextType[]> = {
  postLogin,
  getNaviItem,
  detailInput,
  detailSingleSelect,
  detailMultipleSelect,
  detailEditor,
  detailTextarea,
  detailImageUpload,
  getConfig,
};
