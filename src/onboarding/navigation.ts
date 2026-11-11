export const PAGE_COUNT = 7;
export type NavigationAction = 'next' | 'back' | 'skip';
export type NavigationResult = {
  index: number;
  exit?: 'complete' | 'skip';
  unhandled?: boolean;
};

export function getNavigationResult(index: number, action: NavigationAction): NavigationResult {
  if (action === 'skip') return { index, exit: 'skip' };
  if (action === 'back') {
    return index === 0 ? { index, unhandled: true } : { index: index - 1 };
  }
  return index === PAGE_COUNT - 1 ? { index, exit: 'complete' } : { index: index + 1 };
}
