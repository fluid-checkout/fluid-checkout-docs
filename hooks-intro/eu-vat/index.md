## Getting started with EU-VAT Assistant hooks

EU-VAT Assistant runs WordPress actions and filters around the checkout VAT number. Use them to normalize the number, turn a compatibility module on or off, or print something next to the field. You do not need to edit the plugin.

![EU VAT number moving from the checkout field, through a filter, to validation and storage](./img/hooks-overview.svg)

## Find a hook

The [hooks reference](#filters) lists every action and filter exported from the plugin. Open a hook for its type, parameters, the version that introduced it, and the PHP file that runs it.

A filter such as [`fc_vat_number_field_args`](/eu-vat/hooks/fc_vat_number_field_args/) receives the current value and must return a replacement.

## Best practices

If you are unsure about how to add the code snippet to your website, check our article:

[How to safely add code snippets to your WooCommerce website]({{CODE_SNIPPETS_ARTICLE_URL}})

## Dynamic hook names

Some hook names change at runtime. On these pages a variable is written in braces, and the plugin prefix `fc_vat` stands in for `self::$plugin_prefix`.

| In the plugin | Name on this page |
| --- | --- |
| `'fc_vat_enable_compat_plugin_' . $plugin_slug` | `fc_vat_enable_compat_plugin_{plugin_slug}` |
| `'fc_vat_' . $current_section . '_settings'` | `fc_vat_{current_section}_settings` |
| `self::$plugin_prefix . '_admin_notices'` | `fc_vat_admin_notices` |

Register the concrete hook when you know the value:

```php
$plugin_slug = 'woocommerce-subscriptions';
add_filter( "fc_vat_enable_compat_plugin_{$plugin_slug}", '__return_false' );
```
