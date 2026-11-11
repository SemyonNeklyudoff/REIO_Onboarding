# REIO Source UI Implementation Plan

> Execute inline with the existing animated scene architecture. Source repository is read-only; no commits or publication are authorized.

## Scope
Replace the seven invented interface illustrations with React Native renditions of the actual SwiftUI components in /Users/essenay/Projects/REIO/REIO. Preserve onboarding navigation, copy hierarchy, pill CTAs, removed captions/progress, reduced motion and the finite chat sequence. Transfer sample data and local visual assets only. Do not connect real services. Source is SwiftUI, so components require translation, not direct imports.

- [x] Copy room photographs and relevant original Home assets into the portable onboarding module; document provenance.
- [x] Create shared REIO preview styles/components from Core/DesignSystem.swift: system backgrounds, #395CF5, rounded 32 pt cards, source typography, thumbnails and chevrons.
- [x] Replace overview and home with HomeScreen.swift income cards and object panel; room detail with MyNumberDetailScreen.swift hero/actions/chart; expenses with HomeUtilityExpensesCard.swift and room payment card.
- [x] Replace chat visuals with ChatDetailScreen.swift bubbles, document attachment, grey background, rounded composer and upward send arrow; preserve ordered entrances and 16 pt bottom inset.
- [x] Replace documents with DocumentDetailScreen.swift approval card; replace fictional theme settings with MoreScreen.swift menu groups. Update descriptions/accessibility only where old claims differ from source.
- [x] Check TypeScript, navigation/motion tests, exports for both platforms, and inspect all seven actual renders in Simulator. Fix wrapping/overflow at the scene size. Update handoff docs, including SwiftUI integration caveat.

## Review

Independent read-only review caught incoherent payment/approval states. Removed fictional payment success; approval now replaces the entire pending card with the source collapsed state and success tooltip. Fixed image sizing and clipped chart reveal after native visual inspection. Source repository remained unchanged.
