```php
add_filter( 'fc_pro_order_details_section_hook_priority_order_notes',
    /**
     * Move order notes to before order items.
     *
     * @param array $priority Array with 3 elements: array( 'hook_name', 'callback', priority_number )
     * @return array Filtered value.
     */
    function( $priority ) {
        // Only modify when "inside_order_items" position is selected
        if ( 'woocommerce_order_details_after_order_table' === $priority[0] && 30 === $priority[2] ) {
            $priority[0] = 'woocommerce_thankyou';  // Change location
            $priority[2] = 46;  // Adjust priority
        }

        return $priority;
    },
    10
);
```
