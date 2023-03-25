import { render, screen } from '@testing-library/react';
import { enhanceFilterField, EnhanceFilterFieldProps } from '.';

describe('enhanceFilterField', () => {
  const setup = (props: EnhanceFilterFieldProps) => render(enhanceFilterField('')(props));

  it('should have label', () => {
    const props = {
      label: 'test label',
    };
    setup(props);

    const label = screen.getByRole('heading');
    expect(label.innerHTML).toBe('test label');
  });
});
