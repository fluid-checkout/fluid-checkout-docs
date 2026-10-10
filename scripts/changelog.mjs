/**
 * Build one changelog page per plugin from data/<plugin>/readme.txt and,
 * when present, data/<plugin>/changelog.md.
 *
 * Newest notes are added to readme.txt first and moved into changelog.md
 * later, so the page is the readme.txt entries followed by changelog.md
 * entries. A version that appears in both is kept from readme.txt.
 * The changelog.md introduction (where entries are written first, and the
 * rest of that maintenance note) is not published.
 */

import fs from 'node:fs';
import path from 'node:path';

const VERSION_HEADING =
  /^=[ \t]+([0-9]+\.[0-9]+\.[0-9]+(?:[-+][0-9A-Za-z.]+)*)[ \t]+([-\u2013\u2014])[ \t]+([0-9]{4}-[0-9]{2}-[0-9]{2})[ \t]+=[ \t]*(.*?)\s*$/;

const SEMVER_NOTE =
  'This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).';

/**
 * Browser title. The visible heading and sidebar label stay "Changelog".
 *
 * @param {string} pluginLabel
 * @returns {string}
 */
export function changelogTitle(pluginLabel) {
  return `${pluginLabel} changelog`;
}

/**
 * Meta description for one plugin's changelog page.
 *
 * @param {string} pluginLabel
 * @returns {string}
 */
export function changelogDescription(pluginLabel) {
  return `Release history for ${pluginLabel}, newest version first.`;
}

/**
 * Other changelog pages named by an optional `relatedChangelogs` list of plugin ids.
 *
 * @param {{id?: string, relatedChangelogs?: unknown}} plugin
 * @param {{id: string, label?: string, navLabel?: string, routeBasePath?: string}[]} plugins
 * @returns {{id: string, label: string, linkLabel: string, href: string}[]}
 */
export function resolveRelatedChangelogs(plugin, plugins) {
  const ids = plugin.relatedChangelogs;
  if (ids == null) {
    return [];
  }
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string' || id.trim() === '')) {
    throw new Error(`${plugin.id || 'plugin'} relatedChangelogs must be a list of plugin ids.`);
  }

  return ids.map((id) => {
    const related = plugins.find((entry) => entry.id === id);
    if (!related) {
      throw new Error(`${plugin.id || 'plugin'} relatedChangelogs references unknown plugin "${id}".`);
    }
    const route = String(related.routeBasePath || related.id).replace(/^\/+|\/+$/g, '');
    const label = related.label || related.id;
    return {
      id: related.id,
      label,
      linkLabel: related.navLabel || label,
      href: `/${route}/changelog/`,
    };
  });
}

/**
 * @param {{label: string, linkLabel: string, href: string}} related
 * @returns {string}
 */
export function relatedChangelogLine(related) {
  return `Looking for ${related.label} changes? See the [${related.linkLabel} changelog](${related.href}).`;
}

/**
 * Short admonition title. PRO is the upgrade people look for from Lite.
 *
 * @param {{id: string, label: string, linkLabel: string}} related
 * @returns {string}
 */
export function relatedChangelogTitle(related) {
  if (related.id === 'pro') {
    return `Using ${related.label}?`;
  }
  return `${related.linkLabel} changelog`;
}

/**
 * Highlighted cross-link, in the same place as the old plain sentence.
 * `future.v4` only parses the bracket title form (`:::info[Title]`).
 *
 * @param {{id: string, label: string, linkLabel: string, href: string}} related
 * @returns {string}
 */
export function relatedChangelogCallout(related) {
  return [
    `:::info[${relatedChangelogTitle(related)}]`,
    '',
    relatedChangelogLine(related),
    '',
    ':::',
  ].join('\n');
}

const LEGACY_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Short name used in the public note. The trailing parenthetical on the
 * section title, such as "(before merging into PRO)", is left off.
 *
 * @param {string} title
 * @returns {string}
 */
export function legacyAddonName(title) {
  return String(title).replace(/\s+\([^)]*\)\s*$/, '').trim();
}

/**
 * Shown when data/<plugin>/legacy/<id>/ has no readme.txt and no changelog.md.
 *
 * @param {string} addonName
 * @param {string} pluginLabel
 * @returns {string}
 */
export function legacyPlaceholder(addonName, pluginLabel) {
  return `${addonName} is being merged into ${pluginLabel}. Its changelog for earlier versions, from when it was a separate add-on, will be added here.`;
}

/**
 * Optional add-on changelogs appended after the plugin's own versions.
 * Each item is `{id, title}`. Sources live at
 * data/<plugin>/legacy/<id>/readme.txt and changelog.md.
 *
 * @param {{id?: string, legacyChangelogs?: unknown}} plugin
 * @returns {{id: string, title: string, name: string}[]}
 */
export function normalizeLegacyChangelogs(plugin) {
  const items = plugin.legacyChangelogs;
  if (items == null) {
    return [];
  }
  if (!Array.isArray(items)) {
    throw new Error(`${plugin.id || 'plugin'} legacyChangelogs must be a list.`);
  }

  /** @type {Set<string>} */
  const seen = new Set();
  return items.map((item, index) => {
    const record = item && typeof item === 'object' ? item : {};
    const id = typeof record.id === 'string' ? record.id : '';
    const title = typeof record.title === 'string' ? record.title.trim() : '';
    if (!LEGACY_ID.test(id)) {
      throw new Error(
        `${plugin.id || 'plugin'} legacyChangelogs[${index}].id must be a lowercase slug such as "address-book".`,
      );
    }
    if (!title) {
      throw new Error(`${plugin.id || 'plugin'} legacyChangelogs[${index}] needs a title.`);
    }
    if (seen.has(id)) {
      throw new Error(`${plugin.id || 'plugin'} legacyChangelogs repeats "${id}".`);
    }
    seen.add(id);
    return {id, title, name: legacyAddonName(title)};
  });
}

/**
 * @param {string} line
 * @returns {{version: string, dash: string, date: string, suffix: string} | null}
 */
export function parseVersionHeading(line) {
  const match = String(line).match(VERSION_HEADING);
  if (!match) {
    return null;
  }
  return {
    version: match[1],
    dash: match[2],
    date: match[3],
    suffix: match[4].trim(),
  };
}

/**
 * Anchor id for a version heading, such as 4.2.7 → 4-2-7.
 *
 * @param {string} version
 * @returns {string}
 */
export function versionAnchor(version) {
  return String(version).replace(/\./g, '-');
}

/**
 * @param {string} readme
 * @returns {string | null} Changelog section without the heading, or null when the section is absent.
 */
export function extractReadmeChangelogSection(readme) {
  const lines = normalizeNewlines(readme).split('\n');
  let start = -1;
  for (let index = 0; index < lines.length; index += 1) {
    if (/^==\s*Changelog\s*==\s*$/i.test(lines[index])) {
      start = index + 1;
      break;
    }
  }
  if (start === -1) {
    return null;
  }

  let end = lines.length;
  for (let index = start; index < lines.length; index += 1) {
    if (/^==\s+\S.*==\s*$/.test(lines[index])) {
      end = index;
      break;
    }
  }
  return lines.slice(start, end).join('\n');
}

/**
 * @param {string} readme Full plugin readme.txt.
 * @returns {ChangelogEntry[]}
 */
export function parseReadmeChangelog(readme) {
  const section = extractReadmeChangelogSection(readme);
  if (section == null) {
    return [];
  }
  return parseVersionBlocks(section).map((entry) => ({
    ...entry,
    source: 'readme',
  }));
}

/**
 * Older entries. Lines before the first version heading are the file's
 * maintenance introduction and are ignored.
 *
 * @param {string} markdown
 * @returns {ChangelogEntry[]}
 */
export function parseChangelogDocument(markdown) {
  return parseVersionBlocks(normalizeNewlines(markdown)).map((entry) => ({
    ...entry,
    source: 'changelog',
  }));
}

/**
 * Readme entries first. A version present in both sources is kept from
 * readme.txt. `differences` lists those versions whose text is not the same.
 *
 * @param {ChangelogEntry[]} readmeEntries
 * @param {ChangelogEntry[]} changelogEntries
 * @returns {{
 *   entries: ChangelogEntry[],
 *   differences: {version: string, readmeText: string, changelogText: string}[],
 *   identicalDuplicates: string[],
 * }}
 */
export function mergeChangelogs(readmeEntries, changelogEntries) {
  /** @type {ChangelogEntry[]} */
  const entries = [];
  /** @type {Map<string, ChangelogEntry>} */
  const readmeByVersion = new Map();
  /** @type {Set<string>} */
  const seen = new Set();

  for (const entry of readmeEntries) {
    if (seen.has(entry.version)) {
      continue;
    }
    seen.add(entry.version);
    readmeByVersion.set(entry.version, entry);
    entries.push(entry);
  }

  /** @type {{version: string, readmeText: string, changelogText: string}[]} */
  const differences = [];
  /** @type {string[]} */
  const identicalDuplicates = [];

  for (const entry of changelogEntries) {
    const readmeEntry = readmeByVersion.get(entry.version);
    if (readmeEntry) {
      const readmeText = entryText(readmeEntry);
      const changelogText = entryText(entry);
      if (readmeText !== changelogText) {
        differences.push({version: entry.version, readmeText, changelogText});
      } else {
        identicalDuplicates.push(entry.version);
      }
      continue;
    }
    if (seen.has(entry.version)) {
      continue;
    }
    seen.add(entry.version);
    entries.push(entry);
  }

  return {entries, differences, identicalDuplicates};
}

/**
 * @param {{id: string, label?: string}} plugin
 * @param {ChangelogEntry[]} entries
 * @param {{readme: boolean, changelog: boolean}} sources
 * @param {{id: string, label: string, linkLabel: string, href: string}[]} [related]
 * @param {LegacySection[]} [legacy]
 * @returns {string}
 */
export function renderChangelogPage(plugin, entries, sources, related = [], legacy = []) {
  const label = plugin.label || plugin.id;
  const sourceList = [
    sources.readme ? `data/${plugin.id}/readme.txt` : null,
    sources.changelog ? `data/${plugin.id}/changelog.md` : null,
  ];
  for (const section of legacy) {
    if (section.placeholder) {
      continue;
    }
    const base = `data/${plugin.id}/legacy/${section.id}`;
    if (section.readme) {
      sourceList.push(`${base}/readme.txt`);
    }
    if (section.changelog) {
      sourceList.push(`${base}/changelog.md`);
    }
  }

  const lines = [
    '---',
    `title: ${JSON.stringify(changelogTitle(label))}`,
    'sidebar_label: Changelog',
    `description: ${JSON.stringify(changelogDescription(label))}`,
    'slug: /changelog',
    'pagination_prev: null',
    'pagination_next: null',
    '---',
    '',
    `{/* Generated by scripts/generate-changelog.mjs from ${sourceList.filter(Boolean).join(' and ')}. Do not edit. */}`,
    '',
    '# Changelog',
    '',
  ];

  for (const item of related) {
    lines.push(relatedChangelogCallout(item), '');
  }

  lines.push(SEMVER_NOTE, '');

  for (const entry of entries) {
    lines.push(renderHeading(entry), '');
    if (entry.body) {
      lines.push(escapeChangelogMdx(entry.body), '');
    }
  }

  for (const section of legacy) {
    lines.push(`## ${escapeChangelogMdx(section.title)} {/* #${section.id} */}`, '');
    if (section.placeholder) {
      lines.push(legacyPlaceholder(section.name, label), '');
      continue;
    }
    for (const entry of section.entries) {
      lines.push(renderHeading(entry, `${section.id}-`), '');
      if (entry.body) {
        lines.push(escapeChangelogMdx(entry.body), '');
      }
    }
  }

  return `${lines.join('\n').replace(/\n+$/, '')}\n`;
}

/**
 * Pages are MDX. `{` `}` and `<` outside code spans are escaped so bullets
 * still display the characters written in the source.
 *
 * @param {string} markdown
 * @returns {string}
 */
export function escapeChangelogMdx(markdown) {
  const parts = String(markdown).split(/(```[\s\S]*?```|`[^`\n]*`)/g);
  return parts
    .map((part) => {
      if (part.startsWith('`')) {
        return part;
      }
      return part
        .replace(/[{}]/g, (char) => (char === '{' ? "{'{'}" : "{'}'}"))
        .replace(/</g, '&lt;');
    })
    .join('');
}

/**
 * Text compared when the same version is in both sources.
 * Trailing whitespace on each line is ignored. The published page keeps
 * the readme.txt wording as written.
 *
 * @param {ChangelogEntry} entry
 * @returns {string}
 */
export function entryText(entry) {
  const suffix = entry.suffix ? ` ${entry.suffix}` : '';
  const heading = `${entry.version} ${entry.dash} ${entry.date}${suffix}`;
  const body = entry.body
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/g, ''))
    .join('\n')
    .trim();
  return body ? `${heading}\n${body}` : heading;
}

/**
 * @param {string} pluginId
 * @param {{
 *   entries: ChangelogEntry[],
 *   differences: {version: string}[],
 *   identicalDuplicates: string[],
 * }} merged
 * @param {{readmeCount: number, changelogCount: number}} counts
 * @returns {string[]}
 */
export function formatChangelogLog(pluginId, merged, counts) {
  const dropped = merged.differences.length + merged.identicalDuplicates.length;
  /** @type {string[]} */
  const lines = [
    `${pluginId}: ${merged.entries.length} versions (${counts.readmeCount} in readme.txt, ${counts.changelogCount} in changelog.md, ${dropped} dropped as duplicates).`,
  ];

  if (merged.differences.length === 0) {
    lines.push(`${pluginId}: no versions found in both sources with different text.`);
  } else {
    lines.push(`${pluginId}: versions in both sources with different text:`);
    for (const diff of merged.differences) {
      lines.push(...summarizeDifference(diff));
    }
  }

  if (merged.identicalDuplicates.length > 0) {
    lines.push(
      `${pluginId}: dropped identical duplicate versions: ${merged.identicalDuplicates.join(', ')}`,
    );
  }

  return lines;
}

/**
 * @param {string} rootDir
 * @param {{id: string, label?: string, relatedChangelogs?: string[]}} plugin
 * @param {{id: string, label?: string, navLabel?: string, routeBasePath?: string}[]} [plugins]
 * @returns {{
 *   page: string,
 *   merged: ReturnType<typeof mergeChangelogs>,
 *   readmeCount: number,
 *   changelogCount: number,
 * }}
 */
export function loadPluginChangelog(rootDir, plugin, plugins = []) {
  const readmePath = path.join(rootDir, 'data', plugin.id, 'readme.txt');
  const changelogPath = path.join(rootDir, 'data', plugin.id, 'changelog.md');
  if (!fs.existsSync(readmePath)) {
    throw new Error(`Missing data/${plugin.id}/readme.txt.`);
  }

  const readme = fs.readFileSync(readmePath, 'utf8');
  const section = extractReadmeChangelogSection(readme);
  if (section == null) {
    throw new Error(`data/${plugin.id}/readme.txt has no == Changelog == section.`);
  }

  const readmeEntries = parseReadmeChangelog(readme);
  if (readmeEntries.length === 0) {
    throw new Error(`data/${plugin.id}/readme.txt Changelog section has no versions.`);
  }

  const hasChangelog = fs.existsSync(changelogPath);
  const changelogEntries = hasChangelog
    ? parseChangelogDocument(fs.readFileSync(changelogPath, 'utf8'))
    : [];
  const merged = mergeChangelogs(readmeEntries, changelogEntries);
  const legacy = loadLegacyChangelogs(rootDir, plugin);
  const page = renderChangelogPage(
    plugin,
    merged.entries,
    {
      readme: true,
      changelog: hasChangelog,
    },
    resolveRelatedChangelogs(plugin, plugins),
    legacy,
  );

  return {
    page,
    merged,
    readmeCount: readmeEntries.length,
    changelogCount: changelogEntries.length,
    legacy,
  };
}

/**
 * Load optional add-on changelogs. A section with neither source file
 * keeps a public placeholder. A source file that cannot be parsed fails
 * the build.
 *
 * @param {string} rootDir
 * @param {{id: string, legacyChangelogs?: unknown}} plugin
 * @returns {LegacySection[]}
 */
export function loadLegacyChangelogs(rootDir, plugin) {
  return normalizeLegacyChangelogs(plugin).map((legacy) => loadLegacySection(rootDir, plugin.id, legacy));
}

/**
 * @param {string} rootDir
 * @param {string} pluginId
 * @param {{id: string, title: string, name: string}} legacy
 * @returns {LegacySection}
 */
function loadLegacySection(rootDir, pluginId, legacy) {
  const relativeDir = `data/${pluginId}/legacy/${legacy.id}`;
  const dir = path.join(rootDir, relativeDir);
  const readmePath = path.join(dir, 'readme.txt');
  const changelogPath = path.join(dir, 'changelog.md');
  const hasReadme = fs.existsSync(readmePath);
  const hasChangelog = fs.existsSync(changelogPath);
  if (!hasReadme && !hasChangelog) {
    return {
      ...legacy,
      placeholder: true,
      entries: [],
      readme: false,
      changelog: false,
      merged: {entries: [], differences: [], identicalDuplicates: []},
      readmeCount: 0,
      changelogCount: 0,
    };
  }

  /** @type {ChangelogEntry[]} */
  let readmeEntries = [];
  if (hasReadme) {
    const readme = fs.readFileSync(readmePath, 'utf8');
    if (extractReadmeChangelogSection(readme) == null) {
      throw new Error(`${relativeDir}/readme.txt has no == Changelog == section.`);
    }
    readmeEntries = parseReadmeChangelog(readme);
    if (readmeEntries.length === 0) {
      throw new Error(`${relativeDir}/readme.txt Changelog section has no versions.`);
    }
  }

  const changelogEntries = hasChangelog
    ? parseChangelogDocument(fs.readFileSync(changelogPath, 'utf8'))
    : [];
  if (!hasReadme && changelogEntries.length === 0) {
    throw new Error(`${relativeDir}/changelog.md has no versions.`);
  }

  const merged = mergeChangelogs(readmeEntries, changelogEntries);
  return {
    ...legacy,
    placeholder: false,
    entries: merged.entries,
    readme: hasReadme,
    changelog: hasChangelog,
    merged,
    readmeCount: readmeEntries.length,
    changelogCount: changelogEntries.length,
  };
}

/**
 * @param {string} text
 * @returns {string}
 */
function normalizeNewlines(text) {
  return String(text).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n');
}

/**
 * @param {string} text
 * @returns {Omit<ChangelogEntry, 'source'>[]}
 */
function parseVersionBlocks(text) {
  const lines = normalizeNewlines(text).split('\n');
  /** @type {Omit<ChangelogEntry, 'source'>[]} */
  const entries = [];
  /** @type {Omit<ChangelogEntry, 'source'> | null} */
  let current = null;
  /** @type {string[]} */
  let body = [];

  const flush = () => {
    if (!current) {
      return;
    }
    current.body = cleanBody(body);
    entries.push(current);
    body = [];
  };

  for (const line of lines) {
    const heading = parseVersionHeading(line);
    if (heading) {
      flush();
      current = {...heading, body: ''};
      continue;
    }
    if (current) {
      body.push(line);
    }
  }
  flush();
  return entries;
}

/**
 * @param {string[]} lines
 * @returns {string}
 */
function cleanBody(lines) {
  const kept = lines.filter((line) => !isProcessLink(line.trim()));
  while (kept.length > 0 && kept[0].trim() === '') {
    kept.shift();
  }
  while (kept.length > 0 && kept[kept.length - 1].trim() === '') {
    kept.pop();
  }
  return kept.join('\n');
}

/**
 * Pointers back to a source file are not release notes.
 *
 * @param {string} line
 * @returns {boolean}
 */
function isProcessLink(line) {
  return /^\[See complete changelog\]\([^)]*\)$/i.test(line)
    || /^\[See latest changes in the plugin's readme\.txt\]\([^)]*\)$/i.test(line);
}

/**
 * @param {Omit<ChangelogEntry, 'source'>} entry
 * @param {string} [anchorPrefix] Keeps an add-on version from sharing a plugin version anchor.
 * @returns {string}
 */
function renderHeading(entry, anchorPrefix = '') {
  const suffix = entry.suffix ? ` ${entry.suffix}` : '';
  // `{/* #id */}` is the heading id syntax that compiles with MDX when
  // future.v4 disables the legacy `{#id}` compatibility escape.
  return `## ${entry.version} ${entry.dash} ${entry.date}${suffix} {/* #${anchorPrefix}${versionAnchor(entry.version)} */}`;
}

/**
 * @param {{version: string, readmeText: string, changelogText: string}} diff
 * @returns {string[]}
 */
function summarizeDifference(diff) {
  const readmeLines = diff.readmeText.split('\n');
  const changelogLines = diff.changelogText.split('\n');
  /** @type {string[]} */
  const lines = [`  - ${diff.version}`];
  const max = Math.max(readmeLines.length, changelogLines.length);
  let shown = 0;
  for (let index = 0; index < max; index += 1) {
    if (readmeLines[index] === changelogLines[index]) {
      continue;
    }
    if (shown >= 8) {
      lines.push('    …');
      break;
    }
    lines.push(`    readme.txt: ${readmeLines[index] ?? '(no line)'}`);
    lines.push(`    changelog.md: ${changelogLines[index] ?? '(no line)'}`);
    shown += 1;
  }
  return lines;
}

/**
 * @typedef {object} ChangelogEntry
 * @property {string} version
 * @property {string} dash
 * @property {string} date
 * @property {string} suffix
 * @property {string} body
 * @property {'readme' | 'changelog'} source
 */

/**
 * @typedef {object} LegacySection
 * @property {string} id
 * @property {string} title
 * @property {string} name
 * @property {boolean} placeholder
 * @property {ChangelogEntry[]} entries
 * @property {boolean} readme
 * @property {boolean} changelog
 * @property {ReturnType<typeof mergeChangelogs>} merged
 * @property {number} readmeCount
 * @property {number} changelogCount
 */
