import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {
  formatHookFilterLog,
  matchesHookPrefix,
  prepareHooks,
  resolveHookExclusions,
} from './generate-hooks.mjs';
import {readHooksIntro, rewriteIntroImagePaths, stripFrontMatter} from './hooks-intro.mjs';
import {renderHookPage, renderHooksIndex, renderSidebarItems} from './render-hook.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/fixtures/hook-prefix-allowlist.json'), 'utf8'),
);

/**
 * @param {{hooks: object[]}} pluginFixture
 */
function sourceHooks(pluginFixture) {
  return pluginFixture.hooks.map((hook) => {
    const {expect, normalized, keptAliases, droppedAliases, ...source} = hook;
    return source;
  });
}

test('matches hook prefixes only at the start of the normalized name', () => {
  assert.equal(matchesHookPrefix('fc_checkout_steps', ['fc_']), true);
  assert.equal(matchesHookPrefix('fc_pro_checkout_steps', ['fc_pro_', 'fc_']), true);
  assert.equal(matchesHookPrefix('fc_pro_checkout_steps', ['fc_']), true);
  assert.equal(matchesHookPrefix('fc_adb_is_entry_delete_enabled', ['fc_adb_']), true);
  assert.equal(matchesHookPrefix('fc_adb_enable_compat_plugin_{plugin_slug}', ['fc_adb_']), true);
  assert.equal(matchesHookPrefix('fc_gaa_google_autocomplete_js_settings', ['fc_gaa_']), true);
  assert.equal(matchesHookPrefix('fc_gaa_enable_compat_theme_{theme_slug}', ['fc_gaa_']), true);
  assert.equal(matchesHookPrefix('fc_adb_is_entry_delete_enabled', ['fc_pro_']), false);
  assert.equal(matchesHookPrefix('fc_gaa_settings', ['fc_pro_']), false);
  assert.equal(matchesHookPrefix('fc_vat_admin_notices', ['fc_vat_']), true);
  assert.equal(matchesHookPrefix('woocommerce_checkout_fields', ['fc_vat_']), false);
  assert.equal(matchesHookPrefix('fc_checkout_steps', ['fc_vat_']), false);
  assert.equal(matchesHookPrefix('facebook_pixel', ['fc_']), false);
  assert.equal(matchesHookPrefix('', ['fc_']), false);
  assert.equal(matchesHookPrefix('fc_checkout_steps', ['']), false);
});

test('keeps fc_ and fc_pro_ hooks and skips WooCommerce and other third-party names', () => {
  const plugin = fixture.pro;
  const result = prepareHooks(sourceHooks(plugin), plugin);
  const kept = plugin.hooks.filter((hook) => hook.expect === 'keep');
  const skipped = plugin.hooks.filter((hook) => hook.expect === 'skip');

  assert.deepEqual(
    result.hooks.map((hook) => hook.name),
    kept.map((hook) => hook.normalized).sort((a, b) => a.replace(/[{}]/g, '').localeCompare(b.replace(/[{}]/g, ''))),
  );
  assert.deepEqual(
    result.skipped.map((hook) => hook.name),
    skipped.map((hook) => hook.normalized),
  );
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_checkout_steps'));
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_pro_checkout_steps'));
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_pro_enable_compat_plugin_{plugin_slug}'));
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_pro_admin_notices'));
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_adb_is_entry_delete_enabled'));
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_adb_enable_compat_plugin_{plugin_slug}'));
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_gaa_google_autocomplete_js_settings'));
  assert.ok(result.hooks.some((hook) => hook.name === 'fc_gaa_enable_compat_theme_{theme_slug}'));
  assert.equal(result.skipped.some((hook) => hook.name.startsWith('woocommerce_')), true);

  const index = renderHooksIndex(
    result.hooks.map((hook) => ({
      name: hook.name,
      slug: hook.slug,
      type: hook.type,
      summary: hook.summary,
    })),
    'Fluid Checkout PRO',
  );
  const sidebar = JSON.stringify(renderSidebarItems(result.hooks));
  assert.match(index, /- \[`fc_checkout_steps`\]\(\.\/fc_checkout_steps\) Filters the checkout steps\./);
  assert.match(index, /fc_pro_enable_compat_plugin_\{plugin_slug\}/);
  assert.doesNotMatch(index, /\| Hook \| Description \|/);
  assert.match(index, /fc_adb_enable_compat_plugin_\{plugin_slug\}/);
  assert.match(index, /fc_gaa_google_autocomplete_js_settings/);
  assert.doesNotMatch(index, /woocommerce_checkout_fields/);
  assert.doesNotMatch(index, /woocommerce_\{action\}/);
  assert.doesNotMatch(index, /wc_od_delivery_date/);
  assert.match(sidebar, /fc_pro_checkout_steps/);
  assert.match(sidebar, /fc_adb_is_entry_delete_enabled/);
  assert.match(sidebar, /fc_gaa_enable_compat_theme_theme_slug/);
  assert.doesNotMatch(sidebar, /woocommerce_checkout_fields/);
  assert.doesNotMatch(sidebar, /wc_od_delivery_date/);
});

test('drops aliases that do not match the prefix, including after alias normalization', () => {
  const plugin = fixture.pro;
  const result = prepareHooks(sourceHooks(plugin), plugin);
  const dynamic = result.hooks.find((hook) => hook.name === 'fc_pro_enable_compat_plugin_{plugin_slug}');
  const spec = plugin.hooks.find((hook) => hook.normalized === dynamic.name);

  assert.deepEqual(dynamic.hook.aliases, spec.keptAliases);
  assert.deepEqual(
    result.droppedAliases.map((alias) => alias.name),
    spec.droppedAliases,
  );

  const page = renderHookPage(dynamic.hook, {
    normalizedName: dynamic.name,
    slug: dynamic.slug,
    plugin: {repository: null},
  });
  assert.equal(page.includes('**Aliases:**'), false);
  assert.doesNotMatch(page, /fc_pro_enable_compat_plugin_woocommerce-gateway/);
  assert.doesNotMatch(page, /fc_\{section\}/);
  assert.doesNotMatch(page, /woocommerce_checkout_update_order_review/);
  assert.doesNotMatch(page, /enfold_layout/);
});

test('lite prefix fc_ keeps fc_ and fc_pro_ names and skips woocommerce_*', () => {
  const plugin = fixture.lite;
  const result = prepareHooks(sourceHooks(plugin), plugin);
  assert.deepEqual(
    result.hooks.map((hook) => hook.name).sort(),
    ['fc_checkout_steps', 'fc_pro_checkout_steps'],
  );
  assert.deepEqual(
    result.skipped.map((hook) => hook.name),
    ['woocommerce_cart_item_name'],
  );
});

test('eu-vat prefix keeps dynamic fc_vat_ names and skips woocommerce_* and bare fc_', () => {
  const plugin = fixture['eu-vat'];
  const result = prepareHooks(sourceHooks(plugin), plugin);
  assert.deepEqual(result.hooks.map((hook) => hook.name), [
    'fc_vat_admin_notices',
    'fc_vat_enable_compat_plugin_{plugin_slug}',
  ]);
  assert.deepEqual(result.skipped.map((hook) => hook.name), [
    'woocommerce_checkout_fields',
    'fc_checkout_steps',
  ]);

  const notices = result.hooks.find((hook) => hook.name === 'fc_vat_admin_notices');
  assert.deepEqual(notices.hook.aliases, ['fc_vat_admin_notices']);
  assert.deepEqual(result.droppedAliases.map((alias) => alias.name), ['woocommerce_admin_notices']);
});

test('logs skipped hook names and dropped aliases', () => {
  const plugin = fixture.pro;
  const result = prepareHooks(sourceHooks(plugin), plugin);
  const lines = formatHookFilterLog(plugin, result);

  assert.equal(lines[0], 'Skipped 3 hooks for pro (hookPrefixes: fc_pro_, fc_, fc_adb_, fc_gaa_):');
  assert.ok(lines.includes('  - woocommerce_checkout_fields'));
  assert.ok(lines.includes("  - woocommerce_{action} (from 'woocommerce_' . $action)"));
  assert.ok(lines.includes('  - wc_od_delivery_date'));
  assert.ok(lines.includes('Dropped 2 aliases for pro outside hookPrefixes:'));
  assert.ok(lines.includes('  - woocommerce_checkout_update_order_review (on fc_pro_enable_compat_plugin_{plugin_slug})'));
  assert.ok(lines.includes('  - enfold_layout (on fc_pro_enable_compat_plugin_{plugin_slug})'));
});

test('logs a zero skip count when every hook matches', () => {
  const plugin = {
    id: 'eu-vat',
    pluginPrefix: 'fc_vat',
    hookPrefixes: ['fc_vat_'],
  };
  const result = prepareHooks(
    [{name: 'fc_vat_js_settings', type: 'filter', doc: {description: 'Settings.'}}],
    plugin,
  );
  assert.deepEqual(formatHookFilterLog(plugin, result), [
    'Skipped 0 hooks for eu-vat (hookPrefixes: fc_vat_).',
  ]);
});

test('refuses to publish hooks when hookPrefixes is missing', () => {
  assert.throws(
    () => prepareHooks([{name: 'fc_checkout_steps', type: 'action'}], {id: 'lite'}),
    /hookPrefixes/,
  );
  assert.throws(
    () => prepareHooks([{name: 'fc_checkout_steps', type: 'action'}], {id: 'lite', hookPrefixes: []}),
    /hookPrefixes/,
  );
});

const internalLicenseNames = [
  'fc_admin_license_key_script_url',
  'fc_admin_license_key_style_url',
  'fc_admin_field_type_license_exists',
  'fc_show_settings_license_keys',
];

test('catalog hookExcludePrefixes skip fc_licenses_ after the allowlist', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const exclusions = resolveHookExclusions(catalog);
  assert.deepEqual(exclusions.prefixes, ['fc_licenses_', 'fc_lcs_']);
  assert.deepEqual(exclusions.names, internalLicenseNames);

  const licenseHooks = [
    {
      name: 'fc_licenses_is_activated',
      type: 'filter',
      doc: {description: 'Whether the license is active.'},
    },
    {
      name: "'fc_licenses_client_' . $action",
      type: 'action',
      doc: {description: 'Dynamic Fluid Licenses client hook.'},
    },
  ];

  const pro = catalog.plugins.find((entry) => entry.id === 'pro');
  const proHooks = [
    {name: 'fc_checkout_steps', type: 'action', doc: {description: 'Checkout steps.'}},
    {
      name: 'fc_pro_checkout_steps',
      type: 'filter',
      doc: {description: 'PRO checkout steps.'},
      aliases: ['fc_pro_checkout_steps_extra', 'fc_licenses_activated', "'fc_licenses_' . $status"],
    },
    ...licenseHooks,
    {name: 'woocommerce_checkout_fields', type: 'filter', doc: {description: 'WooCommerce checkout fields.'}},
  ];
  const keptWithoutExclusion = prepareHooks(licenseHooks, pro);
  assert.deepEqual(keptWithoutExclusion.hooks.map((hook) => hook.name), [
    'fc_licenses_client_{action}',
    'fc_licenses_is_activated',
  ]);

  const proResult = prepareHooks(proHooks, pro, exclusions);
  assert.deepEqual(proResult.hooks.map((hook) => hook.name), [
    'fc_checkout_steps',
    'fc_pro_checkout_steps',
  ]);
  assert.deepEqual(proResult.skipped.map((hook) => hook.name), [
    'fc_licenses_is_activated',
    'fc_licenses_client_{action}',
    'woocommerce_checkout_fields',
  ]);
  const proSteps = proResult.hooks.find((hook) => hook.name === 'fc_pro_checkout_steps');
  assert.deepEqual(proSteps.hook.aliases, ['fc_pro_checkout_steps_extra']);
  assert.deepEqual(proResult.droppedAliases.map((alias) => alias.name), [
    'fc_licenses_activated',
    'fc_licenses_{status}',
  ]);

  const index = renderHooksIndex(
    proResult.hooks.map((hook) => ({
      name: hook.name,
      slug: hook.slug,
      type: hook.type,
      summary: hook.summary,
    })),
    'Fluid Checkout PRO',
  );
  const sidebar = JSON.stringify(renderSidebarItems(proResult.hooks));
  assert.doesNotMatch(index, /fc_licenses_/);
  assert.doesNotMatch(sidebar, /fc_licenses_/);

  const lines = formatHookFilterLog(pro, proResult);
  assert.equal(
    lines[0],
    'Skipped 3 hooks for pro (hookPrefixes: fc_pro_, fc_, fc_adb_, fc_gaa_; hookExcludePrefixes: fc_licenses_, fc_lcs_; hookExcludeNames: fc_admin_license_key_script_url, fc_admin_license_key_style_url, fc_admin_field_type_license_exists, fc_show_settings_license_keys):',
  );
  assert.ok(lines.includes('  - fc_licenses_is_activated'));
  assert.ok(lines.includes("  - fc_licenses_client_{action} (from 'fc_licenses_client_' . $action)"));
  assert.ok(lines.includes('  - woocommerce_checkout_fields'));
  assert.ok(lines.includes('Dropped 2 aliases for pro outside hookPrefixes or matching hookExcludePrefixes or matching hookExcludeNames:'));
  assert.ok(lines.includes('  - fc_licenses_activated (on fc_pro_checkout_steps)'));
  assert.ok(lines.includes("  - fc_licenses_{status} (from 'fc_licenses_' . $status) (on fc_pro_checkout_steps)"));

  const lite = catalog.plugins.find((entry) => entry.id === 'lite');
  const liteResult = prepareHooks(
    [
      {name: 'fc_checkout_steps', type: 'action', doc: {description: 'Checkout steps.'}},
      ...licenseHooks,
    ],
    lite,
    exclusions,
  );
  assert.deepEqual(liteResult.hooks.map((hook) => hook.name), ['fc_checkout_steps']);
  assert.deepEqual(liteResult.skipped.map((hook) => hook.name), [
    'fc_licenses_is_activated',
    'fc_licenses_client_{action}',
  ]);

  const euVat = catalog.plugins.find((entry) => entry.id === 'eu-vat');
  const euVatResult = prepareHooks(
    [
      {name: 'fc_vat_js_settings', type: 'filter', doc: {description: 'Script settings.'}},
      ...licenseHooks,
    ],
    euVat,
    exclusions,
  );
  assert.deepEqual(euVatResult.hooks.map((hook) => hook.name), ['fc_vat_js_settings']);
  assert.deepEqual(euVatResult.skipped.map((hook) => hook.name), [
    'fc_licenses_is_activated',
    'fc_licenses_client_{action}',
  ]);
  const euVatLines = formatHookFilterLog(euVat, euVatResult);
  assert.equal(
    euVatLines[0],
    'Skipped 2 hooks for eu-vat (hookPrefixes: fc_vat_; hookExcludePrefixes: fc_licenses_, fc_lcs_; hookExcludeNames: fc_admin_license_key_script_url, fc_admin_license_key_style_url, fc_admin_field_type_license_exists, fc_show_settings_license_keys):',
  );
  assert.ok(euVatLines.includes('  - fc_licenses_is_activated'));
});

test('catalog exclusions skip fc_lcs_ prefixes and internal license hook names', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const exclusions = resolveHookExclusions(catalog);
  const pro = catalog.plugins.find((entry) => entry.id === 'pro');
  const lite = catalog.plugins.find((entry) => entry.id === 'lite');
  const euVat = catalog.plugins.find((entry) => entry.id === 'eu-vat');
  const internalHooks = [
    ...internalLicenseNames.map((name) => ({
      name,
      type: 'filter',
      doc: {description: `Internal ${name}.`},
    })),
    {name: 'fc_lcs_is_activated', type: 'filter', doc: {description: 'Short Fluid Licenses prefix.'}},
    {name: "'fc_lcs_client_' . $action", type: 'action', doc: {description: 'Dynamic short Fluid Licenses prefix.'}},
  ];

  const keptWithoutExclusion = prepareHooks(
    [
      {name: 'fc_lcs_is_activated', type: 'filter', doc: {description: 'Short prefix.'}},
      {name: 'fc_show_settings_license_keys', type: 'filter', doc: {description: 'License settings.'}},
      {name: 'fc_admin_license_key_script_url_custom', type: 'filter', doc: {description: 'Not the exact internal name.'}},
    ],
    pro,
  );
  assert.deepEqual(keptWithoutExclusion.hooks.map((hook) => hook.name), [
    'fc_admin_license_key_script_url_custom',
    'fc_lcs_is_activated',
    'fc_show_settings_license_keys',
  ]);

  const proResult = prepareHooks(
    [
      {
        name: 'fc_checkout_steps',
        type: 'action',
        doc: {description: 'Checkout steps.'},
        aliases: [
          'fc_checkout_steps_extra',
          'fc_lcs_activated',
          'fc_show_settings_license_keys',
          'fc_admin_license_key_script_url_custom',
        ],
      },
      ...internalHooks,
    ],
    pro,
    exclusions,
  );
  assert.deepEqual(proResult.hooks.map((hook) => hook.name), ['fc_checkout_steps']);
  assert.deepEqual(proResult.hooks[0].hook.aliases, [
    'fc_checkout_steps_extra',
    'fc_admin_license_key_script_url_custom',
  ]);
  for (const name of [...internalLicenseNames, 'fc_lcs_is_activated', 'fc_lcs_client_{action}']) {
    assert.ok(proResult.skipped.some((hook) => hook.name === name), `pro skipped ${name}`);
  }
  assert.deepEqual(proResult.droppedAliases.map((alias) => alias.name), [
    'fc_lcs_activated',
    'fc_show_settings_license_keys',
  ]);

  const index = renderHooksIndex(
    proResult.hooks.map((hook) => ({
      name: hook.name,
      slug: hook.slug,
      type: hook.type,
      summary: hook.summary,
    })),
    'Fluid Checkout PRO',
  );
  const sidebar = JSON.stringify(renderSidebarItems(proResult.hooks));
  assert.match(index, /fc_checkout_steps/);
  assert.doesNotMatch(index, /fc_lcs_/);
  assert.doesNotMatch(index, /fc_show_settings_license_keys/);
  assert.doesNotMatch(index, /fc_admin_license_key_script_url/);
  assert.doesNotMatch(sidebar, /fc_lcs_/);
  assert.doesNotMatch(sidebar, /fc_show_settings_license_keys/);
  assert.doesNotMatch(sidebar, /fc_admin_field_type_license_exists/);

  const lines = formatHookFilterLog(pro, proResult);
  assert.match(lines[0], /hookExcludePrefixes: fc_licenses_, fc_lcs_/);
  assert.match(lines[0], /fc_admin_license_key_script_url, fc_admin_license_key_style_url, fc_admin_field_type_license_exists, fc_show_settings_license_keys/);
  assert.ok(lines.includes('  - fc_lcs_is_activated'));
  assert.ok(lines.includes("  - fc_lcs_client_{action} (from 'fc_lcs_client_' . $action)"));
  assert.ok(lines.includes('  - fc_show_settings_license_keys'));
  assert.ok(lines.includes('  - fc_lcs_activated (on fc_checkout_steps)'));
  assert.ok(lines.includes('  - fc_show_settings_license_keys (on fc_checkout_steps)'));

  for (const plugin of [lite, euVat]) {
    const keptName = plugin.id === 'eu-vat' ? 'fc_vat_js_settings' : 'fc_checkout_steps';
    const result = prepareHooks(
      [
        {name: keptName, type: 'filter', doc: {description: 'Kept hook.'}},
        ...internalHooks,
      ],
      plugin,
      exclusions,
    );
    assert.deepEqual(result.hooks.map((hook) => hook.name), [keptName]);
    for (const name of [...internalLicenseNames, 'fc_lcs_is_activated', 'fc_lcs_client_{action}']) {
      assert.ok(result.skipped.some((hook) => hook.name === name), `${plugin.id} skipped ${name}`);
    }
  }
});

test('eu-vat fixture keeps all 16 fc_vat_ hooks and drops nothing', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const plugin = catalog.plugins.find((entry) => entry.id === 'eu-vat');
  const actions = JSON.parse(fs.readFileSync(path.join(root, 'data/eu-vat/actions.json'), 'utf8'));
  const filters = JSON.parse(fs.readFileSync(path.join(root, 'data/eu-vat/filters.json'), 'utf8'));
  const sidebar = JSON.parse(fs.readFileSync(path.join(root, 'sidebars/eu-vat.hooks.json'), 'utf8'));
  const result = prepareHooks(
    [...actions.hooks, ...filters.hooks],
    plugin,
    resolveHookExclusions(catalog),
  );

  assert.deepEqual(plugin.hookPrefixes, ['fc_vat_']);
  const pro = catalog.plugins.find((entry) => entry.id === 'pro');
  assert.deepEqual(pro.hookPrefixes, ['fc_pro_', 'fc_', 'fc_adb_', 'fc_gaa_']);
  assert.deepEqual(fixture.pro.hookPrefixes, pro.hookPrefixes);
  assert.equal(result.skipped.length, 0);
  assert.equal(result.droppedAliases.length, 0);
  assert.equal(result.hooks.length, 16);
  assert.ok(result.hooks.every((hook) => hook.name.startsWith('fc_vat_')));

  const sidebarLabels = sidebar
    .flatMap((item) => (Array.isArray(item.items) ? item.items : []))
    .map((item) => item.label);
  assert.deepEqual(
    result.hooks.map((hook) => hook.name),
    sidebarLabels,
  );

  const compat = result.hooks.find((hook) => hook.name === 'fc_vat_enable_compat_plugin_{plugin_slug}');
  assert.ok(compat.hook.aliases.includes('fc_vat_enable_compat_plugin_woocommerce-germanized-pro'));
  assert.ok(compat.hook.aliases.includes('fc_vat_enable_compat_plugin_woocommerce-checkout-field-editor-pro'));
});

test('hooks index places the hand-written intro above the hook list', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const intro = readHooksIntro('eu-vat', root);
  const liteIntro = readHooksIntro('lite', root);
  const proIntro = readHooksIntro('pro', root);
  assert.match(intro, /^## Getting started with EU-VAT Assistant hooks\n/);
  assert.match(intro, /@site\/hooks-intro\/eu-vat\/img\/hooks-overview\.svg/);
  assert.match(intro, /\]\(#filters\)/);
  assert.match(intro, /fc_vat_enable_compat_plugin_\{plugin_slug\}/);
  assert.match(intro, /fc_vat_enable_compat_plugin_\{\$plugin_slug\}/);
  assert.doesNotMatch(intro, /\{'\{'\}/);
  assert.doesNotMatch(intro, /\]\(\/eu-vat\/hooks\)/);

  assert.match(liteIntro, /\[actions\]\(#actions\)/);
  assert.match(liteIntro, /\[filters\]\(#filters\)/);
  assert.match(liteIntro, /fc_proceed_to_next_step_button_label/);
  assert.match(liteIntro, /fc_checkout_before_steps/);
  assert.match(liteIntro, /add_filter\( 'fc_proceed_to_next_step_button_label', function\( \$button_label, \$step_id, \$step_args \) \{\n    return __\( 'Continue', 'my-store' \);\n\}, 10, 3 \);/);
  assert.doesNotMatch(liteIntro, /\]\(\/lite\/hooks\)/);

  assert.match(proIntro, /\[actions\]\(#actions\)/);
  assert.match(proIntro, /\[filters\]\(#filters\)/);
  assert.match(proIntro, /fc_pro_cart_action_label_continue_shopping/);
  assert.match(proIntro, /fc_pro_order_received_successful/);
  assert.match(proIntro, /`fc_adb_`/);
  assert.match(proIntro, /`fc_gaa_`/);
  assert.match(proIntro, /alongside Fluid Checkout Lite/);
  assert.doesNotMatch(proIntro, /\]\(\/pro\/hooks\)/);
  assert.doesNotMatch(`${liteIntro}\n${proIntro}`, /fc_licenses|Fluid Licenses/);

  const source = fs.readFileSync(path.join(root, 'hooks-intro/eu-vat/index.md'), 'utf8');
  assert.match(source, /\]\(\.\/img\/hooks-overview\.svg\)/);
  assert.equal(fs.existsSync(path.join(root, 'hooks-intro/eu-vat/img/hooks-overview.svg')), true);
  assert.equal(fs.existsSync(path.join(root, 'docs/eu-vat/guides/getting-started/index.md')), false);

  const index = renderHooksIndex(
    [
      {name: 'fc_vat_admin_notices', slug: 'fc_vat_admin_notices', type: 'action', summary: 'Notices.'},
      {name: 'fc_vat_js_settings', slug: 'fc_vat_js_settings', type: 'filter', summary: 'Settings.'},
    ],
    'EU-VAT Assistant',
    intro,
  );
  assert.match(index, /title: "All hooks — EU-VAT Assistant"/);
  assert.match(index, /sidebar_label: All hooks/);
  const heading = index.indexOf('# All hooks');
  const introHeading = index.indexOf('## Getting started with EU-VAT Assistant hooks');
  const body = index.slice(heading);
  const listSentence = body.indexOf('Actions and filters in EU-VAT Assistant.');
  const actions = body.indexOf('## Actions');
  const filters = body.indexOf('## Filters');
  assert.ok(heading > 0 && introHeading > heading && listSentence > 0 && actions > listSentence && filters > actions);

  const plain = renderHooksIndex(
    [{name: 'fc_vat_js_settings', slug: 'fc_vat_js_settings', type: 'filter', summary: 'Settings.'}],
    'EU-VAT Assistant',
  );
  assert.match(plain, /title: "All hooks — EU-VAT Assistant"/);
  assert.match(plain, /# All hooks/);
  assert.match(plain, /- \[`fc_vat_js_settings`\]\(\.\/fc_vat_js_settings\) Settings\./);
  assert.doesNotMatch(plain, /Getting started with EU-VAT Assistant hooks/);

  const unnamed = renderHooksIndex(
    [{name: 'fc_checkout_steps', slug: 'fc_checkout_steps', type: 'action', summary: ''}],
    'Fluid Checkout Lite',
  );
  assert.match(unnamed, /- \[`fc_checkout_steps`\]\(\.\/fc_checkout_steps\)\n/);
  assert.doesNotMatch(unnamed, /fc_checkout_steps fc_checkout_steps/);
});

test('long descriptions render docblock lists as one item per line', () => {
  const pageFor = (doc, name) =>
    renderHookPage(
      {type: 'filter', args: 1, doc},
      {normalizedName: name, slug: name, plugin: {repository: null}},
    );

  const hookNames = pageFor(
    {
      description: 'Filters the toggle label of an expansible section.',
      long_description:
        'The dynamic portion of the hook name, `$section_id`, refers to the expansible section ID. Possible hook names include:\n - `fc_expansible_section_toggle_label_coupon_code` - `fc_expansible_section_toggle_label_gift_card`',
      long_description_html:
        '<p>The dynamic portion of the hook name, <code>$section_id</code>, refers to the expansible section ID. Possible hook names include:</p> <ul> <li><code>fc_expansible_section_toggle_label_coupon_code</code></li> <li><code>fc_expansible_section_toggle_label_gift_card</code></li> </ul>',
    },
    'fc_expansible_section_toggle_label_{section_id}',
  );
  assert.match(
    hookNames,
    /- `fc_expansible_section_toggle_label_coupon_code`\n- `fc_expansible_section_toggle_label_gift_card`/,
  );
  assert.doesNotMatch(hookNames, /coupon_code` - `fc_expansible/);

  const keys = pageFor(
    {
      description: 'Filters the JavaScript settings.',
      long_description:
        'Default keys:\n\n  - `ajaxUrl` (string) Admin AJAX URL.\n  - `validateVatNonce` (string) Nonce for the action.',
      long_description_html:
        '<p>Default keys:</p> <ul> <li><code>ajaxUrl</code> (string) Admin AJAX URL.</li> <li><code>validateVatNonce</code> (string) Nonce for the action.</li> </ul>',
    },
    'fc_vat_js_settings',
  );
  assert.match(keys, /- `ajaxUrl` \(string\) Admin AJAX URL\.\n- `validateVatNonce` \(string\) Nonce for the action\./);

  const collapsed = pageFor(
    {
      description: 'Lists the steps.',
      long_description: 'Steps:\n - First step - Second step - Third step',
    },
    'fc_checkout_steps',
  );
  assert.match(collapsed, /- First step\n- Second step\n- Third step/);

  const prose = pageFor(
    {
      description: 'Keeps a sentence.',
      long_description: 'Keep this sentence - it is not a list.',
    },
    'fc_checkout_steps',
  );
  assert.match(prose, /Keep this sentence - it is not a list\./);
  assert.doesNotMatch(prose, /^- Keep this sentence/m);
});

test('intro image rewrite skips fenced code and absolute links', () => {
  const markdown = [
    '---',
    'title: Ignored',
    '---',
    '',
    '![Diagram](./img/hooks-overview.svg)',
    '',
    '```md',
    '![Not an image](./img/hooks-overview.svg)',
    '```',
    '',
    '[hooks](/eu-vat/hooks)',
  ].join('\n');
  assert.match(stripFrontMatter(markdown).trim(), /^!\[Diagram\]/);
  assert.doesNotMatch(stripFrontMatter(markdown), /^---/);
  const rewritten = rewriteIntroImagePaths(
    stripFrontMatter(markdown),
    '/repo/hooks-intro/eu-vat',
    '/repo',
  );
  assert.match(rewritten, /!\[Diagram\]\(@site\/hooks-intro\/eu-vat\/img\/hooks-overview\.svg\)/);
  assert.match(rewritten, /```md\n!\[Not an image\]\(\.\/img\/hooks-overview\.svg\)\n```/);
  assert.match(rewritten, /\(\/eu-vat\/hooks\)/);
});
