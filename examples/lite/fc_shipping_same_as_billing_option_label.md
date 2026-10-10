```php
add_filter( 'fc_shipping_same_as_billing_option_label',
    /**
     * Customize shipping same as billing option label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Use billing address for shipping', 'my-theme' );
    },
    10
);
```
