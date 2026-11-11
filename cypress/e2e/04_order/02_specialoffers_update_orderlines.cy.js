import products from '../../fixtures/products.json';

const product = products.productMetKorting;

// Blok met teller + knoppen in het aanbiedingenblok
// TODO selector: vervangen door [data-product-code] zodra wrapper er is
const aanbiedingVan = (code) =>
    cy.get('.order__sidebar')
        .contains('.special-offers-content', code)
        .next('.special-offers__bottom');

// Orderregel van dit product
// TODO selector: zoeken op naam vervangen door [data-product-code] op de regel
const orderregelVan = (naam) =>
    cy.contains('[data-order-line]', naam);

describe('Kortings producten live update aan orderregels', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/order');

        // Opruimen: teller in aanbiedingenblok terug naar 0
        aanbiedingVan(product.code).within(() => {
            cy.get('[data-amount-counter]').invoke('text').then((tekst) => {
                const aantal = Number(tekst);
                for (let i = 1; i <= aantal; i++) {
                    cy.get('[data-amount-decrease]').click();
                    cy.get('[data-amount-counter]').should('have.text', String(aantal - i));
                }
            });
        });
    });

    it('Product uit aanbiedingenblok komt in de orderregels', () => {
        aanbiedingVan(product.code).within(() => {
            cy.get('[data-amount-increase]').click();
            cy.get('[data-amount-counter]').should('have.text', '1');
        });

        orderregelVan(product.name).should('be.visible');
    });

    it('Plusje in orderregel verhoogt aantal, ook in aanbiedingenblok', () => {
        // Eerst toevoegen vanuit het aanbiedingenblok
        aanbiedingVan(product.code).find('[data-amount-increase]').click();
        orderregelVan(product.name).should('be.visible');

        // Plusje in de orderregel
        orderregelVan(product.name).find('[data-amount-increase]').click();

        // Orderregel staat op 2 (trim vanwege de spatie in de Blade)
        orderregelVan(product.name)
            .find('[data-amount-counter]')
            .invoke('text').invoke('trim')
            .should('eq', '2');

        // Aanbiedingenblok staat ook op 2
        aanbiedingVan(product.code)
            .find('[data-amount-counter]')
            .should('have.text', '2');
    });

    it('Delete product uit orderregels', () => {
        orderregelVan(product.name).find('[data-order-line-delete]').click();

        aanbiedingVan(product.code)
            .find('[data-amount-counter]')
            .should('have.text', '0');
    })
});