import assert from 'node:assert/strict';
import { test } from 'node:test';
import { getNavigationResult, PAGE_COUNT } from '../src/onboarding/navigation.ts';

test('the onboarding contains exactly seven pages and only exits after page seven', () => {
  assert.equal(PAGE_COUNT, 7);
  let current = 0;
  for (let expected = 1; expected < 7; expected++) {
    const result = getNavigationResult(current, 'next');
    assert.deepEqual(result, { index: expected });
    current = result.index;
  }
  assert.deepEqual(getNavigationResult(current, 'next'), { index: 6, exit: 'complete' });
});

test('back visits the previous page and first-page back does not consume the OS action', () => {
  for (let index = 6; index > 0; index--) {
    assert.deepEqual(getNavigationResult(index, 'back'), { index: index - 1 });
  }
  assert.deepEqual(getNavigationResult(0, 'back'), { index: 0, unhandled: true });
});

test('every page can be skipped without completing the onboarding', () => {
  for (let index = 0; index < 7; index++) {
    assert.deepEqual(getNavigationResult(index, 'skip'), { index, exit: 'skip' });
  }
});
