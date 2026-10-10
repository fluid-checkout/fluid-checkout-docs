```php
add_filter( 'fc_pro_view_order_section_hook_priority_order_summary',
    /**
     * Move order summary from before order items to after order items.
     *
     * @param mixed $value Filtered value.
     * @return mixed Filtered value.
     */
    function( $value ) {
        if ( 'woocommerce_view_order' === $value[0] ) {
            $value[2] = 43;  // Change to after Customer information
        }

        return $value;
    },
    10
);
```
