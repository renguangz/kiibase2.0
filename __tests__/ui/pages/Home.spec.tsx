import Home from '@/pages/';
import { act, render } from '@testing-library/react';

const mockReplace = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    replace: mockReplace,
  }),
}));

describe('Home Page', () => {
  beforeEach(() => {
    render(<Home />);
  });

  it('should call router replace', async () => {
    await act(async () => {
      expect(mockReplace).toHaveBeenCalledTimes(1);
      expect(mockReplace).toHaveBeenCalledWith('/adminUser');
    });
  });
});
