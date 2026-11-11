
describe('Pagination assortiment test', () => {
    beforeEach(() => {
        cy.schoonAssortiment();
        cy.compleetAssortiment(true);
    })

    it('Pagina 5 openen in het assortiment pagina', () => {
        cy.contains('.pagination__item', '5').click();
        cy.contains('.pagination__item', '5').should('have.class', 'pagination__item--active');
        cy.location('search').should('include', 'page=5');
    })
})