// Shared Cypress commands 
Cypress.Commands.add("login", (gebruiker = "gebruikerEen") => {
    cy.env([gebruiker], { log: false }).then((env) => {
        if (!env[gebruiker]) {
            throw new Error(`Gebruiker "${gebruiker}" niet gevonden in cypress.env.json (let op hoofdletters).`);
        }
        const { client, username, password } = env[gebruiker];

        cy.session([client, username], () => {
            cy.visit("/login");
            cy.get("#customer_number-input").type(client);
            cy.get("#username-input").should("be.enabled").type(username);
            cy.get("#password-input").should("be.enabled").type(password, { log: false });
            cy.clickByText("Inloggen");
            cy.location("pathname").should("not.eq", "/login");
        });
    });
});

// Cypress.Commands.add('click', (id) => {
//     cy.get(`#${id}`).click();
// });

Cypress.Commands.add('clickByText', (text) => {
    cy.contains('button', text).click();
});