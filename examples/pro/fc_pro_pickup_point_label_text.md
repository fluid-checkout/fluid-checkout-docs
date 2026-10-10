```php
add_filter( 'fc_pro_pickup_point_label_text',
    /**
     * Change pickup point label to custom text.
     *
     * @param string $text Text.
     * @return string Filtered value.
     */
    function( $text ) {
        return __( 'Local Pickup Location', 'text-domain' );
    },
    10
);
```
