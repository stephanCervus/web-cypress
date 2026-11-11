import products from '../../fixtures/products.json';
import categories from '../../fixtures/categories.json';

describe('Categorieën gegroepeerd in assortiment', () => {
    beforeEach(() => {
        cy.schoonAssortiment();
    })

    it('Groepering categorie in het assortiment', () => {
        // TODO: check spelling van deze class in de HTML ("categry" vs "category")
        cy.get('.assortment__categry-heading').should('not.exist');

        cy.compleetAssortiment(true);
        cy.gegroepeerd(true);
        cy.contains(categories.categoryOne.name).should('be.visible');
        cy.contains(categories.subCategoryOne.name).should('be.visible');
        cy.contains(products.productSearchTest.code).should('be.visible');
    })
})
