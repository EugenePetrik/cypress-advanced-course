/// <reference types="cypress" />

import { boardBuilder } from '../../support/generateData';

describe('Sending requests', () => {
  const { boardName: name } = boardBuilder();

  let boardId = null;

  beforeEach(() => {
    cy.visit('/');
  });

  after(() => {
    cy.request({
      method: 'POST',
      url: '/api/reset',
    }).then(response => {
      expect(response.status).to.eq(204);
    });
  });

  it('Sending requests - POST', () => {
    cy.request({
      method: 'POST',
      url: '/api/boards',
      body: {
        name,
      },
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(name);
      boardId = response.body.id;
    });
  });

  it('Sending requests - PATCH', () => {
    const boardName = `Board name - ${name}`;

    cy.request({
      method: 'PATCH',
      url: `/api/boards/${boardId}`,
      body: {
        name: boardName,
      },
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(boardName);
    });
  });

  it('Sending requests - DELETE', () => {
    cy.request({
      method: 'DELETE',
      url: `/api/boards/${boardId}`,
    }).then(response => {
      expect(response.status).to.eq(200);
      expect(response.body).to.eql({});
    });
  });
});
