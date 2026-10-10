```php
add_filter( 'fc_pro_order_details_shipping_status_label_in_transit',
    /**
     * Customize in transit label.
     *
     * @param string $value Filtered value.
     * @return string Filtered value.
     */
    function( $value ) {
        return __( 'Out for delivery', 'text-domain' );
    },
    10
);
```
