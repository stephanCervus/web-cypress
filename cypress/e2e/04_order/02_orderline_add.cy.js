import products from '../../fixtures/products.json';

const product = products.productMetKorting;

describe('Orderregel toevoegen', () => {
    beforeEach(() => {
        cy.legeOrder(product);
    });

    it('Product uit aanbiedingenblok komt in de orderregels', () => {
        cy.aanbiedingVan(product.code).within(() => {
            cy.get('[data-amount-increase]').click();
            cy.get('[data-amount-counter]').should('have.text', '1');
        });

        cy.orderregelVan(product.name).should('be.visible');
    });
});
