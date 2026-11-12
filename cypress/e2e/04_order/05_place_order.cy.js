import products from '../../fixtures/products.json';

const product = products.productMetKorting;

describe ('Bestelling plaatsen', () => {
    beforeEach(() => {
        cy.leegAlleOrderregels();
        cy.voegAanbiedingToe(product);
    })

    it('Bestelling plaatsen en orderstatus pagina bezoeken', () => {
        cy.contains('.order-panel__badge', 'Webordernummer')
            .invoke('text')
            .then((text) => text.replace(/\D/g, ''))
            .as('orderNr');

        cy.get('button[form="order-form"]').click();
        cy.visit('/order/status');

        cy.get('@orderNr').then((orderNr) => {
            cy.get(`button[data-order-row="${orderNr}"]`).click();
        });

        cy.contains(products.productMetKorting.name).should('be.visible');
    })
})