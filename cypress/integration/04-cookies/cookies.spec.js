/// <reference types="cypress" />

import { userBuild } from '../../support/generateData';

describe('Cookies', () => {
  const { email, password } = userBuild();

  before(() => {
    cy.task('setupDb');
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('trello_token');
    cy.visit('/');
  });

  it('Cookies #1', () => {
    cy.signUpAs(email, password);
    cy.get('[data-cy=login-message]').should('have.text', 'User is logged in');
    cy.reload();
    cy.getCookie('trello_token').should('exist');
  });

  it('Cookies #2', () => {
    cy.get('[data-cy=login-message]').should('have.text', 'User is logged in');
    cy.get('[data-cy=logged-user]').should('contain.text', email);
    cy.getCookie('trello_token').should('exist');
  });
});
