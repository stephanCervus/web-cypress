import products from '../../fixtures/products.json';
['tile', 'card'].forEach((weergave) => {
    describe('Aanbieding label', () => {
        beforeEach(() => {
            cy.schoonAssortiment();
            cy.compleetAssortiment(true);
            cy.get(`.assortment__layout-option[href*="${weergave}"]`).click();
        })

        it('Product met aanbiedingsprijs heeft een label', () => {
            cy.contains(`.product-${weergave}`, products.productMetKorting.code)
                .find(`.product-${weergave}__badge-promotion`)
                .should('be.visible')
                .and('contain', 'Aanbieding');
        })
        it('Product zonder aanbieding heeft geen label', () => {
            cy.contains(`.product-${weergave}`, products.productZonderKorting.code)
                .find(`.product-${weergave}__badge-promotion`)
                .should('not.exist');
        })
    })
})