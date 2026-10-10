```php
add_filter( 'fc_pro_order_details_order_status_skip_list',
    /**
     * Add custom status to skip list.
     *
     * @param array $skip_statuses Array of order status keys to skip. Defaults to array( 'on-hold', 'cancelled', 'refunded', 'failed', 'draft', 'checkout-draft' ).
     * @param WC_Order $order The order object.
     * @return array Filtered value.
     */
    function( $skip_statuses, $order ) {
        // Add custom status to the skip list
        $skip_statuses[] = 'custom-status';

        return $skip_statuses;
    },
    10,
    2
);
```
