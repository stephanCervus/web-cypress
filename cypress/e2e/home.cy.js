describe("Laravel applicatie", () => {
    it("Homepage is bereikbaar", () => {
        cy.visit("/");
        cy.get("body").should("be.visible");
    });
});