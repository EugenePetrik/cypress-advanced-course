/// <reference types="cypress" />

import { boardBuilder } from '../../support/generateData';

describe('Stubbing responses', () => {
  const { boardName } = boardBuilder();

  it('Stubbing responses #1', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/boards',
      },
      {
        body: [],
      },
    ).as('boardList');

    cy.visit('/');
    cy.wait('@boardList');
    cy.get('[data-cy=board-item]').should('have.length', 0);
  });

  it('Stubbing responses #2', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '/api/boards',
      },
      {
        fixture: 'threeBoards',
      },
    ).as('boardList');

    cy.visit('/');
    cy.wait('@boardList');
    cy.get('[data-cy=board-item]').should('have.length', 3);
  });

  it('Stubbing responses #3', () => {
    cy.intercept(
      {
        method: 'POST',
        url: '/api/boards',
      },
      {
        forceNetworkError: true,
      },
    ).as('createBoard');

    cy.visit('/');
    cy.createBoard(boardName);
    cy.wait('@createBoard');
    cy.get('[data-cy=error-message]').should('be.visible').and('have.text', 'There was an error creating board');
  });

  it('Stubbing responses #4', () => {
    cy.createBoard(boardName);

    cy.intercept(
      {
        method: 'GET',
        url: '/api/boards',
      },
      req => {
        req.reply(res => {
          res.body[0].starred = true;
          return res;
        });
      },
    ).as('boardList');

    cy.visit('/');
    cy.wait('@boardList');
    cy.get('[data-cy=my-starred-boards]').eq(0).find('[data-cy=board_item]').should('have.length', 1);
  });
});
