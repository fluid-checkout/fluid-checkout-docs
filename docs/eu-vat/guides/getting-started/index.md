---
sidebar_position: 1
title: Getting started with EU-VAT Assistant hooks
description: Find an EU-VAT Assistant hook and attach your own callback.
---

# Getting started with EU-VAT Assistant hooks

EU-VAT Assistant runs WordPress filters around the VAT number field, compatibility modules, and admin settings. Use them to change field arguments, turn a compatibility module off, or adjust the settings that are registered. You do not need to edit the plugin.

![Default VAT number field arguments pass through a filter before the field is rendered](./img/hooks-overview.svg)

## Find a hook

The [hooks reference](/eu-vat/hooks) lists every filter. Open a hook for its type, parameters, the version that introduced it, and the PHP file that runs it.

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

The last argument to `add_filter` is the number of parameters you accept. Match it to the parameters table on the hook page. This filter passes one argument, so the default of `1` is enough.

## Dynamic hook names

Some hook names change at runtime. On these pages a variable is written in braces, and the plugin prefix `fc_vat` stands in for `self::$plugin_prefix`.

| In the plugin | Name on this page |
| --- | --- |
| `'fc_vat_enable_compat_plugin_' . $plugin_slug` | `fc_vat_enable_compat_plugin_{plugin_slug}` |
| `'fc_vat_' . $current_section . '_settings'` | `fc_vat_{current_section}_settings` |
| `self::$plugin_prefix . '_admin_notices'` | `fc_vat_admin_notices` |

Register the concrete hook when you know the value:

```php
add_filter( 'fc_vat_enable_compat_plugin_woocommerce-germanized-pro', '__return_false' );
```
