import { build, fake } from 'test-data-bot';

export const boardBuilder = build('BoardBuilder').fields({
  boardName: fake(f => f.lorem.words()),
});

export const listBuilder = build('ListBuilder').fields({
  listName: fake(f => f.lorem.words()),
});

export const taskBuilder = build('TaskBuilder').fields({
  taskName: fake(f => f.lorem.words()),
});
