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
import { getListPage } from './getListPage';
import { postCreatePage } from './postCreatePage';
import { putUpdatePage } from './putUpdatePage';
import { deleteData } from './deleteData';
import { registerUser } from './registerUser';
import { resetPassword } from './resetPassword';

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
  getListPage,
  postCreatePage,
  putUpdatePage,
  deleteData,
  registerUser,
  resetPassword,
};
