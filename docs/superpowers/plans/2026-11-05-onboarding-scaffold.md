# Onboarding Scaffold Implementation Plan

> Execution: inline in the current session; no commits or publishing requested.

**Goal:** Create the confirmed empty Expo + TypeScript project.

**Architecture:** Official blank template with an isolated future onboarding directory. Keep the starter UI and avoid navigation dependencies.

**Tech Stack:** Expo, React Native, TypeScript, npm.

**Spec:** `docs/superpowers/specs/2026-11-05-onboarding-scaffold-design.md`

## Task 1: Scaffold and handoff

- [x] Generate the official blank TypeScript project in `onboarding-app/`.
- [x] Add `README.md` and `src/onboarding/README.md` with startup and future integration guidance.
- [x] Install dependencies and include the lockfile in the deliverable files.
- [x] Add `typecheck` and `export:mobile` package scripts.
- [x] Run TypeScript, Expo dependency checks, and mobile JS export; all exit 0.
- [x] Run in Expo Go 58.0.7 on iPhone 17 Pro Simulator; inspect screenshot: standard starter screen renders without error overlay.

## Review focus

Check standalone project boundaries, no implemented onboarding API claimed, documented distinction between JS export and installable native build, reproducible install, and explicit runtime verification limits. Generated starter UI and low-impact configuration do not need new unit tests.

## Verification record

- `npm run typecheck`: exit 0.
- `npx expo install --check` (online): exit 0, dependencies up to date.
- `CI=1 EXPO_OFFLINE=1 npm run export:mobile`: exit 0, Hermes bundles for both iOS and Android exported to `dist/`.
- `npx expo start --ios --localhost --port 8087`: iOS bundled successfully; rendered starter screen inspected in simulator screenshot.
- `git diff --check`: exit 0.
- `npm audit --omit=dev`: exit 1, five moderate findings in Expo tooling; recorded in README. No forced downgrade applied.
- Android runtime and signed native installers were not checked or produced.
- Template generator automatically initialized Git with its `Initial commit`; no manual commits or GitHub publication performed.
- Final self-review: only generated application code and configuration/documentation changes; no onboarding implementation or navigation dependency added.
