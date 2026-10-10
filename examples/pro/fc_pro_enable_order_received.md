```php
add_filter( 'fc_pro_enable_order_received',
    /**
     * Disable order received feature.
     *
     * @param bool $is_enabled Whether the order received page feature is enabled. Default value comes from plugin settings.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
