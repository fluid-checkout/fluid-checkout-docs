/**
 * Release notes category (sibling of Hooks / REST API / Changelog).
 * Overview lists each release notes page; add new docs under docs/<plugin>/release-notes/.
 */
export const releaseNotesSidebarCategory = {
  type: 'category' as const,
  label: 'Release notes',
  link: {
    type: 'doc' as const,
    id: 'release-notes/index' as const,
  },
  items: [
    {
      type: 'doc' as const,
      id: 'release-notes/5-0' as const,
      label: '5.0',
    },
  ],
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
 * Changelog category for PRO (current changelog plus legacy add-ons).
 */
export const changelogSidebarCategory = {
  type: 'category' as const,
  label: 'Changelog',
  items: [
    changelogSidebarItem,
    {
      type: 'doc' as const,
      id: 'changelog-legacy-add-ons' as const,
      label: 'Changelog legacy add-ons',
    },
  ],
};
