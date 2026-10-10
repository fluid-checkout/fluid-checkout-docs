```php
add_filter( 'fc_pro_order_details_shipping_status_label_delivered',
    /**
     * Customize delivered label.
     *
     * @param string $label The delivered label. Defaults to “Delivered”.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Successfully delivered', 'text-domain' );
    },
    10
);
```
