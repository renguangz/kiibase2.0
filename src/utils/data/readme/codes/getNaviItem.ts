import { CodeTextType } from '/src/components/Markdowns';

export const getNaviItem: CodeTextType[] = [
  { type: 'text', color: 'comment', text: '// Response' },
  { type: 'wrap', text: '' },
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
  { type: 'text', text: '[', color: 'white' },

  { type: 'wrap', text: '' },
  { type: 'text', text: '{', tabs: 2, color: 'white' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '1', color: 'orange' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"name"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"Display Name"', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"is_menu"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'false', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"route"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"example_path" | undefined', color: 'orange' },
  { type: 'wrap', text: '' },
  { type: 'text', text: '}', tabs: 2, color: 'white' },
  { type: 'text', text: ',' },

  { type: 'wrap', text: '' },
  { type: 'text', text: '{', tabs: 2, color: 'white' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '2', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"name"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"Display Name"', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"is_menu"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'true', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 3, text: '"items"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '[' },
  { type: 'wrap', text: '' },

  { type: 'text', text: '{', tabs: 4, color: 'white' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 5, text: '"id"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '3', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 5, text: '"name"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"Display Name"', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 5, text: '"is_menu"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: 'false', color: 'orange' },
  { type: 'text', text: ',' },
  { type: 'wrap', text: '' },

  { type: 'text', tabs: 5, text: '"route"', color: 'blue' },
  { type: 'text', text: ': ' },
  { type: 'text', text: '"example_path" | undefined', color: 'orange' },

  { type: 'wrap', text: '' },
  { type: 'text', text: '}', tabs: 4, color: 'white' },

  { type: 'wrap', text: '' },
  { type: 'text', tabs: 3, text: ']' },

  { type: 'wrap', text: '' },
  { type: 'text', text: '}', tabs: 2, color: 'white' },

  { type: 'wrap', text: '' },
  { type: 'text', text: ']', tabs: 1 },

  { type: 'wrap', text: '' },
  { type: 'text', text: '}' },
];
