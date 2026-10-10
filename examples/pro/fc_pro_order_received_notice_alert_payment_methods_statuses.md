```php
add_filter( 'fc_pro_order_received_notice_alert_payment_methods_statuses',
    /**
     * Add custom payment method to alert list.
     *
     * @param array $alert_methods_statuses Array of payment methods and their associated alert statuses.
     * @return array Filtered value.
     */
    function( $alert_methods_statuses ) {
        $alert_methods_statuses['custom_payment_gateway'] = array( 'pending', 'on-hold' );
        return $alert_methods_statuses;
    },
    10
);
```
