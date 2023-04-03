describe('Login', () => {
  beforeEach(() => {
    cy.clearCookie('token');
  });

  it('should route to `auth/login` if not login', () => {
    cy.visit('/searchLog');
    cy.wait(1000);
    cy.location('pathname').should('equal', '/auth/login');

    cy.setCookie('token', 'user login token');
    cy.visit('/searchLog');
    cy.wait(1000);
    cy.location('pathname').should('equal', '/searchLog');
  });

  it('should not route to `auth/login` if login', () => {
    cy.setCookie('token', 'user login token');
    cy.visit('searchLog');
    cy.wait(1000);
    cy.location('pathname').should('equal', '/searchLog');
  });
});
