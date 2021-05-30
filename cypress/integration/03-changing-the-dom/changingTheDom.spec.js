/// <reference types="cypress" />

import { boardBuilder, listBuilder, taskBuilder } from '../../support/generateData';

describe('Changing the DOM', () => {
  const { boardName } = boardBuilder();
  const { listName } = listBuilder();
  const { taskName } = taskBuilder();

  beforeEach(() => {
    cy.createBoard(boardName);
  });

  afterEach(() => {
    cy.removeBoard();
  });

  it('Changing the DOM #1', () => {
    cy.visit('/');
    cy.get('[data-cy=star]').invoke('show').click();
    cy.get('[data-cy=board]')
      .eq(0)
      .find('[data-cy=board_item]')
      .find('[data-cy=board_title]')
      .should('have.text', boardName)
      .click();
  });

  it('Changing the DOM #2', () => {
    const firstTask = `${taskName} #1`;
    const secondTask = `${taskName} #2`;
    const thirdTask = `${taskName} #3`;

    cy.addList(listName);

    cy.addTask(firstTask);
    cy.addTask(secondTask);
    cy.addTask(thirdTask);

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
