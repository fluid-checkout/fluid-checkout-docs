```php
add_filter( 'fc_billing_same_as_shipping_option_label',
    /**
     * Customize billing same as shipping option label.
     *
     * @param string $label Label text.
     * @return string Filtered value.
     */
    function( $label ) {
        return __( 'Use shipping address for billing', 'my-theme' );
    },
    10
);
```
