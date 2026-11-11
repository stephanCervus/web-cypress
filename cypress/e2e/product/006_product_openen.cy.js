import products from '../../fixtures/products.json';
//Houdt rekening met twee situaties. Een gebruiker die het volledige assortiment kan bekijken
//En een gebruiker die alleen het eigen assortiment mag inzien.

describe('Opent product pagina', () => {
    context('Gebruiker1', () => {
        beforeEach(() => {
            cy.login();
        })
        context('Eigen assortiment', () => {
            it('Opent eigen assortiment', () => {
                cy.visit('/assortment');
                cy.contains(products.webTypeW.code).should('be.visible');
                cy.contains(products.webTypeI.code).should('not.exist');
            })
            it('Open product pagina met product webtype W', () => {
                cy.visit('/assortment');
                cy.contains(products.webTypeW.name).should('be.visible').click();
                cy.url().should('include', products.webTypeW.detailUrl);
            })
            it('Kan geen product pagina openen met prodcut webtype I', () => {
                cy.request({
                    url: products.webTypeI.detailUrl,
                    failOnStatusCode: false
                }).its('status').should('eq', 404);
            })
        })
        context('Volledige assortiment', () => {
            it('opent het volledige assortiment en opent product pagina.', () => {
                cy.visit('/assortment');
                cy.get('#assortiment__complete-toggle').click();
                cy.contains(products.webTypeI.code).should('be.visible');
                cy.contains(products.webTypeI.name).should('be.visible').click();
                cy.url().should('include', products.webTypeI.detailUrl);
            })
        })
    })
    context('Gebruiker2', () => {
        beforeEach(() => {
            cy.login('gebruikerTwee')
        })
        it('Geen compleet assortiment toggle zichtbaar', () => {
            cy.visit('/assortment');
            cy.contains('Filters').should('be.visible');
            cy.get('#assortiment__complete-toggle').should('not.exist');
        })
        it('Opent product pagina met webtype W', () => {
            cy.visit('/assortment');
            cy.contains(products.webTypeW.name).should('be.visible').click();
            cy.url().should('include', products.webTypeW.detailUrl);
        })
        it('Kan niet een product pagina bezoeken met webtype I', () => {
            cy.request({
                url: products.webTypeI.detailUrl,
                failOnStatusCode: false
            }).its('status').should('eq', 404);
        })
    })
})