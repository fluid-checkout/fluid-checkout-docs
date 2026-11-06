#!/usr/bin/env node
/**
 * Write docs/<plugin>/changelog.md from data/<plugin>/readme.txt and
 * data/<plugin>/changelog.md. Invoked by `npm run generate`.
 */

import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  formatChangelogLog,
  LEGACY_CHANGELOG_DOC_ID,
  loadPluginChangelog,
  renderChangelogFormatPage,
} from './changelog.mjs';

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
    const outDir = path.join(root, 'docs', plugin.id);
    const outPath = path.join(outDir, 'changelog.md');
    const legacyOutPath = path.join(outDir, `${LEGACY_CHANGELOG_DOC_ID}.md`);
    fs.mkdirSync(outDir, {recursive: true});
    fs.writeFileSync(outPath, loaded.page);
    generated += 1;
    console.log(`Generated changelog for ${plugin.id} (${loaded.merged.entries.length} versions).`);
    for (const line of formatChangelogLog(plugin.id, loaded.merged, {
      readmeCount: loaded.readmeCount,
      changelogCount: loaded.changelogCount,
    })) {
      console.log(line);
    }

    if (loaded.legacyPage) {
      fs.writeFileSync(legacyOutPath, loaded.legacyPage);
      console.log(`Generated ${plugin.id} ${LEGACY_CHANGELOG_DOC_ID}.`);
      for (const section of loaded.legacy) {
        if (section.placeholder) {
          console.log(`${plugin.id} legacy ${section.id}: placeholder, no changelog.md yet.`);
          continue;
        }
        console.log(`${plugin.id} legacy ${section.id}: ${section.entries.length} versions from changelog.md.`);
      }
    } else if (fs.existsSync(legacyOutPath)) {
      fs.unlinkSync(legacyOutPath);
      console.log(`Removed stale ${plugin.id} ${LEGACY_CHANGELOG_DOC_ID}.`);
    }
  }

  const formatPath = path.join(root, 'src/pages/changelog-format.mdx');
  fs.mkdirSync(path.dirname(formatPath), {recursive: true});
  fs.writeFileSync(formatPath, renderChangelogFormatPage(plugins));
  console.log('Generated src/pages/changelog-format.mdx.');

  if (generated === 0) {
    console.error('No changelogs were generated.');
    process.exit(1);
  }
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main();
}
