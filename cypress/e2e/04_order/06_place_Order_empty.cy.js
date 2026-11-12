import products from '../../fixtures/products.json';

const product = products.productMetKorting;

describe('Order plaatsen zonder producten', () => {
    beforeEach(() => {
        cy.leegAlleOrderregels();
        cy.voegAanbiedingToe(product);
    })

    it('Bestellen niet mogelijk zonder producten in de orderregels', () => {
        cy.orderregelVan(product.name).find('[data-order-line-delete]').click();

        cy.orderregelVan(product.name).should('not.exist');
        cy.aanbiedingVan(product.code)
            .find('[data-amount-counter]')
            .should('have.text', '0');

        cy.get('button[form="order-form"]').should('not.be.visible');
        cy.get('[data-order-empty]').should('be.visible');
    })
})