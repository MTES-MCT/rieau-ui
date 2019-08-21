// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("isApiMock", () => {
  return [true, "true", 1, "1"].includes(Cypress.env("REACT_APP_API_MOCK"));
});

Cypress.Commands.add(
  "dropFixtureInDropZone",
  (fixturePath, fixtureMime, dropZoneSelector) => {
    function createDtWithFiles(files = []) {
      return {
        dataTransfer: {
          files,
          items: files.map(file => ({
            kind: "file",
            type: file.type,
            name: fixturePath,
            getAsFile: () => file
          })),
          types: ["Files"]
        }
      };
    }
    const dropEvent = new Event("drop", { bubbles: true });
    cy.fixture(fixturePath, "base64").then(fixture => {
      return Cypress.Blob.base64StringToBlob(fixture, fixtureMime).then(
        blob => {
          Object.assign(dropEvent, createDtWithFiles([blob]));
        }
      );
    });

    cy.get(dropZoneSelector)
      .first()
      .trigger("drop", dropEvent);
  }
);
