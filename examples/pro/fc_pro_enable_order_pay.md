```php
add_filter( 'fc_pro_enable_order_pay',
    /**
     * Disable order pay feature.
     *
     * @param bool $enabled Whether the optimized order pay page is enabled.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
