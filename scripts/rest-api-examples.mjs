/**
 * Hand-written REST API examples live in rest-api-examples/<plugin>/<endpoint-slug>.md.
 * Generation reads them onto matching endpoint pages. Files are never written by the generator.
 */

import fs from 'node:fs';
import path from 'node:path';
import {stripFrontMatter} from './hooks-intro.mjs';

/**
 * @param {string} examplesDir
 * @param {{slug: string}[]} endpoints
 * @param {string} pluginId
 * @returns {{
 *   loaded: Map<string, {body: string, fileName: string}>,
 *   unused: string[],
 * }}
 */
export function loadRestApiExamples(examplesDir, endpoints, pluginId) {
  /** @type {Map<string, {body: string, fileName: string}>} */
  const loaded = new Map();
  if (!fs.existsSync(examplesDir)) {
    return {loaded, unused: []};
  }

  const used = new Set();
  for (const entry of endpoints) {
    const fileName = `${entry.slug}.md`;
    const filePath = path.join(examplesDir, fileName);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      continue;
    }

    const body = stripFrontMatter(fs.readFileSync(filePath, 'utf8')).trim();
    if (!body) {
      throw new Error(`rest-api-examples/${pluginId}/${fileName} is empty.`);
    }

    loaded.set(entry.slug, {body, fileName});
    used.add(fileName);
  }

  const unused = fs.readdirSync(examplesDir, {withFileTypes: true})
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md') && !used.has(entry.name))
    .map((entry) => entry.name)
    .sort();

  return {loaded, unused};
}

/**
 * @param {{id?: string}} plugin
 * @param {{loaded: Map<string, {body: string, fileName: string}>, unused: string[]}} examples
 * @returns {string[]}
 */
export function formatRestApiExampleLog(plugin, examples) {
  /** @type {string[]} */
  const lines = [];
  const included = [...examples.loaded.values()];
  if (included.length > 0) {
    const label = `${included.length} ${included.length === 1 ? 'REST example file' : 'REST example files'}`;
    lines.push(`Included ${label} for ${plugin.id}:`);
    for (const example of included) {
      lines.push(`  - rest-api-examples/${plugin.id}/${example.fileName}`);
    }
  }

  if (examples.unused.length > 0) {
    const label = `${examples.unused.length} ${examples.unused.length === 1 ? 'unused REST example file' : 'unused REST example files'}`;
    lines.push(`Left ${label} for ${plugin.id} (no matching published endpoint; not modified):`);
    for (const fileName of examples.unused) {
      lines.push(`  - rest-api-examples/${plugin.id}/${fileName}`);
    }
  }

  return lines;
}
