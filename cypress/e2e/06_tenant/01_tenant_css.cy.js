import tenant from '../../fixtures/tenant.json';

describe('Tenant css inladen', () => {
    it('Laadt css van actieve tenant in', () => {
        cy.intercept('GET', `**/tenants/${tenant.naam}/css/${tenant.naam}.css*`).as('tenantCss');
        cy.visit('/');
        cy.wait('@tenantCss').its('response.statusCode').should('be.oneOf', [200, 304]);

        cy.get('.navbar').should('have.css', 'background-color', tenant.navbarKleur);
    })
})
