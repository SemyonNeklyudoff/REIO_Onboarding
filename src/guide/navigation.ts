export type GuidePosition = { chapter: number; step: number };
export function moveGuide(chapters: { steps: unknown[] }[], position: GuidePosition, direction: 1 | -1): GuidePosition | null {
  const { chapter, step } = position;
  const nextStep = step + direction;
  if (nextStep >= 0 && nextStep < chapters[chapter].steps.length) return { chapter, step: nextStep };
  const nextChapter = chapter + direction;
  if (nextChapter < 0 || nextChapter >= chapters.length) return null;
  return { chapter: nextChapter, step: direction === 1 ? 0 : chapters[nextChapter].steps.length - 1 };
}
