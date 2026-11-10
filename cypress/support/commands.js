// Shared Cypress commands 
Cypress.Commands.add("login", (client, username, password) => {
    cy.env(["client", "username", "password"], { log: false }).then((env) => {
        client = client ?? env.client;
        username = username ?? env.username;
        password = password ?? env.password;

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