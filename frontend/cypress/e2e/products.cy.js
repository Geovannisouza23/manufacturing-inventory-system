describe('Products Management', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should display products page', () => {
    cy.contains('Products').should('be.visible');
    cy.contains('Add New Product').should('be.visible');
  });

  it('should create a new product', () => {
    cy.contains('Add New Product').click();
    cy.url().should('include', '/products/new');

    cy.get('input[name="code"]').type('TEST001');
    cy.get('input[name="name"]').type('Test Product');
    cy.get('input[name="value"]').type('150.50');

    cy.contains('Create Product').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/products');
    cy.contains('TEST001').should('be.visible');
  });

  it('should edit a product', () => {
    cy.createProduct({
      code: 'EDIT001',
      name: 'Product to Edit',
      value: 100.00,
      materials: []
    });

    cy.visit('/products');
    cy.contains('EDIT001').parent().parent().contains('Edit').click();
    
    cy.get('input[name="name"]').clear().type('Edited Product');
    cy.contains('Update Product').click();
    
    cy.url().should('eq', Cypress.config().baseUrl + '/products');
    cy.contains('Edited Product').should('be.visible');
  });

  it('should delete a product', () => {
    cy.createProduct({
      code: 'DEL001',
      name: 'Product to Delete',
      value: 200.00,
      materials: []
    });

    cy.visit('/products');
    cy.contains('DEL001').parent().parent().contains('Delete').click();
    cy.contains('DEL001').parent().parent().contains('Confirm?').click();
    
    cy.contains('DEL001').should('not.exist');
  });
});
