describe('Production Report', () => {
  beforeEach(() => {
    // Create test data
    cy.createRawMaterial({
      code: 'STEEL',
      name: 'Steel',
      stockQuantity: 1000
    });

    cy.createRawMaterial({
      code: 'PLASTIC',
      name: 'Plastic',
      stockQuantity: 500
    });

    cy.visit('/production');
  });

  it('should display production report', () => {
    cy.contains('Production Report').should('be.visible');
    cy.contains('Total Production Value').should('be.visible');
    cy.contains('Recalculate').should('be.visible');
  });

  it('should recalculate production on button click', () => {
    cy.contains('Recalculate').click();
    cy.contains('Total Production Value').should('be.visible');
  });

  it('should show production info message', () => {
    cy.contains('About Production Calculation').should('be.visible');
    cy.contains('Products are prioritized by their value').should('be.visible');
  });
});
