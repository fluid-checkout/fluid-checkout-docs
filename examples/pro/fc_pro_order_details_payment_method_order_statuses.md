```php
add_filter( 'fc_pro_order_details_payment_method_order_statuses',
    /**
     * Show payment method section for failed orders too.
     *
     * @param array $statuses Order statuses.
     * @return array Filtered value.
     */
    function( $statuses ) {
        $statuses[] = 'failed';
        return $statuses;
    },
    10
);
```
