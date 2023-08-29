describe('Content List Page', () => {
  describe('SearchLog', () => {
    beforeEach(() => {
      cy.visit('/searchLog');
    });

    it('should have title `搜尋紀錄列表`', () => {
      cy.contains('h2', /搜尋紀錄列表/);
    });

    describe('Table', () => {
      it('should have column `ID`, `關鍵字`, `會員`, `時間`, `IP位置`, `語系`', () => {
        const headings = ['ID', '關鍵字', '會員', '時間', 'IP位置', '語系'];
        headings.forEach((item) => cy.contains(item));
      });

      // @TODO: 測試 Table 換頁

      it('should display 10 data', () => {});

      it('should display different amounts of data after clicking page size button', () => {});
    });
  });

  describe('use `banner` page for testing', () => {
    beforeEach(() => {
      cy.visit('/banner');
    });

    it('should have title `首頁底圖列表` and button `建立新的首頁底圖`', () => {
      cy.contains('h2', /首頁底圖列表/);
      cy.contains('button', /建立新的首頁底圖/);
    });
  });
});
