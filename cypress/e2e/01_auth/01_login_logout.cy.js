describe("Login/logout", () => {
    context('Gebruiker is niet ingelogd',  () => {
        it('Niet ingelogde gebruiker bezoekt /order en wordt terug gestuurd naar /login', () => {
            cy.visit('/order')
            cy.location('pathname').should('eq', '/login')
            cy.get('#customer_number-input').should('be.visible');
        })
    })
    context('Gebruiker is ingelogd', () => {
        beforeEach("Inloggen", () => {
            cy.login();
            cy.visit('/');
        });
        it ('ingelogde gebruiker bezoekt /login en wordt terug gestuurd naar /assortment', () => {
            cy.visit('/login');
            cy.location('pathname').should('eq', '/assortment');
            cy.contains('Filters').should('be.visible');
        })
        it ('Gebruiker drukt op de logout knop', () => {
            cy.contains('Thijs').click();
            cy.contains('Logout').click();
            cy.location('pathname').should('eq', '/login');

            cy.visit('/order');
            cy.location('pathname').should('eq', '/login');
            cy.get('#customer_number-input').should('be.visible');
        })
    })
});