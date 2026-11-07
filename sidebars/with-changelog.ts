/**
 * Top-level Release notes sidebar item (sibling of Changelog).
 * The page lives at docs/<plugin>/release-notes/5-0.md.
 */
export const releaseNotesSidebarItem = {
  type: 'doc' as const,
  id: 'release-notes/5-0' as const,
  label: 'Release notes',
};

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
