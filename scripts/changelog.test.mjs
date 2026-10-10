import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {
  entryText,
  escapeChangelogMdx,
  extractReadmeChangelogSection,
  legacyPlaceholder,
  loadLegacyChangelogs,
  loadPluginChangelog,
  mergeChangelogs,
  normalizeLegacyChangelogs,
  parseChangelogDocument,
  parseReadmeChangelog,
  parseVersionHeading,
  relatedChangelogLine,
  renderChangelogPage,
  resolveRelatedChangelogs,
  versionAnchor,
} from './changelog.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('version anchors replace dots and keep pre-release labels', () => {
  assert.equal(versionAnchor('4.2.7'), '4-2-7');
  assert.equal(versionAnchor('1.2.10'), '1-2-10');
  assert.equal(versionAnchor('1.5.0-beta-1'), '1-5-0-beta-1');
  assert.equal(parseVersionHeading('= 1.5.0-beta-1 - 2024-01-01 =')?.version, '1.5.0-beta-1');
  assert.equal(parseVersionHeading('= 4.0 ='), null);
});

test('readme changelog stops before the next section and drops the archive link', () => {
  const readme = [
    'License: GPLv3 or later',
    '',
    '== Description ==',
    '',
    'Not a release note.',
    '',
    '== Changelog ==',
    '',
    '= 1.2.3 - 2024-01-01 =',
    '* Added: From readme.',
    '',
    '[See complete changelog](https://example.com/old)',
    '',
    '== Upgrade Notice ==',
    '',
    '= 1.0 =',
    '* BREAKING CHANGES - not part of the changelog page.',
  ].join('\n');

  const section = extractReadmeChangelogSection(readme);
  assert.match(section, /= 1\.2\.3 - 2024-01-01 =/);
  assert.doesNotMatch(section, /Upgrade Notice/);
  assert.doesNotMatch(section, /GPLv3/);

  const entries = parseReadmeChangelog(readme);
  assert.equal(entries.length, 1);
  assert.equal(entries[0].version, '1.2.3');
  assert.equal(entries[0].body, '* Added: From readme.');
  assert.equal(entries[0].source, 'readme');
});

test('changelog.md preamble is dropped and the readme copy wins', () => {
  const readme = [
    '== Changelog ==',
    '',
    '= 1.2.3 - 2024-01-01 =',
    '* Added: From readme.',
    '',
    '= 1.2.2 - 2023-12-01 =',
    '* Added: Only readme.',
    '',
    '= 1.0.0 - 2020-01-01 = (first public release)',
    '* Added: Shared and identical.',
  ].join('\n');
  const changelog = [
    '# Changelog',
    '',
    'All notable changes to this project will be documented in this file and the plugin\'s readme.txt file.',
    '',
    'To avoid duplicate work, changes are first added to the [plugin\'s readme.txt file](https://example.com/readme.txt), then after a few iterations, they are moved to this file.',
    '',
    'The format is based on the [WordPress plugin readme file standard](https://example.com/readme), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).',
    '',
    '- MAJOR version when incompatible API changes are introduced,',
    '',
    '# CHANGES',
    '',
    '[See latest changes in the plugin\'s readme.txt](https://example.com/readme.txt)',
    '',
    '= 1.2.3 - 2024-01-02 =',
    '* Added: From changelog file.',
    '',
    '= 1.2.1 - 2023-11-01 =',
    '* Added: Only changelog.',
    '',
    '= 1.2.0 – 2022-02-05 = (first public release)',
    '',
    '* Added: Address Book.',
    '',
    '= 1.0.0 - 2020-01-01 = (first public release)',
    '* Added: Shared and identical.',
  ].join('\n');

  const readmeEntries = parseReadmeChangelog(readme);
  const changelogEntries = parseChangelogDocument(changelog);
  assert.deepEqual(changelogEntries.map((entry) => entry.version), ['1.2.3', '1.2.1', '1.2.0', '1.0.0']);
  assert.equal(changelogEntries[2].dash, '\u2013');
  assert.equal(changelogEntries[2].suffix, '(first public release)');

  const merged = mergeChangelogs(readmeEntries, changelogEntries);
  assert.deepEqual(merged.entries.map((entry) => entry.version), ['1.2.3', '1.2.2', '1.0.0', '1.2.1', '1.2.0']);
  assert.equal(merged.entries[0].body, '* Added: From readme.');
  assert.equal(merged.entries[0].date, '2024-01-01');
  assert.deepEqual(merged.differences.map((diff) => diff.version), ['1.2.3']);
  assert.deepEqual(merged.identicalDuplicates, ['1.0.0']);
  assert.notEqual(entryText(readmeEntries[0]), entryText(changelogEntries[0]));

  const page = renderChangelogPage({id: 'lite', label: 'Fluid Checkout Lite'}, merged.entries, {
    readme: true,
    changelog: true,
  });
  assert.match(page, /^title: "Fluid Checkout Lite changelog"$/m);
  assert.match(page, /^sidebar_label: Changelog$/m);
  assert.match(page, /^description: "Release history for Fluid Checkout Lite, newest version first\."$/m);
  assert.match(page, /slug: \/changelog/);
  assert.match(page, /^# Changelog$/m);
  assert.doesNotMatch(page, /Looking for /);
  assert.match(page, /This project follows \[Semantic Versioning\]\(https:\/\/semver\.org\/spec\/v2\.0\.0\.html\)\./);
  assert.match(page, /^## 1\.2\.3 - 2024-01-01 \{\/\* #1-2-3 \*\/\}$/m);
  assert.match(page, /^## 1\.2\.0 – 2022-02-05 \(first public release\) \{\/\* #1-2-0 \*\/\}$/m);
  assert.match(page, /\* Added: From readme\./);
  assert.doesNotMatch(page, /From changelog file/);
  assert.doesNotMatch(page, /To avoid duplicate work/);
  assert.doesNotMatch(page, /after a few iterations/);
  assert.doesNotMatch(page, /MAJOR version when incompatible/);
  assert.doesNotMatch(page, /See latest changes/);
  assert.doesNotMatch(page, /Upgrade Notice/);
  assert.ok(page.indexOf('## 1.2.3') < page.indexOf('{/* #1-2-3 */}'));
  assert.ok(page.indexOf('{/* #1-2-3 */}') < page.indexOf('{/* #1-2-2 */}'));
  assert.ok(page.indexOf('{/* #1-2-2 */}') < page.indexOf('## 1.2.1'));
});

test('mdx escapes braces and angle brackets outside code spans only', () => {
  const source = [
    '* Added: Translations of "Add <field>" link buttons.',
    '* Added: Placeholder {section} outside code.',
    '* Added: New filter `fc_substep_{$substep_id}_attributes` for `<label>` elements.',
    '```',
    '<field> {$key}',
    '```',
  ].join('\n');
  const escaped = escapeChangelogMdx(source);
  assert.match(escaped, /Add &lt;field>/);
  assert.doesNotMatch(escaped, /Add <field>/);
  assert.match(escaped, /Placeholder \{'\{'\}section\{'\}'\} outside code/);
  assert.match(escaped, /`fc_substep_\{\$substep_id\}_attributes`/);
  assert.match(escaped, /`<label>`/);
  assert.match(escaped, /```\n<field> \{\$key\}\n```/);
});

test('relatedChangelogs adds a trailing-slash link and is omitted when unset', () => {
  const plugins = [
    {id: 'lite', label: 'Fluid Checkout Lite', navLabel: 'Lite', routeBasePath: 'lite'},
    {id: 'pro', label: 'Fluid Checkout PRO', navLabel: 'PRO', routeBasePath: 'pro'},
  ];
  const related = resolveRelatedChangelogs({id: 'lite', relatedChangelogs: ['pro']}, plugins);
  assert.deepEqual(related, [{
    label: 'Fluid Checkout PRO',
    linkLabel: 'PRO',
    href: '/pro/changelog/',
  }]);
  assert.equal(
    relatedChangelogLine(related[0]),
    'Looking for Fluid Checkout PRO changes? See the [PRO changelog](/pro/changelog/).',
  );
  assert.deepEqual(resolveRelatedChangelogs({id: 'eu-vat'}, plugins), []);
  assert.throws(
    () => resolveRelatedChangelogs({id: 'lite', relatedChangelogs: ['missing']}, plugins),
    /unknown plugin "missing"/,
  );

  const page = renderChangelogPage({id: 'lite', label: 'Fluid Checkout Lite'}, [], {
    readme: true,
    changelog: false,
  }, related);
  assert.ok(page.indexOf('# Changelog') < page.indexOf('Looking for Fluid Checkout PRO changes?'));
  assert.ok(page.indexOf('Looking for Fluid Checkout PRO changes?') < page.indexOf('Semantic Versioning'));
  assert.match(page, /\[PRO changelog\]\(\/pro\/changelog\/\)/);
});

test('legacy changelogs render source history or a public placeholder', () => {
  const plugin = {
    id: 'pro',
    label: 'Fluid Checkout PRO',
    legacyChangelogs: [
      {id: 'address-book', title: 'Address Book (before merging into PRO)'},
      {id: 'google-address-autocomplete', title: 'Google Address Autocomplete (before merging into PRO)'},
    ],
  };
  assert.equal(
    legacyPlaceholder('Address Book', 'Fluid Checkout PRO'),
    'Address Book is being merged into Fluid Checkout PRO. Its changelog for earlier versions, from when it was a separate add-on, will be added here.',
  );
  assert.throws(
    () => normalizeLegacyChangelogs({id: 'pro', legacyChangelogs: [{id: 'Address Book', title: 'Address Book'}]}),
    /lowercase slug/,
  );

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-legacy-'));
  const dir = path.join(tmp, 'data', 'pro', 'legacy', 'address-book');
  fs.mkdirSync(dir, {recursive: true});
  fs.writeFileSync(path.join(dir, 'readme.txt'), [
    '== Description ==',
    'Not a release note.',
    '== Changelog ==',
    '= 3.1.0 - 2024-05-01 =',
    '* Added: From readme <field>.',
    '= 3.0.0 - 2024-01-01 =',
    '* Added: Shared.',
    '== Upgrade Notice ==',
    '= 1.0 =',
    '* Not part of the page.',
  ].join('\n'));
  fs.writeFileSync(path.join(dir, 'changelog.md'), [
    'To avoid duplicate work, changes are first added to the readme.',
    '',
    '= 3.1.0 - 2024-06-01 =',
    '* Added: From changelog file.',
    '',
    '= 2.0.0 - 2023-01-01 =',
    '* Added: Only changelog.',
  ].join('\n'));

  const sections = loadLegacyChangelogs(tmp, plugin);
  assert.equal(sections[0].placeholder, false);
  assert.deepEqual(sections[0].entries.map((entry) => entry.version), ['3.1.0', '3.0.0', '2.0.0']);
  assert.equal(sections[0].entries[0].body, '* Added: From readme <field>.');
  assert.equal(sections[0].entries[0].date, '2024-05-01');
  assert.equal(sections[1].placeholder, true);
  assert.equal(sections[1].entries.length, 0);

  const page = renderChangelogPage(plugin, [{
    version: '4.0.6',
    dash: '-',
    date: '2026-08-19',
    suffix: '',
    body: '* PRO note.',
    source: 'readme',
  }], {readme: true, changelog: false}, [], sections);
  assert.match(page, /^## 4\.0\.6 - 2026-08-19 \{\/\* #4-0-6 \*\/\}$/m);
  assert.match(page, /^## Address Book \(before merging into PRO\) \{\/\* #address-book \*\/\}$/m);
  assert.match(page, /^## 3\.1\.0 - 2024-05-01 \{\/\* #address-book-3-1-0 \*\/\}$/m);
  assert.match(page, /^## 2\.0\.0 - 2023-01-01 \{\/\* #address-book-2-0-0 \*\/\}$/m);
  assert.match(page, /From readme &lt;field>/);
  assert.doesNotMatch(page, /From changelog file/);
  assert.doesNotMatch(page, /To avoid duplicate work/);
  assert.doesNotMatch(page, /Upgrade Notice/);
  assert.match(page, /from data\/pro\/readme.txt and data\/pro\/legacy\/address-book\/readme.txt and data\/pro\/legacy\/address-book\/changelog.md/);
  assert.match(
    page,
    /Google Address Autocomplete is being merged into Fluid Checkout PRO\. Its changelog for earlier versions, from when it was a separate add-on, will be added here\./,
  );
  assert.doesNotMatch(page, /Address Book is being merged/);
  const visible = page.split(/^# Changelog$/m)[1];
  assert.doesNotMatch(visible, /data\/pro\/legacy/);
  assert.doesNotMatch(visible, /plugins\.json/);
  assert.ok(page.indexOf('{/* #4-0-6 */}') < page.indexOf('{/* #address-book */}'));
  assert.ok(page.indexOf('{/* #address-book */}') < page.indexOf('{/* #address-book-3-1-0 */}'));
  assert.ok(page.indexOf('{/* #address-book-2-0-0 */}') < page.indexOf('{/* #google-address-autocomplete */}'));

  fs.writeFileSync(path.join(dir, 'readme.txt'), 'No changelog section here.\n');
  assert.throws(() => loadLegacyChangelogs(tmp, plugin), /no == Changelog == section/);
});

test('published plugin changelogs keep every source version and the readme copy', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  /** @type {Record<string, number>} */
  const counts = {};

  for (const plugin of catalog.plugins) {
    const loaded = loadPluginChangelog(root, plugin, catalog.plugins);
    const pagePath = path.join(root, 'docs', plugin.id, 'changelog.md');
    assert.equal(fs.readFileSync(pagePath, 'utf8'), loaded.page, `${plugin.id} page is stale; run npm run generate`);

    const versions = loaded.merged.entries.map((entry) => entry.version);
    assert.equal(new Set(versions).size, versions.length, `${plugin.id} has a repeated version`);
    counts[plugin.id] = versions.length;

    const readme = fs.readFileSync(path.join(root, 'data', plugin.id, 'readme.txt'), 'utf8');
    const section = extractReadmeChangelogSection(readme);
    const readmeHeadings = section.split('\n').filter((line) => line.startsWith('= '));
    assert.equal(readmeHeadings.length, loaded.readmeCount, `${plugin.id} readme heading was not parsed`);
    for (const line of readmeHeadings) {
      assert.ok(parseVersionHeading(line), `${plugin.id} unparsed heading: ${line}`);
    }
    const changelogPath = path.join(root, 'data', plugin.id, 'changelog.md');
    if (fs.existsSync(changelogPath)) {
      const changelogHeadings = fs.readFileSync(changelogPath, 'utf8').split('\n').filter((line) => line.startsWith('= '));
      assert.equal(changelogHeadings.length, loaded.changelogCount, `${plugin.id} changelog.md heading was not parsed`);
      for (const line of changelogHeadings) {
        assert.ok(parseVersionHeading(line), `${plugin.id} unparsed heading: ${line}`);
      }
    }

    const legacyIds = Array.isArray(plugin.legacyChangelogs)
      ? plugin.legacyChangelogs.map((item) => item.id)
      : [];
    const anchors = [...loaded.page.matchAll(/^## \d.*\{\/\* #(\S+) \*\/\}$/gm)]
      .map((match) => match[1])
      .filter((id) => !legacyIds.some((legacyId) => id.startsWith(`${legacyId}-`)));
    assert.deepEqual(anchors, versions.map(versionAnchor));

    assert.match(loaded.page, /This project follows \[Semantic Versioning\]/);
    assert.doesNotMatch(loaded.page, /To avoid duplicate work/);
    assert.doesNotMatch(loaded.page, /after a few iterations/);
    assert.doesNotMatch(loaded.page, /All notable changes to this project/);
    assert.doesNotMatch(loaded.page, /See latest changes/);
    assert.doesNotMatch(loaded.page, /See complete changelog/);
    assert.doesNotMatch(loaded.page, /MAJOR version when incompatible/);
    assert.doesNotMatch(loaded.page, /GPLv3/);
    assert.doesNotMatch(loaded.page, /License URI/);
    assert.doesNotMatch(loaded.page, /== Upgrade Notice ==/);
    assert.equal(loaded.merged.differences.length, 0, `${plugin.id} differing versions: ${loaded.merged.differences.map((diff) => diff.version).join(', ')}`);

    for (const entry of loaded.merged.entries) {
      for (const line of entry.body.split('\n')) {
        const ticks = line.split('`').length - 1;
        assert.equal(ticks % 2, 0, `${plugin.id} ${entry.version} has an unmatched backtick: ${line}`);
      }
    }
  }

  const lite = loadPluginChangelog(root, catalog.plugins.find((plugin) => plugin.id === 'lite'), catalog.plugins);
  assert.equal(lite.merged.entries[0].version, '4.2.7');
  assert.equal(lite.merged.entries[0].date, '2026-08-19');
  assert.equal(lite.merged.entries.at(-1).version, '1.2.0');
  assert.equal(lite.readmeCount, 15);
  assert.ok(lite.merged.entries.some((entry) => entry.version === '4.0.6' && entry.source === 'changelog'));
  assert.match(lite.page, /Looking for Fluid Checkout PRO changes\? See the \[PRO changelog\]\(\/pro\/changelog\/\)\./);
  assert.doesNotMatch(lite.page, /before merging into PRO/);
  assert.ok(lite.page.indexOf('Looking for Fluid Checkout PRO changes?') < lite.page.indexOf('## 4.2.7'));
  assert.match(lite.page, /^title: "Fluid Checkout Lite changelog"$/m);
  assert.match(lite.page, /^description: "Release history for Fluid Checkout Lite, newest version first\."$/m);
  assert.match(lite.page, /\{\/\* #4-2-7 \*\/\}/);
  assert.match(lite.page, /Add &lt;field>/);
  assert.match(lite.page, /`fc_expansible_section_toggle_label_\{\$key\}_add_optional_text`/);
  assert.match(lite.page, /inside the shipping method `<label>` element/);
  assert.match(lite.page, /POSSIBLY BREAKING CHANGES - Some template files were moved/);
  assert.doesNotMatch(lite.page, /Proceed to <next_step>/);

  const pro = loadPluginChangelog(root, catalog.plugins.find((plugin) => plugin.id === 'pro'), catalog.plugins);
  assert.equal(pro.merged.entries[0].version, '4.0.6');
  assert.equal(pro.merged.entries.at(-1).version, '1.2.0');
  assert.equal(pro.merged.entries.at(-1).suffix, '(first public release)');
  assert.match(pro.page, /Looking for Fluid Checkout Lite changes\? See the \[Lite changelog\]\(\/lite\/changelog\/\)\./);
  assert.match(pro.page, /^## Address Book \(before merging into PRO\) \{\/\* #address-book \*\/\}$/m);
  assert.match(pro.page, /Address Book is being merged into Fluid Checkout PRO\. Its changelog for earlier versions, from when it was a separate add-on, will be added here\./);
  assert.match(pro.page, /^## Google Address Autocomplete \(before merging into PRO\) \{\/\* #google-address-autocomplete \*\/\}$/m);
  assert.match(pro.page, /Google Address Autocomplete is being merged into Fluid Checkout PRO\. Its changelog for earlier versions, from when it was a separate add-on, will be added here\./);
  assert.ok(pro.page.lastIndexOf('{/* #1-2-0 */}') < pro.page.indexOf('{/* #address-book */}'));
  assert.ok(pro.page.indexOf('{/* #address-book */}') < pro.page.indexOf('{/* #google-address-autocomplete */}'));
  assert.doesNotMatch(pro.page.split(/^# Changelog$/m)[1], /data\/pro\/legacy/);
  assert.match(pro.page, /^title: "Fluid Checkout PRO changelog"$/m);
  assert.match(pro.page, /^description: "Release history for Fluid Checkout PRO, newest version first\."$/m);
  assert.match(pro.page, /^## 1\.2\.0 – 2022-02-05 \(first public release\) \{\/\* #1-2-0 \*\/\}$/m);
  assert.match(pro.page, /Minimum required version for Fluid Checkout Lite is 4\.2\.0/);
  assert.equal(pro.readmeCount, 7);

  const euVat = loadPluginChangelog(root, catalog.plugins.find((plugin) => plugin.id === 'eu-vat'), catalog.plugins);
  assert.equal(euVat.changelogCount, 0);
  assert.equal(euVat.merged.entries[0].version, '2.1.2');
  assert.equal(euVat.merged.entries.at(-1).version, '0.1.0');
  assert.match(euVat.page, /^title: "EU-VAT Assistant changelog"$/m);
  assert.match(euVat.page, /^description: "Release history for EU-VAT Assistant, newest version first\."$/m);
  assert.match(euVat.page, /from data\/eu-vat\/readme\.txt\. Do not edit/);
  assert.doesNotMatch(euVat.page, /changelog\.md/);
  assert.doesNotMatch(euVat.page, /Looking for /);
  assert.doesNotMatch(euVat.page, /before merging into PRO/);

  assert.equal(lite.merged.entries.length, 101);
  assert.equal(lite.changelogCount, 86);
  assert.equal(pro.merged.entries.length, 77);
  assert.equal(pro.changelogCount, 70);
  assert.equal(euVat.merged.entries.length, 26);
  assert.deepEqual(counts, {
    'eu-vat': 26,
    lite: 101,
    pro: 77,
  });
});
