```php
add_filter( 'fc_pro_order_details_closed_statuses',
    /**
     * Add archived status as closed.
     *
     * @param array $statuses Array of order status keys considered as closed. Defaults to array( 'completed', 'cancelled', 'refunded', 'failed' ).
     * @return array Filtered value.
     */
    function( $statuses ) {
        $statuses[] = 'archived';
        return $statuses;
    },
    10
);
```
