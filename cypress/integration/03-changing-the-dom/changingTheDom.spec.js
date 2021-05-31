/// <reference types="cypress" />

import { boardBuilder, listBuilder, taskBuilder } from '../../support/generateData';

describe('Changing the DOM', () => {
  const { boardName } = boardBuilder();
  const { listName } = listBuilder();
  const { taskName } = taskBuilder();

  beforeEach(() => {
    cy.task('setupDb');
    cy.visit('/');
  });

  it('Changing the DOM #1', () => {
    cy.createBoard(boardName);
    cy.visit('/');
    cy.get('[data-cy=star]').invoke('show').click();
    cy.get('[data-cy=my-starred-boards]')
      .find('[data-cy=board_item]')
      .find('[data-cy=board_title]')
      .should('have.text', boardName);
  });

  it('Changing the DOM #2', () => {
    cy.createBoard(boardName);
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
    cy.createBoard(boardName);
    cy.visit('/');

    cy.get('[data-cy=board-item]').trigger('mouseover');
    cy.get('[data-cy=star]').should('be.visible');

    cy.get('[data-cy=board-item]').trigger('mouseout');
    cy.get('[data-cy=star]').should('not.be.visible');

    cy.get('[data-cy=board-item]').click();
  });
});
