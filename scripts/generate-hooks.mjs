#!/usr/bin/env node
/**
 * Build per-hook Markdown pages from wp-hooks/generator JSON.
 *
 * Reads data/<plugin>/actions.json and data/<plugin>/filters.json
 * and writes docs/<plugin>/hooks/*.md plus sidebars/<plugin>.hooks.json.
 *
 * A hook is published only when its normalized name starts with one of the
 * plugin's hookPrefixes and does not start with a catalog hookExcludePrefixes
 * entry. Third-party hooks (woocommerce_*, wc_od_*, and similar) and bundled
 * Fluid Licenses hooks (fc_licenses_*) are omitted from the page, index, and
 * sidebar.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {normalizeHookName, slugifyHookName} from './normalize-hook-name.mjs';
import {renderHookPage, renderHooksIndex, renderSidebarItems} from './render-hook.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * @param {string} name Normalized hook or alias name.
 * @param {string[]} prefixes
 * @returns {boolean}
 */
export function matchesHookPrefix(name, prefixes) {
  if (typeof name !== 'string' || name.length === 0 || !Array.isArray(prefixes)) {
    return false;
  }
  return prefixes.some((prefix) => typeof prefix === 'string' && prefix.length > 0 && name.startsWith(prefix));
}

/**
 * Site-wide prefixes from the catalog root. Missing means no extra exclusion.
 * Applied after each plugin's allowlist.
 *
 * @param {{hookExcludePrefixes?: unknown} | null | undefined} source
 * @returns {string[]}
 */
export function resolveHookExcludePrefixes(source) {
  if (source == null || source.hookExcludePrefixes == null) {
    return [];
  }
  return normalizePrefixList(source.hookExcludePrefixes, 'hookExcludePrefixes');
}

/**
 * @param {unknown} raw
 * @param {string} label
 * @returns {string[]}
 */
function normalizePrefixList(raw, label) {
  if (!Array.isArray(raw)) {
    throw new Error(`${label} must be an array of hook name prefixes.`);
  }
  return raw.map((prefix) => String(prefix).trim()).filter((prefix) => prefix.length > 0);
}

/**
 * @param {{id?: string, hookPrefixes?: unknown}} plugin
 * @returns {string[]}
 */
export function resolveHookPrefixes(plugin) {
  const id = plugin?.id || 'unknown';
  if (!Array.isArray(plugin?.hookPrefixes)) {
    throw new Error(
      `Plugin "${id}" is missing hookPrefixes in plugins.json. Set an allowlist such as ["fc_vat_"] so third-party hooks are not published.`,
    );
  }

  const prefixes = plugin.hookPrefixes
    .map((prefix) => String(prefix).trim())
    .filter((prefix) => prefix.length > 0);

  if (prefixes.length === 0) {
    throw new Error(
      `Plugin "${id}" is missing hookPrefixes in plugins.json. Set an allowlist such as ["fc_vat_"] so third-party hooks are not published.`,
    );
  }

  return prefixes;
}

/**
 * @param {object[]} hooks
 * @param {{id?: string, pluginPrefix?: string, hookPrefixes?: string[], hookExcludePrefixes?: string[]}} plugin
 * @param {string[] | undefined} [excludePrefixes] Catalog exclusions. When omitted, `plugin.hookExcludePrefixes` is used.
 * @returns {{
 *   hooks: {hook: object, name: string, slug: string, type: string, summary: string}[],
 *   skipped: {raw: string, name: string}[],
 *   droppedAliases: {hook: string, raw: string, name: string}[],
 *   prefixes: string[],
 *   excludePrefixes: string[],
 * }}
 */
export function prepareHooks(hooks, plugin, excludePrefixes) {
  const pluginPrefix = plugin.pluginPrefix || '';
  const prefixes = resolveHookPrefixes(plugin);
  const excludes = excludePrefixes === undefined
    ? resolveHookExcludePrefixes(plugin)
    : normalizePrefixList(excludePrefixes, 'hookExcludePrefixes');
  const usedSlugs = new Set();
  /** @type {{raw: string, name: string}[]} */
  const skipped = [];
  /** @type {{hook: string, raw: string, name: string}[]} */
  const droppedAliases = [];

  const prepared = [];
  for (const hook of hooks) {
    const raw = String(hook.name ?? '');
    const name = normalizeHookName(raw, pluginPrefix);
    if (!matchesHookPrefix(name, prefixes) || matchesHookPrefix(name, excludes)) {
      skipped.push({raw, name});
      continue;
    }

    const aliases = filterAliases(hook.aliases, pluginPrefix, prefixes, excludes, name, droppedAliases);
    let slug = slugifyHookName(name);
    if (usedSlugs.has(slug)) {
      let suffix = 2;
      while (usedSlugs.has(`${slug}-${suffix}`)) {
        suffix += 1;
      }
      slug = `${slug}-${suffix}`;
    }
    usedSlugs.add(slug);

    const type = hook.type || 'filter';
    prepared.push({
      hook: {
        ...hook,
        aliases,
      },
      name,
      slug,
      type,
      summary: String(hook.doc?.description || '').replace(/\s+/g, ' ').trim(),
    });
  }

  prepared.sort((a, b) => {
    const key = (hookName) => hookName.replace(/[{}]/g, '').toLowerCase();
    return key(a.name).localeCompare(key(b.name)) || a.slug.localeCompare(b.slug);
  });

  return {hooks: prepared, skipped, droppedAliases, prefixes, excludePrefixes: excludes};
}

/**
 * Lines printed during `npm run generate` so CI shows which hooks were left out.
 *
 * @param {{id: string}} plugin
 * @param {ReturnType<typeof prepareHooks>} result
 * @returns {string[]}
 */
export function formatHookFilterLog(plugin, result) {
  const prefixes = result.prefixes.join(', ');
  const excludes = Array.isArray(result.excludePrefixes) ? result.excludePrefixes : [];
  const rule = excludes.length > 0
    ? `hookPrefixes: ${prefixes}; hookExcludePrefixes: ${excludes.join(', ')}`
    : `hookPrefixes: ${prefixes}`;
  /** @type {string[]} */
  const lines = [];
  const skippedCount = result.skipped.length;
  const skippedLabel = `${skippedCount} ${skippedCount === 1 ? 'hook' : 'hooks'}`;

  if (skippedCount === 0) {
    lines.push(`Skipped ${skippedLabel} for ${plugin.id} (${rule}).`);
  } else {
    lines.push(`Skipped ${skippedLabel} for ${plugin.id} (${rule}):`);
    for (const hook of result.skipped) {
      lines.push(`  - ${formatSkippedName(hook)}`);
    }
  }

  const droppedCount = result.droppedAliases.length;
  if (droppedCount > 0) {
    const droppedLabel = `${droppedCount} ${droppedCount === 1 ? 'alias' : 'aliases'}`;
    const aliasScope = excludes.length > 0
      ? 'outside hookPrefixes or matching hookExcludePrefixes'
      : 'outside hookPrefixes';
    lines.push(`Dropped ${droppedLabel} for ${plugin.id} ${aliasScope}:`);
    for (const alias of result.droppedAliases) {
      lines.push(`  - ${formatSkippedName(alias)} (on ${alias.hook})`);
    }
  }

  return lines;
}

/**
 * @param {{raw: string, name: string}} entry
 * @returns {string}
 */
function formatSkippedName(entry) {
  const raw = String(entry.raw).trim();
  if (entry.name === raw) {
    return entry.name;
  }
  return `${entry.name} (from ${entry.raw})`;
}

/**
 * @param {unknown} aliases
 * @param {string} pluginPrefix
 * @param {string[]} prefixes
 * @param {string[]} excludes
 * @param {string} hookName
 * @param {{hook: string, raw: string, name: string}[]} droppedAliases
 * @returns {string[]}
 */
function filterAliases(aliases, pluginPrefix, prefixes, excludes, hookName, droppedAliases) {
  if (!Array.isArray(aliases)) {
    return [];
  }

  /** @type {string[]} */
  const kept = [];
  for (const alias of aliases) {
    const raw = String(alias ?? '');
    const trimmed = raw.trim();
    if (!trimmed) {
      continue;
    }
    const name = normalizeHookName(trimmed, pluginPrefix);
    if (!matchesHookPrefix(name, prefixes) || matchesHookPrefix(name, excludes)) {
      droppedAliases.push({hook: hookName, raw, name});
      continue;
    }
    kept.push(name);
  }
  return kept;
}

function main() {
  const requestedPlugin = process.argv[2];
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const plugins = Array.isArray(catalog.plugins) ? catalog.plugins : [];
  const excludePrefixes = resolveHookExcludePrefixes(catalog);

  let generatedPlugins = 0;

  for (const plugin of plugins) {
    if (plugin.status !== 'available') {
      continue;
    }
    if (requestedPlugin && plugin.id !== requestedPlugin) {
      continue;
    }

    const dataDir = path.join(root, 'data', plugin.id);
    const actionsPath = path.join(dataDir, 'actions.json');
    const filtersPath = path.join(dataDir, 'filters.json');
    if (!fs.existsSync(actionsPath) && !fs.existsSync(filtersPath)) {
      console.warn(`No hook JSON for ${plugin.id}; skipped.`);
      continue;
    }

    const hooks = [
      ...loadHooks(actionsPath, 'action'),
      ...loadHooks(filtersPath, 'filter'),
    ];

    const result = prepareHooks(hooks, plugin, excludePrefixes);
    writePlugin(plugin, result.hooks);
    generatedPlugins += 1;
    console.log(`Generated ${result.hooks.length} hook page(s) for ${plugin.id}.`);
    for (const line of formatHookFilterLog(plugin, result)) {
      console.log(line);
    }
  }

  if (generatedPlugins === 0) {
    console.error('No plugin hook data was generated.');
    process.exit(1);
  }
}

/**
 * @param {string} filePath
 * @param {string} fallbackType
 * @returns {object[]}
 */
function loadHooks(filePath, fallbackType) {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const document = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  if (!document || !Array.isArray(document.hooks)) {
    throw new Error(`${path.relative(root, filePath)} is missing a hooks array.`);
  }

  return document.hooks.map((hook) => ({
    ...hook,
    type: hook.type || fallbackType,
  }));
}

/**
 * @param {{id: string, label?: string, repository?: object | null}} plugin
 * @param {ReturnType<typeof prepareHooks>['hooks']} prepared
 */
function writePlugin(plugin, prepared) {
  const hooksDir = path.join(root, 'docs', plugin.id, 'hooks');
  fs.mkdirSync(hooksDir, {recursive: true});

  for (const entry of fs.readdirSync(hooksDir)) {
    if (entry.endsWith('.md') || entry.endsWith('.mdx')) {
      fs.unlinkSync(path.join(hooksDir, entry));
    }
  }

  const indexHooks = prepared.map((entry) => ({
    name: entry.name,
    slug: entry.slug,
    type: entry.type,
    summary: entry.summary,
  }));

  fs.writeFileSync(
    path.join(hooksDir, 'README.md'),
    [
      '# Generated hook pages',
      '',
      `This directory is generated by \`scripts/generate-hooks.mjs\` from \`data/${plugin.id}/actions.json\` and \`data/${plugin.id}/filters.json\`.`,
      '',
      'Do not edit these files by hand. Update the JSON source, or the generator, then run `npm run generate`.',
      '',
    ].join('\n'),
  );

  fs.writeFileSync(path.join(hooksDir, 'index.md'), renderHooksIndex(indexHooks, plugin.label || plugin.id));

  for (const entry of prepared) {
    const exampleFile = path.join(root, 'examples', plugin.id, entry.slug, 'index.md');
    const exampleImport = fs.existsSync(exampleFile)
      ? `@site/examples/${plugin.id}/${entry.slug}/index.md`
      : null;

    const page = renderHookPage(entry.hook, {
      normalizedName: entry.name,
      slug: entry.slug,
      plugin,
      exampleImport,
    });
    fs.writeFileSync(path.join(hooksDir, `${entry.slug}.md`), page);
  }

  const sidebarPath = path.join(root, 'sidebars', `${plugin.id}.hooks.json`);
  fs.mkdirSync(path.dirname(sidebarPath), {recursive: true});
  fs.writeFileSync(sidebarPath, `${JSON.stringify(renderSidebarItems(indexHooks), null, 2)}\n`);
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main();
}
