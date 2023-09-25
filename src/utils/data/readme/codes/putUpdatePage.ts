import { CodeTextType } from '/src/components/Markdowns';

export const putUpdatePage: CodeTextType[] = [
  { type: 'text', color: 'comment', text: '// Body' },
  { type: 'wrap', text: '' },
  { type: 'text', text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"name"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"test"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"pic"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"pic_url"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"status"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"2"', color: 'orange' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },

  { type: 'wrap', text: '' },
  { type: 'wrap', text: '' },
  { type: 'text', color: 'comment', text: '// Response' },
  { type: 'wrap', text: '' },
  { type: 'text', text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"status"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '200', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"message"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"success"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"data"', color: 'blue' },
  { type: 'text', text: ': {' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"1"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"name"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"test"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"status"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"1"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"pic"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"pic_url"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"created_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"updated_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '"deleted_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '}' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
