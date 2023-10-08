import { CodeTextType } from '/src/components/Markdowns';

export const getListPage: CodeTextType[] = [
  { type: 'text', color: 'comment', text: '// Parameters' },
  { type: 'wrap', text: '' },
  { type: 'text', text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"page"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '1', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"per_page"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '10', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"keyword"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"test"', color: 'orange' },
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
  { type: 'text', tabs: 2, text: '"data"', color: 'blue' },
  { type: 'text', text: ': [' },

  { type: 'wrap', text: '' },
  { type: 'text', tabs: 3, text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 4, text: '"id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"1"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 4, text: '"name"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"test"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 4, text: '"status"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"1"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 4, text: '"pic"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"pic_url"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 4, text: '"created_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 4, text: '"updatd_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 4, text: '"deleted_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  /* end */

  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '}' },
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '],' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 2, text: 'meta', color: 'blue' },
  { type: 'text', text: ': {' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 3, text: '"total"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '1', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 3, text: '"last_page"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '1', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 3, text: '"page_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '1', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 3, text: '"page_size"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '10', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', tabs: 2, text: '}' },

  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '}' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
