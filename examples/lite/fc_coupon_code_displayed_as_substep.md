```php
add_filter( 'fc_coupon_code_displayed_as_substep',
    /**
     * Disable coupon code substep display.
     *
     * @param bool $enabled Whether the feature is enabled. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
