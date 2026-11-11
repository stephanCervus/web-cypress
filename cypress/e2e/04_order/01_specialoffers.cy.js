import products from '../../fixtures/products.json';

//Gebruik gemaakt van twee testgebruikers. één met korting en één zonder korting.
//Product met korting heeft geen einddatum, waardoor de korting altijd blijft bestaan.
//Product zonder korting mag GEEN kortingsprijs krijgen bij één van de testgebruikers.

describe('Aanbiedingen', () => {
    it('Toon alleen producten met aanbiedingen in het aanbiedingenblok', () => {
        cy.login();
        cy.visit('/order');
        cy.get('.order__sidebar').should('be.visible')
        .within(() => {
            cy.contains(products.productMetKorting.code).should('exist');
            cy.contains(products.productZonderKorting.code).should('not.exist');
        });
    })
    it('Toont een melding als er geen aanbiedingen zijn', () => {
        cy.login('gebruikerTwee');
        cy.visit('/order');
        cy.get('.order__sidebar').should('be.visible')
            .within(() => {
                cy.get('.order-offers-placeholder').should('be.visible')
                    .and('contain', 'Momenteel zijn er geen aanbiedingen beschikbaar.');
                cy.get('.special-offers-content').should('not.exist');
            })
    })
})