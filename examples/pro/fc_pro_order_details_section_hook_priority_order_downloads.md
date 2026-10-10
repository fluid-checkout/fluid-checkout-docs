```php
add_filter( 'fc_pro_order_details_section_hook_priority_order_downloads',
    /**
     * Move downloads section.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        if ( 'woocommerce_thankyou' === $priority[0] ) {
            $priority[0] = 'woocommerce_order_details_after_order_table';  // Change location
            $priority[2] = 52;  // Adjust priority
        }

        return $priority;
    },
    10
);
```
