```php
add_filter( 'fc_vat_is_vat_number_field',
    /**
     * Enable VAT logic for custom fields.
     *
     * @param bool $is_vat_number_field Whether the field is a VAT number field.
     * @param string $field_key Field key being checked.
     * @return bool Filtered value.
     */
    function( $is_vat_number_field, $field_key ) {
        // Consider 'billing_tax_id' as a VAT number field
        if ( 'billing_tax_id' === $field_key ) {
            return true;
        }

        // Consider 'shipping_vat_number' as a VAT number field
        if ( 'shipping_vat_number' === $field_key ) {
            return true;
        }

        return $is_vat_number_field;
    },
    10,
    2
);
```

```php
add_filter( 'fc_vat_is_vat_number_field',
    /**
     * Disable VAT logic for the default VAT field.
     *
     * @param bool $is_vat_number_field Whether the field is a VAT number field.
     * @param string $field_key Field key being checked.
     * @return bool Filtered value.
     */
    function( $is_vat_number_field, $field_key ) {
        // Disable VAT logic for the default billing_vat_number field
        if ( 'billing_vat_number' === $field_key ) {
            return false;
        }

        // Keep default behavior for all other fields
        return $is_vat_number_field;
    },
    10,
    2
);
```
