const { defineConfig } = require("cypress");

module.exports = defineConfig({
    projectId: "bxv9cm",

    video: true,
    screenshotOnRunFailure: true,

    retries: {
        runMode: 2,
        openMode: 0
    },

    e2e: {
        baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:8183/solution/Profin",
        specPattern: "cypress/e2e/**/*.cy.js",
        supportFile: "cypress/support/e2e.js",
        viewportWidth: 1440,
        viewportHeight: 900
    }
});