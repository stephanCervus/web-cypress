import products from '../../fixtures/products.json';
import categories from '../../fixtures/categories.json';

describe('Category Filter Assortment', () => {
    beforeEach(() => {
        cy.schoonAssortiment();
    })

    it('Filteren op product binnen subcategory', () => {
        cy.compleetAssortiment(true);
        cy.contains('.filter-group__header', categories.categoryTwo.name).click();

        cy.get(`input[name^="category"][value="${categories.subCategoryTwo.code}"]`).check();
        cy.contains('.filter-panel__footer button', 'Toepassen').click();
        cy.contains(products.productCategoryFilter.code).should('be.visible');
    })
})
