```php
add_filter( 'fc_pro_address_book_privacy_export_address_book_entry_props',
    /**
     * Customize field labels for privacy export.
     *
     * @param array $fields Array of field definitions.
     * @return array Filtered value.
     */
    function( $fields ) {
        // Change existing labels - use 'woocommerce' for standard fields
        $fields['company'] = __( 'Business Name', 'woocommerce' );
        $fields['phone'] = __( 'Contact Number', 'woocommerce' );

        return $fields;
    },
    10
);
```
