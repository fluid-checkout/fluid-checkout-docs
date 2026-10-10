```php
add_filter( 'fc_pro_order_details_email_types',
    /**
     * Add custom email type to order details.
     *
     * @param array $email_types Array of email type IDs. Defaults to array( 'new_order', 'customer_invoice', 'failed_order', 'cancelled_order', 'customer_completed_order', 'customer_note', 'customer_on_hold_order', 'customer_processing_order', 'customer_refunded_order' ).
     * @return array Filtered value.
     */
    function( $email_types ) {
        $email_types[] = 'custom_order_notification';
        return $email_types;
    },
    10
);
```
