import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {
  formatExampleLog,
  prepareHooks,
  resolveHookExclusions,
  writePluginDocs,
} from './generate-hooks.mjs';
import {
  loadHookExamples,
  parseExampleMarkdown,
  relocateUnpublishedSuffixExamples,
  resolveExampleSections,
} from './hook-examples.mjs';
import {renderHookPage} from './render-hook.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const fieldHook = {
  hook: {
    type: 'filter',
    args: 1,
    file: 'inc/checkout-eu-vat.php',
    doc: {
      description: 'Filters the arguments used for the VAT number field.',
      tags: [
        {name: 'since', content: '1.0.0'},
        {name: 'param', variable: '$args', types: ['array'], content: 'VAT number field arguments.'},
      ],
    },
  },
  name: 'fc_vat_number_field_args',
  slug: 'fc_vat_number_field_args',
  type: 'filter',
  summary: 'Filters the arguments used for the VAT number field.',
};

const isFieldHook = {
  hook: {
    type: 'filter',
    args: 2,
    file: 'inc/checkout-eu-vat.php',
    doc: {
      description: 'Filters whether a field is considered a VAT number field.',
      tags: [{name: 'since', content: '0.1.0'}],
    },
  },
  name: 'fc_vat_is_vat_number_field',
  slug: 'fc_vat_is_vat_number_field',
  type: 'filter',
  summary: 'Filters whether a field is considered a VAT number field.',
};

const settingsHook = {
  hook: {
    type: 'filter',
    args: 1,
    file: 'inc/enqueue.php',
    doc: {
      description: 'Filters the JavaScript settings object.',
      tags: [{name: 'since', content: '2.1.0'}],
    },
  },
  name: 'fc_vat_js_settings',
  slug: 'fc_vat_js_settings',
  type: 'filter',
  summary: 'Filters the JavaScript settings object.',
};

test('parses related_hooks front matter and leaves the example body', () => {
  const block = parseExampleMarkdown(`---\r\nrelated_hooks:\r\n  - fc_vat_is_vat_number_field\r\n  - "fc_vat_js_settings"\r\n---\r\n\r\nChange the label.\r\n`);
  assert.deepEqual(block.relatedHooks, ['fc_vat_is_vat_number_field', 'fc_vat_js_settings']);
  assert.equal(block.body, 'Change the label.');

  const flow = parseExampleMarkdown('---\nrelated_hooks: [fc_vat_is_vat_number_field, "fc_vat_js_settings"]\n---\n\nBody.\n');
  assert.deepEqual(flow.relatedHooks, ['fc_vat_is_vat_number_field', 'fc_vat_js_settings']);
  assert.equal(flow.body, 'Body.');

  const plain = parseExampleMarkdown('Just the snippet.\n');
  assert.deepEqual(plain.relatedHooks, []);
  assert.equal(plain.body, 'Just the snippet.');
});

test('rejects a related_hooks value that is not a list', () => {
  assert.throws(
    () => parseExampleMarkdown('---\nrelated_hooks: {name: fc_vat_js_settings}\n---\n\nBody.\n'),
    /related_hooks must be a list of hook names/,
  );
  assert.throws(
    () => parseExampleMarkdown('---\nrelated_hooks:\n  nested: true\n---\n\nBody.\n'),
    /related_hooks list items must use/,
  );
});

test('renders example content after parameters and source, and omits the section otherwise', () => {
  const withExample = renderHookPage(fieldHook.hook, {
    normalizedName: fieldHook.name,
    slug: fieldHook.slug,
    plugin: {repository: null},
    exampleMarkdown: 'Pass {plugin_slug} through.\n\n```php\n$code = "{ok}";\n```',
    relatedExampleLinks: [
      {name: 'fc_vat_enable_compat_plugin_{plugin_slug}', slug: 'fc_vat_enable_compat_plugin_plugin_slug'},
    ],
  });

  const parametersAt = withExample.indexOf('## Parameters');
  const sourceAt = withExample.indexOf('## Source');
  const examplesAt = withExample.indexOf('## Examples');
  assert.ok(parametersAt !== -1 && parametersAt < sourceAt && sourceAt < examplesAt);
  assert.match(withExample, /Pass \{'\{'\}plugin_slug\{'\}'\} through\./);
  assert.match(withExample, /```php\n\$code = "\{ok\}";\n```/);
  assert.match(
    withExample,
    /See example on \[`fc_vat_enable_compat_plugin_\{plugin_slug\}`\]\(\.\/fc_vat_enable_compat_plugin_plugin_slug\)\./,
  );
  assert.doesNotMatch(withExample, /import HookExample/);
  assert.doesNotMatch(withExample, /related_hooks/);

  const plain = renderHookPage(settingsHook.hook, {
    normalizedName: settingsHook.name,
    slug: settingsHook.slug,
    plugin: {repository: null},
  });
  assert.doesNotMatch(plain, /## Examples/);
});

test('links related hooks back to the main example without copying the snippet', () => {
  const loaded = new Map([
    ['fc_vat_number_field_args', {
      relatedHooks: ['fc_vat_is_vat_number_field', 'fc_vat_is_vat_number_field', 'fc_vat_number_field_args'],
      body: 'Change the label.\n\n```php\n$args["label"] = "EU VAT number";\n```',
      fileName: 'fc_vat_number_field_args.md',
    }],
  ]);
  const sections = resolveExampleSections(
    {id: 'eu-vat'},
    [fieldHook, isFieldHook, settingsHook],
    loaded,
  );

  assert.match(sections.get('fc_vat_number_field_args').body, /Change the label/);
  assert.deepEqual(sections.get('fc_vat_number_field_args').seeAlso, []);
  assert.equal(sections.get('fc_vat_is_vat_number_field').body, null);
  assert.deepEqual(sections.get('fc_vat_is_vat_number_field').seeAlso, [
    {name: 'fc_vat_number_field_args', slug: 'fc_vat_number_field_args'},
  ]);
  assert.equal(sections.get('fc_vat_js_settings').body, null);
  assert.deepEqual(sections.get('fc_vat_js_settings').seeAlso, []);

  const relatedPage = renderHookPage(isFieldHook.hook, {
    normalizedName: isFieldHook.name,
    slug: isFieldHook.slug,
    plugin: {repository: null},
    exampleMarkdown: sections.get('fc_vat_is_vat_number_field').body,
    relatedExampleLinks: sections.get('fc_vat_is_vat_number_field').seeAlso,
  });
  assert.match(relatedPage, /## Examples\n\nSee example on \[`fc_vat_number_field_args`\]\(\.\/fc_vat_number_field_args\)\./);
  assert.doesNotMatch(relatedPage, /Change the label/);
  assert.doesNotMatch(relatedPage, /\$args\["label"\]/);
});

test('resolves a dynamic related hook by normalized name or by slug', () => {
  const dynamic = {
    name: 'fc_vat_enable_compat_plugin_{plugin_slug}',
    slug: 'fc_vat_enable_compat_plugin_plugin_slug',
    type: 'filter',
    summary: 'Compat.',
    hook: {type: 'filter', args: 1, file: 'fc-vat-assistant.php', doc: {description: 'Compat.', tags: []}},
  };
  const byName = resolveExampleSections({id: 'eu-vat'}, [fieldHook, dynamic], new Map([
    ['fc_vat_number_field_args', {
      relatedHooks: ['fc_vat_enable_compat_plugin_{plugin_slug}'],
      body: 'Snippet.',
      fileName: 'fc_vat_number_field_args.md',
    }],
  ]));
  assert.deepEqual(byName.get(dynamic.slug).seeAlso, [
    {name: 'fc_vat_number_field_args', slug: 'fc_vat_number_field_args'},
  ]);

  const bySlug = resolveExampleSections({id: 'eu-vat'}, [fieldHook, dynamic], new Map([
    ['fc_vat_number_field_args', {
      relatedHooks: ['fc_vat_enable_compat_plugin_plugin_slug'],
      body: 'Snippet.',
      fileName: 'fc_vat_number_field_args.md',
    }],
  ]));
  assert.deepEqual(bySlug.get(dynamic.slug).seeAlso, [
    {name: 'fc_vat_number_field_args', slug: 'fc_vat_number_field_args'},
  ]);
});

test('rejects a related hook that is not published', () => {
  assert.throws(
    () => resolveExampleSections({id: 'eu-vat'}, [fieldHook], new Map([
      ['fc_vat_number_field_args', {
        relatedHooks: ['woocommerce_checkout_fields'],
        body: 'Snippet.',
        fileName: 'fc_vat_number_field_args.md',
      }],
    ])),
    /related_hooks entry "woocommerce_checkout_fields"/,
  );
});

test('example files use the published slug, including a collision suffix', () => {
  const plugin = {id: 'eu-vat', pluginPrefix: 'fc_vat', hookPrefixes: ['fc_vat_']};
  const result = prepareHooks([
    {name: "'fc_vat_' . $foo", type: 'filter', doc: {description: 'Dynamic.'}},
    {name: 'fc_vat_foo', type: 'filter', doc: {description: 'Plain.'}},
  ], plugin);
  assert.deepEqual(result.hooks.map((hook) => [hook.name, hook.slug]), [
    ['fc_vat_{foo}', 'fc_vat_foo'],
    ['fc_vat_foo', 'fc_vat_foo-2'],
  ]);

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-example-slugs-'));
  const examplesDir = path.join(dir, 'examples', 'eu-vat');
  fs.mkdirSync(examplesDir, {recursive: true});
  fs.writeFileSync(path.join(examplesDir, 'fc_vat_foo.md'), 'Dynamic snippet.\n');
  fs.writeFileSync(path.join(examplesDir, 'fc_vat_foo-2.md'), 'Plain snippet.\n');

  const {loaded, unused} = loadHookExamples(examplesDir, result.hooks, 'eu-vat');
  assert.equal(unused.length, 0);
  const sections = resolveExampleSections(plugin, result.hooks, loaded);
  assert.equal(sections.get('fc_vat_foo').body, 'Dynamic snippet.');
  assert.equal(sections.get('fc_vat_foo-2').body, 'Plain snippet.');
});

test('moves an unpublished -N example file and related_hooks entry onto the unsuffixed hook', () => {
  const plugin = {id: 'lite', pluginPrefix: 'fc', hookPrefixes: ['fc_']};
  const result = prepareHooks([
    {name: 'fc_checkout_footer', file: 'inc/a.php', line: 1, type: 'action', doc: {description: 'First.'}},
    {name: 'fc_checkout_footer', file: 'inc/b.php', line: 2, type: 'action', doc: {description: 'Later.'}},
    {name: 'fc_checkout_header', file: 'inc/a.php', line: 3, type: 'action', doc: {description: 'Header.'}},
  ], plugin);
  assert.deepEqual(result.hooks.map((hook) => hook.slug), ['fc_checkout_footer', 'fc_checkout_header']);

  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-example-move-'));
  const examplesDir = path.join(dir, 'examples', 'lite');
  fs.mkdirSync(examplesDir, {recursive: true});
  fs.writeFileSync(path.join(examplesDir, 'fc_checkout_footer-2.md'), [
    '---',
    'related_hooks:',
    '  - fc_checkout_header-2',
    '---',
    'Footer snippet.',
    '',
  ].join('\n'));
  fs.writeFileSync(path.join(examplesDir, 'fc_checkout_header.md'), [
    '---',
    'related_hooks: [fc_checkout_footer-2]',
    '---',
    'Header snippet.',
    '',
  ].join('\n'));

  const moved = relocateUnpublishedSuffixExamples(examplesDir, result.hooks);
  assert.deepEqual(moved, [
    {from: 'fc_checkout_footer-2.md', to: 'fc_checkout_footer.md'},
    {from: 'fc_checkout_header.md', to: 'fc_checkout_header.md'},
  ]);
  assert.equal(fs.existsSync(path.join(examplesDir, 'fc_checkout_footer-2.md')), false);
  assert.match(fs.readFileSync(path.join(examplesDir, 'fc_checkout_footer.md'), 'utf8'), /fc_checkout_header\n/);
  assert.doesNotMatch(fs.readFileSync(path.join(examplesDir, 'fc_checkout_footer.md'), 'utf8'), /fc_checkout_header-2/);
  assert.match(fs.readFileSync(path.join(examplesDir, 'fc_checkout_header.md'), 'utf8'), /related_hooks: \[fc_checkout_footer\]/);

  const {loaded, unused} = loadHookExamples(examplesDir, result.hooks, 'lite');
  assert.deepEqual(unused, []);
  const sections = resolveExampleSections(plugin, result.hooks, loaded);
  assert.equal(sections.get('fc_checkout_footer').body, 'Footer snippet.');
  assert.deepEqual(sections.get('fc_checkout_header').seeAlso, [
    {name: 'fc_checkout_footer', slug: 'fc_checkout_footer'},
  ]);
});

test('regenerating hook pages leaves example files unchanged', () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-hook-docs-'));
  try {
    const plugin = {
      id: 'eu-vat',
      label: 'EU-VAT Assistant',
      pluginPrefix: 'fc_vat',
      hookPrefixes: ['fc_vat_'],
      repository: null,
    };
    const catalogExclusions = resolveHookExclusions({
      hookExcludePrefixes: ['fc_licenses_'],
      hookExcludeNames: [],
    });
    const prepared = prepareHooks([
      {name: 'fc_vat_number_field_args', type: 'filter', doc: {description: 'Field args.', tags: [{name: 'param', variable: '$args', types: ['array'], content: 'Args.'}]}},
      {name: 'fc_vat_is_vat_number_field', type: 'filter', doc: {description: 'Is VAT field.'}},
      {name: 'fc_vat_js_settings', type: 'filter', doc: {description: 'Script settings.'}},
      {name: 'fc_licenses_is_activated', type: 'filter', doc: {description: 'License.'}},
      {name: 'woocommerce_checkout_fields', type: 'filter', doc: {description: 'WooCommerce.'}},
    ], plugin, catalogExclusions).hooks;

    assert.deepEqual(prepared.map((hook) => hook.name), [
      'fc_vat_is_vat_number_field',
      'fc_vat_js_settings',
      'fc_vat_number_field_args',
    ]);

    const examplesDir = path.join(rootDir, 'examples', 'eu-vat');
    fs.mkdirSync(examplesDir, {recursive: true});
    const examplePath = path.join(examplesDir, 'fc_vat_number_field_args.md');
    const exampleSource = [
      '---',
      'related_hooks:',
      '  - fc_vat_is_vat_number_field',
      '---',
      '',
      'Change the label.',
      '',
      '```php',
      '$args["label"] = "EU VAT number";',
      '```',
      '',
    ].join('\n');
    fs.writeFileSync(examplePath, exampleSource);
    const skippedExample = path.join(examplesDir, 'fc_licenses_is_activated.md');
    const thirdPartyExample = path.join(examplesDir, 'woocommerce_checkout_fields.md');
    fs.writeFileSync(skippedExample, 'Do not publish.\n');
    fs.writeFileSync(thirdPartyExample, 'Third party.\n');
    const nestedDir = path.join(examplesDir, 'fc_vat_number_field_args');
    fs.mkdirSync(nestedDir, {recursive: true});
    const nestedExample = path.join(nestedDir, 'index.md');
    fs.writeFileSync(nestedExample, 'Old nested example.\n');

    const hooksDir = path.join(rootDir, 'docs', 'eu-vat', 'hooks');
    fs.mkdirSync(hooksDir, {recursive: true});
    const stalePage = path.join(hooksDir, 'fc_vat_removed.md');
    fs.writeFileSync(stalePage, 'stale\n');
    const keepNote = path.join(hooksDir, 'keep.txt');
    fs.writeFileSync(keepNote, 'keep\n');

    const before = {
      example: fs.readFileSync(examplePath),
      exampleMtime: fs.statSync(examplePath).mtimeMs,
      skipped: fs.readFileSync(skippedExample),
      thirdParty: fs.readFileSync(thirdPartyExample),
      nested: fs.readFileSync(nestedExample),
    };

    const written = writePluginDocs(rootDir, plugin, prepared);
    writePluginDocs(rootDir, plugin, prepared);

    assert.deepEqual(fs.readFileSync(examplePath), before.example);
    assert.equal(fs.statSync(examplePath).mtimeMs, before.exampleMtime);
    assert.deepEqual(fs.readFileSync(skippedExample), before.skipped);
    assert.deepEqual(fs.readFileSync(thirdPartyExample), before.thirdParty);
    assert.deepEqual(fs.readFileSync(nestedExample), before.nested);
    assert.equal(fs.existsSync(stalePage), false);
    assert.equal(fs.readFileSync(keepNote, 'utf8'), 'keep\n');

    const mainPage = fs.readFileSync(path.join(hooksDir, 'fc_vat_number_field_args.md'), 'utf8');
    const relatedPage = fs.readFileSync(path.join(hooksDir, 'fc_vat_is_vat_number_field.md'), 'utf8');
    const settingsPage = fs.readFileSync(path.join(hooksDir, 'fc_vat_js_settings.md'), 'utf8');
    assert.match(mainPage, /## Source[\s\S]*## Examples\n\nChange the label\./);
    assert.match(mainPage, /\$args\["label"\] = "EU VAT number"/);
    assert.doesNotMatch(mainPage, /related_hooks/);
    assert.match(relatedPage, /See example on \[`fc_vat_number_field_args`\]\(\.\/fc_vat_number_field_args\)\./);
    assert.doesNotMatch(relatedPage, /Change the label/);
    assert.doesNotMatch(settingsPage, /## Examples/);
    assert.equal(fs.existsSync(path.join(hooksDir, 'fc_licenses_is_activated.md')), false);
    assert.equal(fs.existsSync(path.join(hooksDir, 'woocommerce_checkout_fields.md')), false);

    assert.deepEqual(formatExampleLog(plugin, written), [
      'Included 1 example file for eu-vat:',
      '  - examples/eu-vat/fc_vat_number_field_args.md',
      'Related example links for eu-vat:',
      '  - fc_vat_is_vat_number_field -> fc_vat_number_field_args',
      'Left 2 unused example files for eu-vat (no matching published hook; not modified):',
      '  - examples/eu-vat/fc_licenses_is_activated.md',
      '  - examples/eu-vat/woocommerce_checkout_fields.md',
    ]);
  } finally {
    fs.rmSync(rootDir, {recursive: true, force: true});
  }
});

test('a bad related hook fails before generated pages are replaced', () => {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fc-hook-docs-bad-'));
  try {
    const plugin = {id: 'eu-vat', label: 'EU-VAT Assistant', repository: null};
    const examplesDir = path.join(rootDir, 'examples', 'eu-vat');
    fs.mkdirSync(examplesDir, {recursive: true});
    const examplePath = path.join(examplesDir, 'fc_vat_js_settings.md');
    fs.writeFileSync(examplePath, '---\nrelated_hooks:\n  - missing_hook\n---\n\nSnippet.\n');
    const hooksDir = path.join(rootDir, 'docs', 'eu-vat', 'hooks');
    fs.mkdirSync(hooksDir, {recursive: true});
    const existing = path.join(hooksDir, 'fc_vat_js_settings.md');
    fs.writeFileSync(existing, 'previous page\n');

    assert.throws(
      () => writePluginDocs(rootDir, plugin, [settingsHook]),
      /related_hooks entry "missing_hook"/,
    );
    assert.equal(fs.readFileSync(examplePath, 'utf8'), '---\nrelated_hooks:\n  - missing_hook\n---\n\nSnippet.\n');
    assert.equal(fs.readFileSync(existing, 'utf8'), 'previous page\n');
  } finally {
    fs.rmSync(rootDir, {recursive: true, force: true});
  }
});

test('live eu-vat examples attach to the published hooks', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const plugin = catalog.plugins.find((entry) => entry.id === 'eu-vat');
  const actions = JSON.parse(fs.readFileSync(path.join(root, 'data/eu-vat/actions.json'), 'utf8'));
  const filters = JSON.parse(fs.readFileSync(path.join(root, 'data/eu-vat/filters.json'), 'utf8'));
  const result = prepareHooks(
    [...actions.hooks, ...filters.hooks],
    plugin,
    resolveHookExclusions(catalog),
  );
  const examplesDir = path.join(root, 'examples', 'eu-vat');
  const {loaded, unused} = loadHookExamples(examplesDir, result.hooks, 'eu-vat');
  const sections = resolveExampleSections(plugin, result.hooks, loaded);

  const fieldPath = path.join(examplesDir, 'fc_vat_number_field_args.md');
  const field = parseExampleMarkdown(fs.readFileSync(fieldPath, 'utf8'));
  assert.equal(unused.length, 0);
  assert.deepEqual(field.relatedHooks, []);
  assert.match(field.body, /add_filter\( 'fc_vat_number_field_args'/);
  assert.match(field.body, /Tax ID Number/);
  assert.match(field.body, /@param array \$args VAT number field arguments\./);
  assert.doesNotMatch(field.body, /fc_vat_is_vat_number_field/);
  assert.equal(sections.get('fc_vat_number_field_args').body, field.body);
  assert.deepEqual(sections.get('fc_vat_number_field_args').seeAlso, []);

  const isFieldPath = path.join(examplesDir, 'fc_vat_is_vat_number_field.md');
  const isField = parseExampleMarkdown(fs.readFileSync(isFieldPath, 'utf8'));
  assert.deepEqual(isField.relatedHooks, []);
  assert.match(isField.body, /billing_tax_id/);
  assert.match(isField.body, /billing_vat_number/);
  assert.match(isField.body, /10,\n {4}2/);
  assert.equal(sections.get('fc_vat_is_vat_number_field').body, isField.body);
  assert.deepEqual(sections.get('fc_vat_is_vat_number_field').seeAlso, []);

  for (const hook of result.hooks) {
    const filePath = path.join(examplesDir, `${hook.slug}.md`);
    if (!fs.existsSync(filePath)) {
      assert.equal(sections.get(hook.slug).body, null);
      assert.deepEqual(sections.get(hook.slug).seeAlso, []);
      continue;
    }
    const parsed = parseExampleMarkdown(fs.readFileSync(filePath, 'utf8'));
    assert.equal(sections.get(hook.slug).body, parsed.body);
    assert.ok(loaded.has(hook.slug));
  }
});
