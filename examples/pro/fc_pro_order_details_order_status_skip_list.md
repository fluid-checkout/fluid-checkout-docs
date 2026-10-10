```php
add_filter( 'fc_pro_order_details_order_status_skip_list',
    /**
     * Add custom status to skip list.
     *
     * @param array $value Filtered value.
     * @param \WC_Order $order Order object.
     * @return array Filtered value.
     */
    function( $value, $order ) {
        // Add custom status to the skip list
        $value[] = 'custom-status';

        return $value;
    },
    10,
    2
);
```
