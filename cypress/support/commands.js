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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createBoard', boardName => {
  cy.visit('/');
  cy.get('[data-cy=create-board]').click();
  cy.get('[data-cy=new-board-input]').type(boardName);
  cy.get('[data-cy=new-board-create]').click();
});

Cypress.Commands.add('removeBoard', () => {
  cy.get('[data-cy=board-options]').click();
  cy.get('[data-cy=delete-board]').click();
});

Cypress.Commands.add('addList', listName => {
  cy.get('[data-cy=add-list]').click();
  cy.get('[data-cy=add-list-input]').type(listName);
  cy.get('[data-cy=save]').click();
});

Cypress.Commands.add('addTask', taskName => {
  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type(taskName);
  cy.get('[data-cy=add-task]').click();
});
