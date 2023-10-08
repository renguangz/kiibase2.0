import { CodeTextType } from '/src/components/Markdowns';

export const detailSingleSelect: CodeTextType[] = [
  { type: 'text', text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"type"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"SingleSelect"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"options"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '[' },
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '{' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 3, text: '"name"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '}' },
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: ']' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"label"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"顯示的名稱"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"model"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"body_name"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"required"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'true', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"disabled"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'true', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"hint"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"錯誤的提示內容"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"default"', color: 'blue' },
  { type: 'text', text: ': [' },
  { type: 'text', text: '"1", "2, "3', color: 'orange' },
  { type: 'text', text: ']' },
  { type: 'text', text: ',' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
