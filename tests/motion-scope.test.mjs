import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createMotionScope } from '../src/onboarding/motionScope.ts';

function nativeAnimation() {
  let running = false;
  let complete;
  return {
    get running() { return running; },
    start(callback) { running = true; complete = callback; },
    stop() { running = false; complete?.({ finished: false }); },
  };
}

test('backgrounding stops every scene animation and settles its visual state', () => {
  const scope = createMotionScope(true);
  const spatial = nativeAnimation();
  const semantic = nativeAnimation();
  const state = { spatial: 0.4, semantic: 0.6 };
  scope.run(spatial, () => { state.spatial = 1; });
  scope.run(semantic, () => { state.semantic = 1; });
  assert.ok(spatial.running && semantic.running);
  scope.setActive(false);
  assert.equal(spatial.running, false);
  assert.equal(semantic.running, false);
  assert.deepEqual(state, { spatial: 1, semantic: 1 });
  scope.setActive(true);
  assert.equal(spatial.running, false, 'returning to the app must not replay the scene');
});

test('a delayed entrance registered in background is shown without starting motion', () => {
  const scope = createMotionScope(false);
  const animation = nativeAnimation();
  let visible = false;
  scope.run(animation, () => { visible = true; });
  assert.equal(visible, true);
  assert.equal(animation.running, false);
});

test('unmount cancels motion without completing an action or leaving timers running', () => {
  const scope = createMotionScope(true);
  const animation = nativeAnimation();
  let actionFinished = false;
  const unregister = scope.run(animation, () => { actionFinished = true; });
  unregister();
  scope.dispose();
  assert.equal(animation.running, false);
  assert.equal(actionFinished, false);
  const stale = nativeAnimation();
  scope.run(stale, () => { actionFinished = true; });
  assert.equal(stale.running, false);
  assert.equal(actionFinished, false);
});

test('React effect remount can explicitly reactivate a disposed scope', () => {
  const scope = createMotionScope(true);
  const before = nativeAnimation();
  scope.run(before, () => {});
  scope.dispose();
  scope.activate(true);
  const after = nativeAnimation();
  scope.run(after, () => {});
  assert.equal(before.running, false);
  assert.equal(after.running, true);
  scope.dispose();
  assert.equal(after.running, false);
});
