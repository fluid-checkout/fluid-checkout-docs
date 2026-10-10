```php
add_filter( 'fc_pro_order_details_shipping_status_label_delivered',
    /**
     * Customize delivered label.
     *
     * @param string $value Filtered value.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'Successfully delivered', 'text-domain' );
    },
    10
);
```
