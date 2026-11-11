import products from '../../fixtures/products.json';
//Houdt rekening met twee situaties. Een gebruiker die het volledige assortiment kan bekijken
//En een gebruiker die alleen het eigen assortiment mag inzien.

describe('Opent product pagina', () => {
    context('Gebruiker1', () => {
        beforeEach(() => {
            cy.schoonAssortiment();
        })
        context('Eigen assortiment', () => {
            it('Opent eigen assortiment', () => {
                cy.contains(products.webTypeW.code).should('be.visible');
                cy.contains(products.webTypeI.code).should('not.exist');
            })
            it('Open product pagina met product webtype W', () => {
                cy.openProductPagina(products.webTypeW);
            })
            it('Kan geen product pagina openen met product webtype I', () => {
                cy.verwachtStatus(products.webTypeI.detailUrl, 404);
            })
        })
        context('Volledige assortiment', () => {
            it('opent het volledige assortiment en opent product pagina.', () => {
                cy.compleetAssortiment(true);
                cy.contains(products.webTypeI.code).should('be.visible');
                cy.openProductPagina(products.webTypeI);
            })
        })
    })
    context('Gebruiker2', () => {
        beforeEach(() => {
            cy.login('gebruikerTwee');
            cy.visit('/assortment');
        })
        it('Geen compleet assortiment toggle zichtbaar', () => {
            cy.contains('Filters').should('be.visible');
            cy.get('#assortiment__complete-toggle').should('not.exist');
        })
        it('Opent product pagina met webtype W', () => {
            cy.openProductPagina(products.webTypeW);
        })
        it('Kan niet een product pagina bezoeken met webtype I', () => {
            cy.verwachtStatus(products.webTypeI.detailUrl, 404);
        })
    })
})
