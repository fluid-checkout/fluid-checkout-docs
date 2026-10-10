```php
add_filter( 'fc_pro_order_details_section_hook_priority_order_downloads',
    /**
     * Move downloads section.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        if ( 'woocommerce_thankyou' === $value[0] ) {
            $value[0] = 'woocommerce_order_details_after_order_table';  // Change location
            $value[2] = 52;  // Adjust priority
        }

        return $value;
    },
    10
);
```
