import products from '../../fixtures/products.json';

const product = products.productMetKorting;

describe('Orderregel verwijderen', () => {
    beforeEach(() => {
        cy.leegAlleOrderregels();
        cy.voegAanbiedingToe(product);
    });

    it('Delete product uit orderregels zet aanbiedingenblok terug op 0', () => {
        cy.orderregelVan(product.name).find('[data-order-line-delete]').click();

        cy.orderregelVan(product.name).should('not.exist');
        cy.aanbiedingVan(product.code)
            .find('[data-amount-counter]')
            .should('have.text', '0');
    });
});
