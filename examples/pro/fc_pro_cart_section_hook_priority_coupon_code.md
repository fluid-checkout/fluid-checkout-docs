```php
add_filter( 'fc_pro_cart_section_hook_priority_coupon_code',
    /**
     * Move coupon code section earlier on cart page.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        // Adjust priority to display later on same hook
        if ( 'fc_pro_cart_sections' === $value[0] ) {
            $value[2] = 55;
        }

        return $value;
    },
    10
);
```
