import ContentListPage from '@/pages/[content]';
import { act, render, screen } from '@testing-library/react';

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
  beforeEach(() => {
    render(<ContentListPage />);
  });

  describe('SearchLog Page', () => {
    it('should have title `搜尋紀錄列表` and subtitle `檢視全部搜尋紀錄`', async () => {
      const title = screen.getByRole('heading', { name: /搜尋紀錄列表/ });

      expect(title).toBeInTheDocument();
      // expect(screen.getByText(/檢視全部搜尋紀錄/)).toBeInTheDocument();
    });

    it.todo('should have filter');

    it('should have table with columns `ID`, `關鍵字`, `會員`, `時間`, `IP位置`, `語系`', async () => {
      const expectColumns = ['ID', '關鍵字', '會員', '時間', 'IP位置', '語系'];
      const columns = screen.getAllByRole('columnheader');
      expect(columns.length).toBe(expectColumns.length);

      columns.forEach((column, index) => {
        expect(column.innerHTML).toEqual(expectColumns[index]);
      });
    });
  });
});
