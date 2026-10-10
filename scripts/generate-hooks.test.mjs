import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import {fileURLToPath} from 'node:url';
import {
  formatHookFilterLog,
  matchesHookPrefix,
  prepareHooks,
} from './generate-hooks.mjs';
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
  assert.match(index, /fc_checkout_steps/);
  assert.match(index, /fc_pro_enable_compat_plugin_\{plugin_slug\}/);
  assert.doesNotMatch(index, /woocommerce_checkout_fields/);
  assert.doesNotMatch(index, /woocommerce_\{action\}/);
  assert.doesNotMatch(index, /wc_od_delivery_date/);
  assert.match(sidebar, /fc_pro_checkout_steps/);
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
    exampleImport: null,
  });
  assert.match(page, /`fc_pro_enable_compat_plugin_woocommerce-gateway`/);
  assert.match(page, /`fc_\{section\}`/);
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

  assert.equal(lines[0], 'Skipped 3 hooks for pro (hookPrefixes: fc_pro_, fc_):');
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

test('eu-vat fixture keeps all 16 fc_vat_ hooks and drops nothing', () => {
  const catalog = JSON.parse(fs.readFileSync(path.join(root, 'plugins.json'), 'utf8'));
  const plugin = catalog.plugins.find((entry) => entry.id === 'eu-vat');
  const actions = JSON.parse(fs.readFileSync(path.join(root, 'data/eu-vat/actions.json'), 'utf8'));
  const filters = JSON.parse(fs.readFileSync(path.join(root, 'data/eu-vat/filters.json'), 'utf8'));
  const sidebar = JSON.parse(fs.readFileSync(path.join(root, 'sidebars/eu-vat.hooks.json'), 'utf8'));
  const result = prepareHooks([...actions.hooks, ...filters.hooks], plugin);

  assert.deepEqual(plugin.hookPrefixes, ['fc_vat_']);
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
