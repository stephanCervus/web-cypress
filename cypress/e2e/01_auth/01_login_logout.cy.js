describe("Login/logout", () => {
    context('Gebruiker is niet ingelogd', () => {
        it('Niet ingelogde gebruiker bezoekt /order en wordt terug gestuurd naar /login', () => {
            cy.visit('/order');
            cy.opLoginPagina();
        })
    })
    context('Gebruiker is ingelogd', () => {
        beforeEach("Inloggen", () => {
            cy.login();
            cy.visit('/');
        });
        it('ingelogde gebruiker bezoekt /login en wordt terug gestuurd naar /assortment', () => {
            cy.visit('/login');
            cy.location('pathname').should('eq', '/assortment');
            cy.contains('Filters').should('be.visible');
        })
        it('Gebruiker drukt op de logout knop', () => {
            // TODO: 'Thijs' is de naam van jouw testgebruiker; zie uitleg over env-veld "naam"
            cy.contains('Thijs').click();
            cy.contains('Logout').click();
            cy.opLoginPagina();

            cy.visit('/order');
            cy.opLoginPagina();
        })
    })
});
