import products from '../../fixtures/products.json';

const toggle = () => cy.get('#assortiment__complete-toggle');
describe('Compleet assortiment', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/assortment')
    })
    it('Toggle tussen compleet assortiment', () => {
        toggle().should('have.attr', 'aria-checked', 'false');
        cy.contains(products.webTypeI.code).should('not.exist');

        toggle().click();
        toggle().should('have.attr', 'aria-checked', 'true');
        cy.contains(products.webTypeI.code).should('be.visible');
    })

})