import assert from 'node:assert/strict';
import test from 'node:test';
import {normalizeHookName, slugifyHookName} from './normalize-hook-name.mjs';
import {buildSignature, escapeMdx, renderHookPage, sourceLocation} from './render-hook.mjs';

const prefix = 'fc_vat';

test('normalizes a quoted concatenation with a variable suffix', () => {
  assert.equal(
    normalizeHookName("'fc_vat_enable_compat_plugin_' . $plugin_slug", prefix),
    'fc_vat_enable_compat_plugin_{plugin_slug}',
  );
});

test('normalizes a concatenation whose outer quotes were stripped', () => {
  assert.equal(
    normalizeHookName("fc_vat_' . $current_section . '_settings", prefix),
    'fc_vat_{current_section}_settings',
  );
});

test('normalizes the same concatenation when outer quotes are still present', () => {
  assert.equal(
    normalizeHookName("'fc_vat_' . $current_section . '_settings'", prefix),
    'fc_vat_{current_section}_settings',
  );
});

test('replaces self::$plugin_prefix with the configured prefix', () => {
  assert.equal(
    normalizeHookName("self::$plugin_prefix . '_admin_notices'", prefix),
    'fc_vat_admin_notices',
  );
});

test('replaces a class static plugin prefix', () => {
  assert.equal(
    normalizeHookName("FluidCheckout_EU_VAT::$plugin_prefix . '_init'", prefix),
    'fc_vat_init',
  );
});

test('leaves a plain hook name unchanged and strips $ inside braces', () => {
  assert.equal(normalizeHookName('fc_vat_checkout_eu_vat_number', prefix), 'fc_vat_checkout_eu_vat_number');
  assert.equal(normalizeHookName('update_option_{$option}', prefix), 'update_option_{option}');
});

test('slugifies braces without encoding unsafe characters', () => {
  assert.equal(
    slugifyHookName('fc_vat_enable_compat_plugin_{plugin_slug}'),
    'fc_vat_enable_compat_plugin_plugin_slug',
  );
  assert.equal(slugifyHookName('fc_vat_{current_section}_settings'), 'fc_vat_current_section_settings');
});

test('builds an apply_filters line with parameters in order', () => {
  const signature = buildSignature(
    {
      type: 'filter',
      args: 2,
      doc: {
        tags: [
          {name: 'param', variable: '$vat_number', types: ['string']},
          {name: 'param', variable: '$country', types: ['string']},
        ],
      },
    },
    'fc_vat_checkout_eu_vat_number',
  );
  assert.equal(
    signature,
    "apply_filters( 'fc_vat_checkout_eu_vat_number', $vat_number, $country );",
  );
});

test('builds a do_action line for a prefix-normalized hook', () => {
  const signature = buildSignature({type: 'action', args: 0, doc: {tags: []}}, 'fc_vat_admin_notices');
  assert.equal(signature, "do_action( 'fc_vat_admin_notices' );");
});

test('links source files only when the plugin repository is public', () => {
  const hook = {file: 'inc/checkout-eu-vat.php', line: 120};
  assert.deepEqual(sourceLocation(hook, {repository: null}), {
    label: 'inc/checkout-eu-vat.php:120',
    url: null,
  });
  assert.deepEqual(
    sourceLocation(hook, {
      repository: {url: 'https://github.com/fluid-checkout/fluid-checkout', branch: 'trunk'},
    }),
    {
      label: 'inc/checkout-eu-vat.php:120',
      url: 'https://github.com/fluid-checkout/fluid-checkout/blob/trunk/inc/checkout-eu-vat.php#L120',
    },
  );
});

test('omits an alias that repeats the normalized hook name', () => {
  const page = renderHookPage(
    {
      type: 'filter',
      args: 1,
      aliases: ['fc_vat_admin_notices'],
      file: 'inc/admin/admin-notices.php',
      doc: {
        description: 'Filters the admin notices displayed by EU-VAT Assistant.',
        tags: [{name: 'since', content: '0.1.0'}],
      },
    },
    {
      normalizedName: 'fc_vat_admin_notices',
      slug: 'fc_vat_admin_notices',
      plugin: {repository: null},
    },
  );
  assert.equal(page.includes('**Aliases:**'), false);
  assert.match(page, /`inc\/admin\/admin-notices\.php`/);
  assert.doesNotMatch(page, /github\.com/);
});

test('does not render an Aliases section for concrete dynamic hook names', () => {
  const page = renderHookPage(
    {
      type: 'filter',
      args: 1,
      aliases: ['fc_vat_vat_number_settings'],
      file: 'inc/admin/admin-settings-vat-assistant.php',
      doc: {description: 'Filters settings.', tags: [{name: 'since', content: '0.1.0'}]},
    },
    {
      normalizedName: 'fc_vat_{current_section}_settings',
      slug: 'fc_vat_current_section_settings',
      plugin: {repository: null},
    },
  );
  assert.equal(page.includes('**Aliases:**'), false);
  assert.doesNotMatch(page, /fc_vat_vat_number_settings/);
});

test('escapes MDX braces outside code spans only', () => {
  assert.equal(escapeMdx('See {plugin_slug} here.'), "See {'{'}plugin_slug{'}'} here.");
  assert.equal(escapeMdx('Use `{plugin_slug}` in PHP.'), 'Use `{plugin_slug}` in PHP.');
  assert.equal(escapeMdx('```\n{plugin_slug}\n```'), '```\n{plugin_slug}\n```');
});
