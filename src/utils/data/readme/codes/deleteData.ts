import { CodeTextType } from '/src/components/Markdowns';

export const deleteData: CodeTextType[] = [
  { type: 'text', color: 'comment', text: '// Response' },
  { type: 'wrap', text: '' },
  { type: 'text', text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"1"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"deleted_at"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"string"', color: 'orange' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
