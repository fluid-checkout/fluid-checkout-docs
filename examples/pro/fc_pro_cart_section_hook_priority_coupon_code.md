```php
add_filter( 'fc_pro_cart_section_hook_priority_coupon_code',
    /**
     * Move coupon code section earlier on cart page.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        // Adjust priority to display later on same hook
        if ( 'fc_pro_cart_sections' === $priority[0] ) {
            $priority[2] = 55;
        }

        return $priority;
    },
    10
);
```
