describe('Raw Materials Management', () => {
  beforeEach(() => {
    cy.visit('/raw-materials');
  });

  it('should display raw materials page', () => {
    cy.contains('Raw Materials').should('be.visible');
    cy.contains('Add New Material').should('be.visible');
  });

  it('should create a new raw material', () => {
    cy.contains('Add New Material').click();
    cy.url().should('include', '/raw-materials/new');

    cy.get('input[name="code"]').type('MAT001');
    cy.get('input[name="name"]').type('Test Material');
    cy.get('input[name="stockQuantity"]').type('1000');

    cy.contains('Create Material').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/raw-materials');
    cy.contains('MAT001').should('be.visible');
  });

  it('should update stock quantity', () => {
    cy.createRawMaterial({
      code: 'STOCK001',
      name: 'Stock Material',
      stockQuantity: 500
    });

    cy.visit('/raw-materials');
    cy.contains('STOCK001').parent().parent().contains('Edit').click();
    
    cy.get('input[name="stockQuantity"]').clear().type('750');
    cy.contains('Update Material').click();
    
    cy.url().should('eq', Cypress.config().baseUrl + '/raw-materials');
    cy.contains('STOCK001').parent().parent().contains('750').should('be.visible');
  });
});
