import { CodeTextType } from '/src/components/Markdowns';

export const postCreatePage: CodeTextType[] = [
  { type: 'text', color: 'comment', text: '// FIXME' },
  { type: 'wrap', text: '' },
  { type: 'text', text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"type"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"還沒改"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"inputType"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"text" | "number" | "password"', color: 'orange' },
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
  { type: 'text', text: ': ' },
  { type: 'text', text: '"若無則回傳空字串"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
