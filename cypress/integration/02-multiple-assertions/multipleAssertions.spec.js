/// <reference types="cypress" />

import { boardBuilder, listBuilder, taskBuilder } from '../../support/generateData';

describe('Multiple assertions', () => {
  const { boardName } = boardBuilder();
  const { listName } = listBuilder();
  const { taskName } = taskBuilder();

  let boardId = null;

  before(() => {
    cy.task('setupDb');

    cy.visit('/');
    cy.createBoard(boardName);
    cy.url().then(url => {
      boardId = url.match(/(\d+)$/)[0];
    });
  });

  beforeEach(() => {
    cy.visit(`/board/${boardId}`);
    cy.addList(listName);
  });

  it('Multiple assertions', () => {
    const firstTask = `${taskName} #1`;
    const secondTask = `${taskName} #2`;
    const thirdTask = `${taskName} #3`;

    cy.addTask(firstTask);
    cy.addTask(secondTask);
    cy.addTask(thirdTask);

    cy.get('[data-cy=task]').should(task => {
      if (task.length != 3) {
        throw new Error('Not enough elements!');
      }

      expect(task[0]).to.contain.text(firstTask);
      expect(task[1]).to.contain.text(secondTask);
      expect(task[2]).to.contain.text(thirdTask);
    });
  });
});
