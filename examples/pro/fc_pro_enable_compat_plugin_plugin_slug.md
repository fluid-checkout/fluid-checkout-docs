In `fc_pro_enable_compat_plugin_{plugin_slug}`, `woocommerce-subscriptions` replaces `{plugin_slug}`.

```php
add_filter( 'fc_pro_enable_compat_plugin_woocommerce-subscriptions',
    /**
     * Disable specific plugin compatibility.
     *
     * @param bool $is_enabled Whether the plugin compatibility file should be loaded. Defaults to true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
