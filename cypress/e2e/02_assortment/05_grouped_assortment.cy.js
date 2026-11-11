import products from '../../fixtures/products.json';
import categorys from '../../fixtures/categorys.json'
const toggle = () => cy.get('#assortiment__grouped-toggle');
describe('Categorieën groepeerd in assortiment', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/assortment');
    })
    it('Groepering categorie in het assortiment', () => {
        toggle().should('have.attr', 'aria-checked', 'false');
        cy.get('.assortment__categry-heading').should('not.exist');

        cy.get('#assortiment__complete-toggle').click();
        toggle().click();
        cy.contains(categorys.categoryOne.name).should('be.visible');
        cy.contains(categorys.subCategoryOne.name).should('be.visible');
        cy.contains(products.productSearchTest.code).should('be.visible');

    })
})