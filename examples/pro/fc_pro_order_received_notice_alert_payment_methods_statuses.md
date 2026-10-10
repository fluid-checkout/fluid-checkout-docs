```php
add_filter( 'fc_pro_order_received_notice_alert_payment_methods_statuses',
    /**
     * Add custom payment method to alert list.
     *
     * @param array $statuses Order statuses.
     * @return array Filtered value.
     */
    function( $statuses ) {
        $statuses['custom_payment_gateway'] = array( 'pending', 'on-hold' );
        return $statuses;
    },
    10
);
```
