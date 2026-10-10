In `fc_pro_enable_compat_checkout_edit_cart_plugin_style_{plugin_slug}`, `woocommerce-subscriptions` replaces `{plugin_slug}`.

```php
add_filter( 'fc_pro_enable_compat_checkout_edit_cart_plugin_style_woocommerce-subscriptions',
    /**
     * Disable checkout edit cart plugin styles for WooCommerce Subscriptions.
     *
     * @param bool $enabled Whether to load checkout edit-cart compatibility styles for a specific plugin. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
