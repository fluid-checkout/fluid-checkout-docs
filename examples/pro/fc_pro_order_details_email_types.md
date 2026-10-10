```php
add_filter( 'fc_pro_order_details_email_types',
    /**
     * Add custom email type to order details.
     *
     * @param array $types Item types.
     * @return array Filtered value.
     */
    function( $types ) {
        $types[] = 'custom_order_notification';
        return $types;
    },
    10
);
```
