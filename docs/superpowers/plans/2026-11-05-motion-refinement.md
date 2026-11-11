# Motion refinement

User request: make existing seven-page onboarding fast, smooth and physically plausible; animate the background circle as part of the composition. Keep removed captions and replay icons removed. Implement in place, no publishing.

- Replace the 3700ms reveal clock with a 1250ms semantic sequence.
- Use native damped springs for card translation/scale; opacity is a separate short timing animation. Most card stagger offsets fit into 450ms; springs settle around 400ms.
- Use directional entrances for satellite cards and chat bubbles.
- Animate the halo, ring and markers as a finite coordinated entrance, with a slower background spring than the cards. No ambient infinite loops.
- Centralize reduced-motion and AppState lifecycle for each scene; all native animations stop/settle in the background or on unmount. Avoid per-frame React rendering.
- Keep semantic fades/graph masks monotonic; ease graph reveal and period selector movement.
- Add spring release feedback to the main button, shorten page transitions.
- Verify native lifecycle with a mocked Animated driver regression test, TypeScript, existing navigation tests, mobile exports, simulator traversal and reduced-motion behavior.

Sources: https://reactnative.dev/docs/animated (native driver and physical spring model), https://m3.material.io/styles/motion (spatial springs), https://developer.apple.com/design/human-interface-guidelines/motion (brief, purposeful feedback), local react-native-skills animation-gpu-properties.md. Exact chosen timings and spring values are project decisions, not benchmark results.

## Verification

- `npm test`: 7/7 pass; lifecycle tests initially failed before implementation; explicit StrictMode reactivation regression failed before adding scope activation.
- `npm run typecheck`: exit 0.
- Mobile export: both iOS and Android bundles exported, exit 0.
- Simulator traversal: all seven scenes open, fast forward/back transitions work and no caption/replay icon returned. First three scenes and backdrop motion recorded as a local video.
- Independent review found the initial Reduce Motion preference flash and a page transition that could continue while Reduce Motion was enabled. Fixed by mounting scene content only after preference resolution, rejecting stale preference reads and settling the pending transition when reduction activates.
- Native frame rate is not benchmarked; Android runtime and physical devices are not available in this session.
