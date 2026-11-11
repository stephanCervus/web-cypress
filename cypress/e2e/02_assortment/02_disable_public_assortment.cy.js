import products from '../../fixtures/products.json';

describe('Publiekelijk assortiment', () => {
    context('Setting UIT', () => {
        it('Assortiment navigatie link niet beschikbaar', () => {
            cy.visit('/login');
            cy.get('#customer_number-input').should('be.visible');
            cy.contains('a', 'Assortiment').should('not.exist');
        })
        it('Assortiment link niet beschikbaar', () => {
            cy.visit('/assortment')
            cy.location('pathname').should('eq', '/login');
        })
        it('Product met webtype I product pagina wordt niet getoond', () => {
            cy.visit(products.webTypeI.detailUrl);
            cy.location('pathname').should('eq', '/login');
        })
        it('Product met webtype W product pagina wordt niet getoond', () => {
            cy.visit(products.webTypeW.detailUrl);
            cy.location('pathname').should('eq', '/login');
        })
    })
})