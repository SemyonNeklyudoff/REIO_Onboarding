# Animated Onboarding Implementation Plan

> Execute inline in the authorized standalone project; no commits or publishing.

**Goal:** Deliver the approved seven-page animated onboarding and transferable module.

**Architecture:** Native component scenes with React Native Animated; SVG charts and icons. Host controls navigation out of the module using callbacks. A pure navigation model defines seven-page boundary behavior.

**Tech Stack:** Existing Expo + TypeScript, React Native Animated, react-native-svg, safe-area-context.

**Spec:** `docs/superpowers/specs/2026-11-05-animated-onboarding-design.md` — concept approved by user in chat.

## Constraints and review focus

Exactly seven pages; accent #395CF5; demo data and actions only; no network or navigation dependency in module; skip immediately; no automatic page advance; safe area, font scaling, reduced motion and Android back behavior. Do not touch unrelated site files or publish.

## Task 1 Navigation model

- [x] Write Node test-runner tests for seven-page traversal, first-page back, skip from every step, last-page completion.
- [x] Run tests before implementation and verify they fail.
- [x] Implement `getNavigationResult` in `src/onboarding/navigation.ts` and run tests to pass.

## Task 2 UI and animation

- [x] Define `content.ts`, `theme.ts`, SVG `Icon.tsx`, reusable scene primitives and seven `scenes/` components.
- [x] Implement `Onboarding.tsx`, animation lifecycle and reduced motion hooks. Export host callbacks from `index.ts`.
- [x] Connect module from `App.tsx` with completion/replay state.
- [x] Run typecheck and tests; fix failures.

## Task 3 Verification and handoff

- [x] Run full tests, typecheck, Expo dependency check, both mobile exports.
- [x] Open iOS Simulator and verify seven pages, skip, completion/replay and reduced motion; inspect screenshots including small screen/large text if available.
- [x] Request independent code review, fix substantive findings, re-run affected checks.
- [x] Update README with installation, API, integration, demo limits and actual verification results.

## Progress

Plan written after explicit user approval; source document treated as product content only. Existing standalone scaffold is the working directory; no unrelated files will change. No new tests for styling/configuration; behavioral tests and real runtime checks cover the feature.

## Verification and review record

- Navigation tests ran RED with the missing navigation module, then GREEN after implementation; final `npm test`: 3/3 pass. Node 22 emits experimental TypeScript stripping and module-format inference warnings.
- Final `npm run typecheck`: exit 0. React Native 0.88 requires the ScrollView instance ref type; resolved using React ComponentRef.
- `npx expo install --check`: exit 0, dependencies up to date.
- Final `CI=1 EXPO_OFFLINE=1 npm run export:mobile`: exit 0; both platform Hermes bundles exported.
- Real iPhone 17 Pro / iOS 26.2 / Expo Go: all seven scenes inspected; forward, back, skip, completion, replay and manual light/dark preview verified.
- Reduce Motion toggled on in the simulator: final scene states render immediately, repeat control disappears, page changes are immediate. Restored off afterwards.
- System text size increased four steps: text grows, content scrolls, bottom CTA remains usable; interactive theme labels grow. Restored original text size afterwards.
- Independent code review identified status badge overlap, unscaled interactive labels and page-transition background behavior. All addressed: crossfade both statuses, render settings outside scaled canvas with scalable labels, settle pending page transitions on AppState deactivation.
- Visual inspection found scene collisions; reduced scene heights and shortened chat copy, removed a redundant request chip (requests remain on the main-page scene). Final montage inspected.
- `git diff --check`: exit 0. No manual commits or publication.

## Verification limits

Android runtime/hardware Back and physical devices were not exercised. Both platform JS bundles compile. Native drag automation reported noWindowsAvailable, so swipe gestures are implemented but were not independently verified with a real injected gesture. Automated navigation tests cover boundary behavior; full VoiceOver/TalkBack usability and the smallest phone widths remain manual device QA. No signed native installers were produced.
