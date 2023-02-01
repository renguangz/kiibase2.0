import { render } from '@testing-library/react';
import { HeaderComponent } from '.';

describe('Header component', () => {
  beforeEach(() => {
    render(<HeaderComponent />);
  });

  describe('auth', () => {
    it.todo('should popup after clicking');
  });
});
