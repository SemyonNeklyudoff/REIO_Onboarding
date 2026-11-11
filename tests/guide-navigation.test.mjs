import assert from 'node:assert/strict';
import { test } from 'node:test';
import { chapters, searchGuide } from '../src/guide/content.ts';
import { moveGuide } from '../src/guide/navigation.ts';

test('seven nonempty chapters have unique steps and complete instructional content', () => {
  assert.equal(chapters.length, 7);
  const ids = chapters.flatMap(chapter => chapter.steps.map(step => step.id));
  assert.equal(new Set(ids).size, ids.length);
  for (const chapter of chapters) {
    assert.ok(chapter.steps.length > 0);
    for (const step of chapter.steps) {
      for (const key of ['title', 'route', 'body']) assert.ok(step[key]?.length > 0, step.id + ' ' + key);
    }
  }
});
test('forward crosses each chapter boundary and finishes only at the end', () => {
  for (let chapter = 0; chapter < chapters.length; chapter++) {
    const last = chapters[chapter].steps.length - 1;
    assert.deepEqual(moveGuide(chapters, { chapter, step: last }, 1), chapter < 6 ? { chapter: chapter + 1, step: 0 } : null);
  }
  assert.deepEqual(moveGuide(chapters, { chapter: 1, step: 0 }, 1), { chapter: 1, step: 1 });
});
test('back crosses to previous chapter and first-step back returns to contents', () => {
  assert.equal(moveGuide(chapters, { chapter: 0, step: 0 }, -1), null);
  assert.deepEqual(moveGuide(chapters, { chapter: 2, step: 0 }, -1), { chapter: 1, step: chapters[1].steps.length - 1 });
});
test('search finds specific tasks regardless of casing, ё, or surrounding spaces', () => {
  assert.ok(searchGuide('  АРХИВ  ').some(hit => hit.chapter === 5));
  assert.ok(searchGuide('счетчики').some(hit => hit.chapter === 6));
  assert.ok(searchGuide('оплата').some(hit => hit.chapter === 3));
  assert.ok(searchGuide('заявка').some(hit => hit.chapter === 1));
  assert.ok(searchGuide('email').some(hit => hit.chapter === 6));
  assert.deepEqual(searchGuide('несуществующаязадача'), []);
  assert.deepEqual(searchGuide('   '), []);
});

test('guide opens the destination interface directly without a preliminary demo action', () => {
  const steps = chapters.flatMap(chapter => chapter.steps);
  for (const id of ['chat-open', 'room-contact']) assert.equal(steps.find(step => step.id === id).panel, 'chat');
  assert.equal(steps.find(step => step.id === 'room-documents').panel, 'documents');
  assert.equal(steps.find(step => step.id === 'whats-new').panel, 'overview');
  assert.equal(steps.find(step => step.id === 'utility-history').panel, 'history');
});
