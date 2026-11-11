import products from '../../fixtures/products.json';

const product = products.productMetKorting;

describe('Orderregel aantal wijzigen', () => {
    beforeEach(() => {
        // Uitgangssituatie voor elke test: product staat precies 1x in de order
        cy.legeOrder(product);
        cy.voegAanbiedingToe(product);
    });

    it('Plusje in orderregel verhoogt aantal, ook in aanbiedingenblok', () => {
        cy.orderregelVan(product.name).find('[data-amount-increase]').click();

        // trim vanwege de spatie in de Blade
        cy.orderregelVan(product.name)
            .find('[data-amount-counter]')
            .invoke('text').invoke('trim')
            .should('eq', '2');

        cy.aanbiedingVan(product.code)
            .find('[data-amount-counter]')
            .should('have.text', '2');
    });
});
