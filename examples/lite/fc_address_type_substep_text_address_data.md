In `fc_{address_type}_substep_text_address_data`, `billing` replaces `{address_type}`.

```php
add_filter( 'fc_billing_substep_text_address_data',
    /**
     * Customize billing address data for substep display.
     *
     * @param array $address_data Address data used to format the substep review text.
     * @return array Filtered value.
     */
    function( $address_data ) {
        // Remove phone number from substep display
        unset( $address_data['phone'] );
        return $address_data;
    },
    10
);
```

In `fc_{address_type}_substep_text_address_data`, `shipping` replaces `{address_type}`.

```php
add_filter( 'fc_shipping_substep_text_address_data',
    /**
     * Customize shipping address data for substep display.
     *
     * @param array $address_data Address data used to format the substep review text.
     * @return array Filtered value.
     */
    function( $address_data ) {
        // Remove phone number from substep display
        unset( $address_data['phone'] );
        return $address_data;
    },
    10
);
```
