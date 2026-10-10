# Getting started with EU-VAT Assistant hooks

EU-VAT Assistant runs WordPress actions and filters around the checkout VAT number. Use them to normalize the number, turn a compatibility module on or off, or print something next to the field. You do not need to edit the plugin.

![EU VAT number moving from the checkout field, through a filter, to validation and storage](./img/hooks-overview.svg)

## Find a hook

The [hooks reference](/eu-vat/hooks) lists every action and filter exported from the plugin. Open a hook for its type, parameters, the version that introduced it, and the PHP file that runs it.

A filter such as [`fc_vat_number_field_args`](/eu-vat/hooks/fc_vat_number_field_args) receives the current value and must return a replacement.

## Attach a callback

```php
add_filter( 'fc_vat_number_field_args', 'my_store_vat_number_field_args' );

/**
 * Change the VAT number field label.
 *
 * @param array $args VAT number field arguments.
 * @return array
 */
function my_store_vat_number_field_args( $args ) {
    $args['label'] = __( 'EU VAT number', 'my-store' );
    return $args;
}
```

The last argument to `add_filter` is the number of parameters you accept. Match it to the parameters table on the hook page.

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
