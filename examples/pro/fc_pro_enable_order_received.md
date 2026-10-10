```php
add_filter( 'fc_pro_enable_order_received',
    /**
     * Disable order received feature.
     *
     * @param bool $enabled Whether the optimized order received page is enabled.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
