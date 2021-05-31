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

import 'cypress-file-upload';
import 'cypress-real-events/support';

Cypress.Commands.add('createBoard', boardName => {
  cy.intercept({
    method: 'POST',
    url: '/api/boards',
  }).as('createBoard');

  cy.get('[data-cy=create-board]').click();
  cy.get('[data-cy=new-board-input]').type(boardName);
  cy.get('[data-cy=new-board-create]').click();
  cy.wait(2000);

  cy.wait('@createBoard');
});

Cypress.Commands.add('removeBoard', () => {
  cy.get('[data-cy=board-options]').click();
  cy.get('[data-cy=delete-board]').click();
});

Cypress.Commands.add('addList', listName => {
  cy.intercept({
    method: 'POST',
    url: '/api/lists',
  }).as('createList');

  cy.get('[data-cy=add-list]').click();
  cy.get('[data-cy=add-list-input]').type(listName);
  cy.get('[data-cy=save]').click();
  cy.wait(2000);

  cy.wait('@createList');
});

Cypress.Commands.add('addTask', taskName => {
  cy.intercept({
    method: 'POST',
    url: '/api/tasks',
  }).as('createTask');

  cy.get('[data-cy=new-task]').click();
  cy.get('[data-cy=task-input]').type(taskName);
  cy.get('[data-cy=add-task]').click();
  cy.wait(2000);

  cy.wait('@createTask');
});

Cypress.Commands.add('signUpAs', (email, password) => {
  cy.intercept({
    method: 'POST',
    url: '/signup',
  }).as('createUser');

  cy.get('[data-cy=login-menu]').click();
  cy.get('[data-cy=login-module-sign-up-link]').click();
  cy.get('[data-cy=sign-up-module-title]').should('have.text', 'Sign up to create a free account');
  cy.get('[data-cy=signup-email]').type(email);
  cy.get('[data-cy=signup-password]').type(password);
  cy.get('[data-cy=signup]').click();

  cy.wait('@createUser');
});

Cypress.Commands.add('loginAs', (email, password) => {
  cy.intercept({
    method: 'POST',
    url: '/login',
  }).as('loginUser');

  cy.get('[data-cy=login-menu]').click();
  cy.get('[data-cy=login-module-title]').should('have.text', 'Log in to your account');
  cy.get('[data-cy=login-email]').type(email);
  cy.get('[data-cy=login-password]').type(password);
  cy.get('[data-cy=login]').click();

  cy.wait('@loginUser');
});
