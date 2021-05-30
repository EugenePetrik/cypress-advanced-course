/// <reference types="cypress" />

import { boardBuilder } from '../../support/generateData';

describe('Intercepting network requests', () => {
  const { boardName } = boardBuilder();

  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: '/api/boards',
    }).as('boardList');

    cy.intercept({
      method: 'POST',
      url: '/api/boards',
    }).as('createBoard');

    cy.createBoard(boardName);
  });

  afterEach(() => {
    cy.request({
      method: 'POST',
      url: '/api/reset',
    }).then(response => {
      expect(response.status).to.eq(204);
    });
  });

  it('Intercepting network requests - GET', () => {
    cy.visit('/');

    cy.wait('@boardList').its('response.statusCode').should('eq', 200);
    cy.get('[data-cy=board-item]').should('have.length', 1);
  });

  it('Intercepting network requests - POST', () => {
    cy.wait('@createBoard').then(board => {
      expect(board.response.statusCode).to.eq(201);
      expect(board.response.body.name).to.eq(boardName);
    });
  });
});
