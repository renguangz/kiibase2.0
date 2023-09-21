import { CodeData } from '../codes';
import { CodeTextType } from '/src/components/Markdowns';

export type TableColumnType = {
  value: string;
  label: string;
};

export const TableColumns: Record<string, TableColumnType[]> = {
  listPageComponent: [
    { value: 'component_type', label: '元件類型(type)' },
    { value: 'content', label: '元件說明' },
  ],

  detailPageComponent: [
    { value: 'component_type', label: '元件類型(type)' },
    { value: 'content', label: '範例' },
  ],
};

export type TableDataContent = {
  type: 'text' | 'editor';
  content: string | number | CodeTextType[];
};

export const TableData: Record<string, Array<Record<string, TableDataContent>>> = {
  listPageComponent: [
    { component_type: { type: 'text', content: 'label' }, content: { type: 'text', content: '純文字' } },
    { component_type: { type: 'text', content: '__checkbox' }, content: { type: 'editor', content: '勾選' } },
    {
      component_type: { type: 'text', content: '__component:list-select' },
      content: { type: 'text', content: '下拉選單(單選)' },
    },
    {
      component_type: { type: 'text', content: '__component:list-input_number' },
      content: { type: 'text', content: '數字輸入框' },
    },
    {
      component_type: { type: 'text', content: '__component:list-input' },
      content: { type: 'text', content: '輸入框' },
    },
    { component_type: { type: 'text', content: 'list-boolean' }, content: { type: 'text', content: '布林' } },
    { component_type: { type: 'text', content: 'list-image' }, content: { type: 'text', content: '圖片' } },
    { component_type: { type: 'text', content: '__slot:actions' }, content: { type: 'text', content: '按鈕(還沒做)' } },
    { component_type: { type: 'text', content: '__slot:actions' }, content: { type: 'text', content: '操作' } },
  ],

  detailPageComponent: [
    { component_type: { type: 'text', content: 'Label' }, content: { type: 'text', content: '純文字' } },
    {
      component_type: { type: 'text', content: 'Textarea' },
      content: { type: 'text', content: CodeData.detailTextarea },
    },
    { component_type: { type: 'text', content: 'Input' }, content: { type: 'text', content: CodeData.detailInput } },
    {
      component_type: { type: 'text', content: 'SingleSelect' },
      content: { type: 'text', content: CodeData.detailSingleSelect },
    },
    {
      component_type: { type: 'text', content: 'MultipleSelect' },
      content: { type: 'text', content: CodeData.detailMultipleSelect },
    },
    {
      component_type: { type: 'text', content: 'ImageUpload' },
      content: { type: 'text', content: CodeData.detailImageUpload },
    },
    {
      component_type: { type: 'text', content: 'QuillEditor' },
      content: { type: 'text', content: CodeData.detailEditor },
    },
  ],
};
