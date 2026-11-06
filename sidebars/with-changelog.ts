/**
 * Top-level Changelog sidebar item (sibling of Hooks / REST API).
 */
export const changelogSidebarItem = {
  type: 'doc' as const,
  id: 'changelog' as const,
  label: 'Changelog',
};

/**
 * Legacy add-ons changelog sidebar item (PRO). Sibling of Changelog.
 */
export const legacyChangelogSidebarItem = {
  type: 'doc' as const,
  id: 'changelog-legacy-add-ons' as const,
  label: 'Changelog legacy add-ons',
};
