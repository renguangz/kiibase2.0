import { CodeTextType } from '/src/components/Markdowns';

export const resetPassword: CodeTextType[] = [
  { type: 'text', color: 'comment', text: '// Body' },
  { type: 'wrap', text: '' },
  { type: 'text', text: '{' },

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"old_password"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"password"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"new_password"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"password"', color: 'orange' },
  { type: 'text', text: ',' },
  /* end */

  /* start */
  { type: 'wrap', text: '' },
  { type: 'text', tabs: 1, text: '"new_password_confirmation"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"password"', color: 'orange' },
  { type: 'text', text: ',' },
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
  { type: 'text', text: ': ' },
  { type: 'text', text: 'true', color: 'orange' },
  /* end */

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
