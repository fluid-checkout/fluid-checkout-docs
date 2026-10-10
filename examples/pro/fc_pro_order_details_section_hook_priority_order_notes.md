```php
add_filter( 'fc_pro_order_details_section_hook_priority_order_notes',
    /**
     * Move order notes to before order items.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        // Only modify when "inside_order_items" position is selected
        if ( 'woocommerce_order_details_after_order_table' === $value[0] && 30 === $value[2] ) {
            $value[0] = 'woocommerce_thankyou';  // Change location
            $value[2] = 46;  // Adjust priority
        }

        return $value;
    },
    10
);
```
