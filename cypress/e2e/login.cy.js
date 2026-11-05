describe("Laravel applicatie", () => {
    it("Homepage is bereikbaar", () => {
        cy.visit("/");
        cy.login("10105", "thijs", "password");
        cy.wait(20)
    });
});