describe('Toon button open en sluiten', () => {
    beforeEach(() => {
        cy.Orderstatus()
    })

    it('Kan de detail van een order openen en weer sluiten', () => {

        //Pak de eerste toggle en geef het een naam
        cy.get('[data-orderstatus-toggle]').first().as('toggle');

        cy.get('@toggle')
            .invoke('attr', 'aria-controls')
            .then((panelId) => {
                cy.get(`#${panelId}`).as('panel')
            })

        //Begin toestand (dicht)
        cy.get('@toggle').should('have.attr', 'aria-expanded', 'false')
        cy.get('@toggle').find('[data-toggle-label]').should('have.text', 'Toon')
        cy.get('@panel').should('not.be.visible')

        //Open
        cy.get('@toggle').click()
        cy.get('@toggle').should('have.attr', 'aria-expanded', 'true')
        cy.get('@toggle').find('[data-toggle-label]').should('have.text', 'Verberg')
        cy.get('@panel').should('be.visible')

        //Opnieuw gesloten
        cy.get('@toggle').click()
        cy.get('@toggle').should('have.attr', 'aria-expanded', 'false')
        cy.get('@toggle').find('[data-toggle-label]').should('have.text', 'Toon')
        cy.get('@panel').should('not.be.visible')
    })
})