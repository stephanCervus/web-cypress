describe ('Tenant css inladen', () => {
    it('Laadt css van actieve tenant in', () => {
        const tenant = 'demowebbestel';

        cy.intercept('GET', `**/tenants/${tenant}/css/${tenant}.css*`).as('tenantCss');
        cy.visit('/');
        cy.wait('@tenantCss').its('response.statusCode').should('be.oneOf', [200, 304]);

        cy.get('.navbar').should('have.css', 'background-color', 'rgb(211, 47, 47)');
    })
})