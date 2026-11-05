const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "a7bq2k",

    video: true,
    screenshotOnRunFailure: true,

    retries: {
        runMode: 2,
        openMode: 0
    },

    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:8000",
        specPattern: "cypress/e2e/**/*.cy.js",
        supportFile: "cypress/support/e2e.js",
        viewportWidth: 1440,
        viewportHeight: 900
    }
});