```php
add_filter( 'fc_pro_order_details_shipping_status_label_in_transit',
    /**
     * Customize in transit label.
     *
     * @param string $label The in transit label. Defaults to “In transit”.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Out for delivery', 'text-domain' );
    },
    10
);
```
