```php
add_filter( 'fc_pro_pickup_point_label_text',
    /**
     * Change pickup point label to custom text.
     *
     * @param string $label_text The pickup point label text. Defaults to “Pickup point”.
     * @return string Filtered value.
     */
    function( $label_text ) {
        return __( 'Local Pickup Location', 'text-domain' );
    },
    10
);
```
