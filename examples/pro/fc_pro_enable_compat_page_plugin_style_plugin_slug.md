In `fc_pro_enable_compat_{page}_plugin_style_{plugin_slug}`, `checkout_edit_cart` replaces `{page}` and `woocommerce-subscriptions` replaces `{plugin_slug}`.

```php
add_filter( 'fc_pro_enable_compat_checkout_edit_cart_plugin_style_woocommerce-subscriptions',
    /**
     * Disable checkout edit cart plugin styles for WooCommerce Subscriptions.
     *
     * @param bool $is_enabled Whether the plugin compatibility styles should be loaded. Defaults to true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
