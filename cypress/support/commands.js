
// ---------- Auth ----------

// Vult het loginformulier in en klikt op Inloggen (zonder sessie/caching)
Cypress.Commands.add("vulLoginIn", (client, username, password) => {
    cy.visit("/login");
    cy.get("#customer_number-input").type(client);
    cy.get("#username-input").should("be.enabled").type(username);
    cy.get("#password-input").should("be.enabled").type(password, { log: false });
    cy.clickByText("Inloggen");
});

Cypress.Commands.add("login", (gebruiker = "gebruikerEen") => {
    cy.env([gebruiker], { log: false }).then((env) => {
        if (!env[gebruiker]) {
            throw new Error(`Gebruiker "${gebruiker}" niet gevonden in cypress.env.json (let op hoofdletters).`);
        }
        const { client, username, password } = env[gebruiker];

        cy.session([client, username], () => {
            cy.vulLoginIn(client, username, password);
            cy.location("pathname").should("not.eq", "/login");
        }, {
            // Sessie hergebruiken over ALLE spec-files heen. Zonder dit logt elke
            // spec opnieuw in en blokkeert Laravel de login met 429 (throttle).
            cacheAcrossSpecs: true,
            // Check of de bewaarde sessie nog geldig is (bv. na de logout-test).
            // Faalt dit, dan logt Cypress automatisch opnieuw in.
            validate() {
                cy.request({ url: "/order", followRedirect: false })
                    .its("status")
                    .should("eq", 200);
            },
        });
    });
});

// Controleert dat de gebruiker (terug)gestuurd is naar de loginpagina
Cypress.Commands.add("opLoginPagina", () => {
    cy.location("pathname").should("eq", "/login");
    cy.get("#customer_number-input").should("be.visible");
});

// ---------- Algemeen ----------

Cypress.Commands.add("clickByText", (text) => {
    cy.contains("button", text).click();
});

// Controleert de HTTP-status van een URL zonder de pagina te openen
Cypress.Commands.add("verwachtStatus", (url, status) => {
    cy.request({ url, failOnStatusCode: false })
        .its("status")
        .should("eq", status);
});

// ---------- Assortiment / product ----------

// Zet een toggle (aria-checked) in de GEWENSTE stand: klikt alleen als dat nodig is.
// De toggles worden server-side in de sessie onthouden, dus een vorige test
// kan ze aan hebben laten staan.
Cypress.Commands.add("zetToggle", (selector, aan) => {
    cy.get(selector).invoke("attr", "aria-checked").then((huidig) => {
        if ((huidig === "true") !== aan) {
            cy.get(selector).click();
        }
    });
    cy.get(selector).should("have.attr", "aria-checked", String(aan));
});

Cypress.Commands.add("compleetAssortiment", (aan) => {
    cy.zetToggle("#assortiment__complete-toggle", aan);
});

Cypress.Commands.add("gegroepeerd", (aan) => {
    cy.zetToggle("#assortiment__grouped-toggle", aan);
});

// Inloggen, naar het assortiment en beide toggles UIT: vaste beginsituatie
Cypress.Commands.add("schoonAssortiment", (gebruiker) => {
    cy.login(gebruiker);
    cy.visit("/assortment");
    cy.compleetAssortiment(false);
    cy.gegroepeerd(false);
});

// Klikt op een product (fixture-object) en controleert dat de detailpagina opent
Cypress.Commands.add("openProductPagina", (product) => {
    cy.contains(product.name).should("be.visible").click();
    cy.url().should("include", product.detailUrl);
});

// ---------- Order ----------

// Blok met teller + knoppen in het aanbiedingenblok
// TODO selector: vervangen door [data-product-code] zodra wrapper er is
Cypress.Commands.add("aanbiedingVan", (code) => {
    return cy.get(".order__sidebar")
        .contains(".special-offers-content", code)
        .next(".special-offers__bottom");
});

// Orderregel van een product
// TODO selector: zoeken op naam vervangen door [data-product-code] op de regel
Cypress.Commands.add("orderregelVan", (naam) => {
    return cy.contains("[data-order-line]", naam);
});

// Verwijdert alle orderregels één voor één, tot er niks meer staat
const verwijderAlleOrderregels = () => {
    cy.get("body").then(($body) => {
        const regels = $body.find("[data-order-line]");
        if (!regels.length) return;

        cy.wrap(regels.first()).find("[data-order-line-delete]").click();
        cy.get("[data-order-line]").should("have.length", regels.length - 1);
        verwijderAlleOrderregels();
    });
};

// Inloggen, naar /order en alle orderregels leegmaken
Cypress.Commands.add("leegAlleOrderregels", () => {
    cy.login();
    cy.visit("/order");
    cy.get(".order__sidebar").should("be.visible");

    verwijderAlleOrderregels();
    cy.get("[data-order-line]").should("not.exist");
});

// Voegt het product 1x toe via het aanbiedingenblok
Cypress.Commands.add("voegAanbiedingToe", (product) => {
    cy.aanbiedingVan(product.code).find("[data-amount-increase]").click();
    cy.orderregelVan(product.name).should("be.visible");
});
