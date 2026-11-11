import products from '../../fixtures/products.json';
import categorys from '../../fixtures/categorys.json'

describe('Category Filter Assortment', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/assortment');
    })
    it('Filteren op product binnen subcategory', () => {
        cy.get('#assortiment__complete-toggle').click();
        cy.contains('.filter-group__header', categorys.categoryTwo.name).click();

        cy.get(`input[name^="category"][value="${categorys.subCategoryTwo.code}"]`).check();
        cy.contains('.filter-panel__footer button', 'Toepassen').click();
        cy.contains(products.productCategoryFilter.code).should('be.visible');
    })
})