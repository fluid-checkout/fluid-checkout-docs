type HookSidebarItem = {
  type?: string;
  id?: string;
  label?: string;
};

type ChangelogItem = {
  type: 'doc';
  id: 'changelog';
  label: 'Changelog';
};

/**
 * Place the generated changelog directly after the "All hooks" item.
 */
export function withChangelogAfterAllHooks<T extends HookSidebarItem>(
  items: readonly T[],
): Array<T | ChangelogItem> {
  const changelog: ChangelogItem = {
    type: 'doc',
    id: 'changelog',
    label: 'Changelog',
  };
  const allHooksIndex = items.findIndex((item) => item.id === 'hooks/index');
  if (allHooksIndex < 0) {
    return [changelog, ...items];
  }
  return [
    ...items.slice(0, allHooksIndex + 1),
    changelog,
    ...items.slice(allHooksIndex + 1),
  ];
}
