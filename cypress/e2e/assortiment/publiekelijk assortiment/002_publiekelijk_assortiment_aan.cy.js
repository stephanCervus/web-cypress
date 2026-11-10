import products from '../../../fixtures/products.json';

describe('Publiekelijk assortiment', () => {
    context('setting AAN', () => {
        context('Login pagina', () => {
            it('Gebruiker kan vanuit login naar het assortiment', () => {
                cy.visit('/');
                cy.contains('Assortiment').click();
                cy.url().should('include', '/assortment');
            });
        })
        context('Assortiment pagina', () => {
            beforeEach(() => {
                cy.visit('/assortment');
            })

            it('Alleen producten met webtype I worden getoond', () => {
                cy.contains(products.webTypeI.code).should('be.visible');
            })

            it('Producten met webtype W word niet getoond', () => {
                cy.contains(products.webTypeW.code).should('not.exist');
            })

            it('Klik om naar product pagina te gaan', () => {
                cy.contains(products.webTypeI.name).should('be.visible');
                cy.contains(products.webTypeI.name).click();
                cy.url().should('include', products.webTypeI.detailUrl);
            })

            it('Gaat naar product detail pagina webtype W', () => {
                cy.request({
                    url: products.webTypeW.detailUrl,
                    failOnStatusCode: false
                }).its('status').should('eq', 404);

                cy.visit(products.webTypeW.detailUrl, { failOnStatusCode: false });
                cy.contains('Not Found').should('be.visible');
            })
        })
    })
});