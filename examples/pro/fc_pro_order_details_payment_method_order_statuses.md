```php
add_filter( 'fc_pro_order_details_payment_method_order_statuses',
    /**
     * Show payment method section for failed orders too.
     *
     * @param array $statuses Array of order status keys. Defaults to array( 'pending', 'on-hold' ).
     * @return array Filtered value.
     */
    function( $statuses ) {
        $statuses[] = 'failed';
        return $statuses;
    },
    10
);
```
