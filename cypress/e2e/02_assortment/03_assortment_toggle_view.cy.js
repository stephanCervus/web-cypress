const option = (name) => cy.get(`.assortment__layout-option[href*="${name}"]`);

const shouldBeActive = (active, inactive) => {
    option(active).should('have.class', 'assortment__layout-option--active');
    option(inactive).should('not.have.class', 'assortment__layout-option--active');
};

describe('Switch tussen product weergave', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/');
    })

    it('Toggle tussen kaartvorm en tegelvorm', () => {
        option('card').click();
        shouldBeActive('card', 'tile');

        option('tile').click();
        shouldBeActive('tile', 'card');
    })
})