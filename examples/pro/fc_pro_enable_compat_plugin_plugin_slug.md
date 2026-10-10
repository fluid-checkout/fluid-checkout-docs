In `fc_pro_enable_compat_plugin_{plugin_slug}`, `woocommerce-subscriptions` replaces `{plugin_slug}`.

```php
add_filter( 'fc_pro_enable_compat_plugin_woocommerce-subscriptions',
    /**
     * Disable specific plugin compatibility.
     *
     * @param bool $enabled Whether to load the compatibility module for a specific plugin. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
