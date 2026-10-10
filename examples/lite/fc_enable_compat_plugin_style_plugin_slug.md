Note that for the checkout page no {$page} modifier is used: fc_enable_compat_plugin_style_{$plugin_slug}

In `fc_enable_compat_plugin_style_{plugin_slug}`, `fc-vat-assistant` replaces `{plugin_slug}`.

```php
add_filter( 'fc_enable_compat_plugin_style_fc-vat-assistant',
    /**
     * Disable Checkout plugin style compatibility.
     *
     * @param bool $value Value to filter. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
