import products from '../../fixtures/products.json';

describe('Aanbieding label', () => {
    beforeEach(() => {
        cy.schoonAssortiment();
        cy.compleetAssortiment(true);
    })

    it('Product met aanbiedingsprijs heeft een label', () => {
        cy.contains('.product-tile', products.productMetKorting.code)
            .find('.product-tile__badge-promotion')
            .should('be.visible')
            .and('contain', 'Aanbieding');
    })
    it('Product zonder aanbieding heeft geen label', () => {
        cy.contains('.product-tile', products.productZonderKorting.code)
            .find('.product-tile__badge-promotion')
            .should('not.exist');
    })
})