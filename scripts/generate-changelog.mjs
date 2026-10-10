#!/usr/bin/env node
/**
 * Write docs/<plugin>/changelog.md from data/<plugin>/readme.txt and
 * data/<plugin>/changelog.md. Invoked by `npm run generate`.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {formatChangelogLog, loadPluginChangelog} from './changelog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function main() {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const plugins = Array.isArray(catalog.plugins) ? catalog.plugins : [];
  let generated = 0;

  for (const plugin of plugins) {
    if (plugin.status !== 'available') {
      continue;
    }

    const loaded = loadPluginChangelog(root, plugin, plugins);
    const outPath = path.join(root, 'docs', plugin.id, 'changelog.md');
    fs.mkdirSync(path.dirname(outPath), {recursive: true});
    fs.writeFileSync(outPath, loaded.page);
    generated += 1;
    console.log(`Generated changelog for ${plugin.id} (${loaded.merged.entries.length} versions).`);
    for (const line of formatChangelogLog(plugin.id, loaded.merged, {
      readmeCount: loaded.readmeCount,
      changelogCount: loaded.changelogCount,
    })) {
      console.log(line);
    }
    for (const section of loaded.legacy) {
      if (section.placeholder) {
        console.log(`${plugin.id} legacy ${section.id}: placeholder, no source files yet.`);
        continue;
      }
      for (const line of formatChangelogLog(`${plugin.id} legacy ${section.id}`, section.merged, {
        readmeCount: section.readmeCount,
        changelogCount: section.changelogCount,
      })) {
        console.log(line);
      }
    }
  }

  if (generated === 0) {
    console.error('No changelogs were generated.');
    process.exit(1);
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main();
}
