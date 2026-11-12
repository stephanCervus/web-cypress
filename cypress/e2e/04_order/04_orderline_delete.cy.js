import products from '../../fixtures/products.json';

const product = products.productMetKorting;

describe('Orderregel verwijderen', () => {
    beforeEach(() => {
        cy.leegAlleOrderregels();
        cy.voegAanbiedingToe(product);
    });

    it('Delete product uit orderregels met delete knop', () => {
        cy.orderregelVan(product.name).find('[data-order-line-delete]').click();

        cy.orderregelVan(product.name).should('not.exist');
        cy.aanbiedingVan(product.code)
            .find('[data-amount-counter]')
            .should('have.text', '0');
    });

    it('Delete product uit orderregels met de decrease knop', () => {
        cy.orderregelVan(product.name).find('[data-amount-counter]')
            .invoke('text').invoke('trim')
            .should('eq', '1');
        cy.orderregelVan(product.name).find('[data-amount-decrease]').click();
        cy.orderregelVan(product.name).should('not.exist');
        cy.aanbiedingVan(product.code)
            .find('[data-amount-counter]')
            .should('have.text', '0');
    })
});
