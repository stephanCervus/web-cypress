import products from '../../fixtures/products.json';

describe('Compleet assortiment', () => {
    beforeEach(() => {
        cy.schoonAssortiment();
    })

    it('Toggle tussen compleet assortiment', () => {
        // schoonAssortiment heeft de toggle al op UIT gezet
        cy.contains(products.webTypeI.code).should('not.exist');

        cy.compleetAssortiment(true);
        cy.contains(products.webTypeI.code).should('be.visible');
    })
})
