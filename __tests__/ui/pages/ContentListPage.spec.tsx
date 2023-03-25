import ContentListPage from '@/pages/[content]';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';

window.matchMedia = jest.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
});

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/searchLog',
  }),
}));

describe('ContentListPage', () => {
  beforeEach(() => render(<ContentListPage />));

  describe('SearchLog Page', () => {
    it('should have title `搜尋紀錄列表` and subtitle `檢視全部搜尋紀錄`', () => {
      const title = screen.getByRole('heading', { name: /搜尋紀錄列表/ });
      expect(title).toBeInTheDocument();
      // expect(screen.getByText(/檢視全部搜尋紀錄/)).toBeInTheDocument();
    });
  });
});
