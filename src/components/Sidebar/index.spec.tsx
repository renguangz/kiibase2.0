import { render } from '@testing-library/react';
import { SidebarComponent } from '.';

describe('Sidebar', () => {
  beforeEach(() => {
    render(<SidebarComponent />);
  });

  describe('sidebar menu items', () => {
    it.todo('should route to `/first-link` after clicking first button');
    it.todo('should focus if route is `/first-link`');
    it.todo('should expand if click second button');
    it.todo('should expand if click on `sub1-1`');
    it.todo('`second` and `sub1-1` button should focus after click `sub1-1-1`');
  });
});
