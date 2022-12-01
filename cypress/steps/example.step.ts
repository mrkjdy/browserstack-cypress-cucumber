import { When } from "@badeball/cypress-cucumber-preprocessor";

When("a user visits {string}", (url: string) => {
  cy.visit(url);
});

When("in the basic example, selects {string}", (fixturePath: string) => {
  cy.get("#frame_a_basic_example")
    .click() // Click the iframe to scroll into view centered
    .wait(1000) // Need to wait a second for the iframe to load
    .get("#frame_a_basic_example")
    .its('0.contentDocument.body')
    .find("input")
    .selectFile(`cypress/fixtures/${fixturePath}`);
})
