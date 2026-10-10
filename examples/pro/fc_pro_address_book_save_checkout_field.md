```php
add_filter( 'fc_pro_address_book_save_checkout_field',
    /**
     * Add custom notice to edit address form.
     *
     * @param array $field Field configuration array:
     * @return array Filtered value.
     */
    function( $field ) {
        $field['label'] = __( 'Save this address for future use', 'your-text-domain' );
        $field['class'][] = 'my-custom-class';
        return $field;
    },
    10
);
```
