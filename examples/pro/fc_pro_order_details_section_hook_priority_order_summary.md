```php
add_filter( 'fc_pro_order_details_section_hook_priority_order_summary',
    /**
     * Move order summary to sidebar.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        if ( 'woocommerce_thankyou' === $value[0] ) {
            $value[0] = 'fc_pro_order_received_sidebar_sections';  // Change location
            $value[2] = 20;  // Adjust priority
        }

        return $value;
    },
    10
);
```
