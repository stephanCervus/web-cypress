// Shared Cypress commands 
Cypress.Commands.add("login", (client, username, password) => {
    cy.get("#customer_number-input").type(client);
    cy.get("#username-input").type(username);
    cy.get("#password-input").type(password);
    cy.clickByText("Inloggen");
});

// Cypress.Commands.add('click', (id) => {
//     cy.get(`#${id}`).click();
// });

Cypress.Commands.add('clickByText', (text) => {
    cy.contains('button', text).click();
});