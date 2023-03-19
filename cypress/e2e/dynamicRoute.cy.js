const findTargetButtonThenclick = (data) => cy.findByText(data).click();

describe('Dynamic Routes', () => {
  it('should route to different page after clicking on different sidebar menu', () => {
    cy.visit('/');

    findTargetButtonThenclick(/詢價表單/);
    cy.location('pathname').should('equal', '/quotation');

    findTargetButtonThenclick(/聯絡表單/);
    cy.location('pathname').should('equal', '/contact');

    findTargetButtonThenclick(/會員資料/);
    cy.location('pathname').should('equal', '/member');

    findTargetButtonThenclick(/電子型錄/);
    cy.location('pathname').should('equal', '/catalog');

    findTargetButtonThenclick(/折扣優惠/);
    cy.location('pathname').should('equal', '/promoCode');

    findTargetButtonThenclick(/搜尋紀錄/);
    cy.location('pathname').should('equal', '/searchLog');

    findTargetButtonThenclick(/首頁底圖/);
    cy.location('pathname').should('equal', '/banner');
  });

  it('should route to different after clicking on different sidebar sub menu', () => {
    cy.visit('/');

    findTargetButtonThenclick(/權限管理/);
    findTargetButtonThenclick(/管理者權限設定/);
    cy.location('pathname').should('equal', '/role');

    findTargetButtonThenclick(/產品管理/);
    findTargetButtonThenclick(/產品分類/);
    cy.location('pathname').should('equal', '/productCategory');
  });

  describe('use `SearchLog` page for testing', () => {
    beforeEach(() => {
      cy.visit('/searchLog');
    });

    it('should have title `搜尋紀錄列表`', () => {
      cy.contains('h2', /搜尋紀錄列表/);
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
