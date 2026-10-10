```php
add_filter( 'fc_pro_order_details_section_hook_priority_order_summary',
    /**
     * Move order summary to sidebar.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        if ( 'woocommerce_thankyou' === $priority[0] ) {
            $priority[0] = 'fc_pro_order_received_sidebar_sections';  // Change location
            $priority[2] = 20;  // Adjust priority
        }

        return $priority;
    },
    10
);
```
