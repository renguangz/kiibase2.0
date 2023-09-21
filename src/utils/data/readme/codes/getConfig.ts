import { CodeTextType } from '/src/components/Markdowns';

export const getConfig: CodeTextType[] = [
  { type: 'text', text: '{' },

  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"status"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '200', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"message"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"success"', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"data"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '{', color: 'white' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"create_button"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'true', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"delete_button"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'true', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"list"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'Array, 請參考最下方列表頁欄位對照表', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"date_filter"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'false', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"date_filter_column"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '目前用不到', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"detailExtend"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'true', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"field"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'Array, 請參考最下方內頁欄位對照表', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"topic"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"顯示的標題"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"is_single_data"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'false', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"single_data_id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'null', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}', tabs: 1 },

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
