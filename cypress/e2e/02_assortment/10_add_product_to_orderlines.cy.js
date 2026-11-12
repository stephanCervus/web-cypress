import products from '../../fixtures/products.json';
['tile', 'card'].forEach((weergave) => {
    describe('Product toevoegen aan orderregels', () => {
        beforeEach(() => {
            cy.schoonAssortiment();
            cy.compleetAssortiment(true);
            cy.get(`.assortment__layout-option[href*="${weergave}"]`).click();
        })

        it('Product met prijs toegevoegd aan orderregels', () => {
            cy.contains(`.product-${weergave}`, products.webTypeI.code)
                .find('[data-amount-increase]')
                .click();

            cy.visit('/order');
            cy.contains('.order-lines__row', products.webTypeI.name).should('be.visible');
        })
        it('Product zonder prijs krijgt foutmelding bij het aanmaken van orderregels', () => {
            cy.contains(`.product-${weergave}`, products.productZonderKorting.code)
                .as('product');

            cy.get('@product').find('[data-amount-increase]').click();

            cy.get('@product').find('[data-amount-error]').should('be.visible');

            cy.get('@product')
                .find(`.product-card__amount-counter`)
                .should('have.text', '0');
        })
    })
})