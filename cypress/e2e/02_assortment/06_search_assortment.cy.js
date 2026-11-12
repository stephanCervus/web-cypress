import products from '../../fixtures/products.json';

describe('Zoek functionaliteit', () => {
    beforeEach(() => {
        cy.schoonAssortiment();
        cy.compleetAssortiment(true);
    })

    it('Zoek functionaliteit geeft product terug', () => {

        cy.get('.assortment-search__desktop')
            .find('input[name="search"]')
            .type(`${products.productSearchTest.name}{enter}`);

        cy.location('search').then((search) => {
            expect(new URLSearchParams(search).get('search')).to.eq(products.productSearchTest.name);
        })

        cy.contains(products.productSearchTest.code).should('be.visible');
        cy.contains(products.webTypeI.code).should('not.exist');
    })

    it('Zoek resultaat die geen producten terug geeft', () => {
        cy.get('.assortment-search__desktop')
            .find('input[name="search"]')
            .type('testProductDieNietBestaat{enter}');

        cy.location('search').then((search) => {
            expect(new URLSearchParams(search).get('search')).to.eq('testProductDieNietBestaat');
        })
        cy.get('.assortment__empty').should('be.visible');
        cy.get('.product-tile').should('not.exist');
    })
})
