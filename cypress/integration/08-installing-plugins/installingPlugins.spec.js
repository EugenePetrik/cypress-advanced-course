/// <reference types="cypress" />

import { boardBuilder, listBuilder, taskBuilder } from '../../support/generateData';

describe('Installing plugins', () => {
  const { boardName } = boardBuilder();
  const { listName } = listBuilder();
  const { taskName } = taskBuilder();

  beforeEach(() => {
    cy.visit('/');
  });

  it('Installing plugins #1', () => {
    cy.createBoard(boardName);
    cy.addList(listName);
    cy.addTask(taskName);

    cy.get('[data-cy=task]').click();
    // cy.get('.dropzone').attachFile('logo.png', { subjectType: 'drag-n-drop' });
  });

  it('Installing plugins #2', () => {
    cy.get('[data-cy=board-item]').realHover().should('have.css', 'background-color', 'rgb(5, 90, 140)');
  });
});
