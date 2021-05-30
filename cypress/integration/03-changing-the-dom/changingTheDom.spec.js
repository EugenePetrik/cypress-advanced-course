/// <reference types="cypress" />

import { boardBuilder, listBuilder, taskBuilder } from '../../support/generateData';

describe('Changing the DOM', () => {
  const { boardName } = boardBuilder();
  const { listName } = listBuilder();
  const { taskName } = taskBuilder();

  let boardId = null;

  beforeEach(() => {
    cy.task('setupDb');

    cy.visit('/');
    cy.createBoard(boardName);
    cy.url().then(url => {
      boardId = url.match(/(\d+)$/)[0];
    });
  });

  it('Changing the DOM #1', () => {
    cy.visit('/');
    cy.get('[data-cy=star]').invoke('show').click();
    cy.get('[data-cy=my-starred-boards]')
      .find('[data-cy=board_item]')
      .find('[data-cy=board_title]')
      .should('have.text', boardName);
  });

  it('Changing the DOM #2', () => {
    cy.visit(`/board/${boardId}`);

    cy.addList(listName);

    cy.addTask(`${taskName} #1`);
    cy.addTask(`${taskName} #2`);
    cy.addTask(`${taskName} #3`);

    cy.get('[data-cy=task]')
      .eq(0)
      .invoke('addClass', 'overDue')
      .should('have.css', 'background-color', 'rgb(231, 116, 141)');
  });

  it('Changing the DOM #3', () => {
    cy.visit('/');

    cy.get('[data-cy=board-item]').trigger('mouseover');
    cy.get('[data-cy=star]').should('be.visible');

    cy.get('[data-cy=board-item]').trigger('mouseout');
    cy.get('[data-cy=star]').should('not.be.visible');

    cy.get('[data-cy=board-item]').click();
  });
});
