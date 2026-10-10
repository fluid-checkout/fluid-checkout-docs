```php
add_filter( 'fc_pro_order_details_pending_payment_statuses',
    /**
     * Add custom payment pending status for bank transfer payments.
     *
     * @param array $statuses Array of order status keys considered as pending payment.
     * @return array Filtered value.
     */
    function( $statuses ) {
        // Add 'awaiting-payment' status for BACS payments
        if ( isset( $statuses['bacs'] ) ) {
            $statuses['bacs'][] = 'custom-awaiting-payment';
        }
        return $statuses;
    },
    10
);
```
