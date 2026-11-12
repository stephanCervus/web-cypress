describe('Inloggen met foutieve inloggegevens', () => {
    it('Foutieve combinatie: gebruiker blijft op /login en ziet een foutmelding', () => {
        cy.fixture('gebruikers').then(({ ongeldigGebruiker }) => {
            cy.env(['gebruikerEen'], { log: false }).then(({ gebruikerEen }) => {
                cy.vulLoginIn(gebruikerEen.client, ongeldigGebruiker.username, ongeldigGebruiker.password);
            });
        });
        cy.opLoginPagina();
        cy.contains('De opgegeven inloggegevens zijn onjuist.').should('be.visible');

        cy.visit('/order');
        cy.opLoginPagina();
    })
})