describe('Navigation', () => {
  it('should navigate to all pages', () => {
    cy.visit('/');
    cy.contains('Welcome to Inventory Management System').should('be.visible');

    cy.contains('Manage Products').click();
    cy.url().should('include', '/products');

    cy.get('nav').contains('Raw Materials').click();
    cy.url().should('include', '/raw-materials');

    cy.get('nav').contains('Production').click();
    cy.url().should('include', '/production');

    cy.get('nav').contains('Home').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should be responsive', () => {
    cy.viewport('iphone-6');
    cy.visit('/');
    cy.contains('Inventory Management System').should('be.visible');

    cy.viewport('ipad-2');
    cy.visit('/products');
    cy.contains('Products').should('be.visible');
  });
});
