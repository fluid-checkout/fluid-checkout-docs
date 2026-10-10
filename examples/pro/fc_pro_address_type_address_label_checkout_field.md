In `fc_pro_{address_type}_address_label_checkout_field`, `shipping` replaces `{address_type}`.

```php
add_filter( 'fc_pro_shipping_address_label_checkout_field',
    /**
     * Customize shipping address label field configuration.
     *
     * @param array $field Field configuration array:
     * @return array Filtered value.
     */
    function( $field ) {
        // Change the field label
        $field['label'] = 'Label this address';

        // Add custom CSS classes
        $field['class'][] = 'custom-address-label';

        // Set placeholder text
        $field['placeholder'] = 'Enter a label for this address...';

        // Change description
        $field['description'] = 'Add a name to this address (e.g. Home, Office) to tell it apart from others.';

        return $field;
    },
    10
);
```
