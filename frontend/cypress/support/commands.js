// cypress/support/commands.js

Cypress.Commands.add('login', () => {
  // Add custom commands here if needed
});

Cypress.Commands.add('createProduct', (product) => {
  cy.request('POST', 'http://localhost:8080/api/products', product);
});

Cypress.Commands.add('createRawMaterial', (material) => {
  cy.request('POST', 'http://localhost:8080/api/raw-materials', material);
});

Cypress.Commands.add('cleanDatabase', () => {
  // Add database cleanup logic if needed
});
