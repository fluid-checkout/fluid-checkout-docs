```php
add_filter( 'fc_integration_woo_checkout_field_editor_pro_enable_edit_address_changes',
    /**
     * Disable edit address changes for WC Checkout Field Editor Pro.
     *
     * @param string $value Value to filter. Default yes.
     * @return string Filtered value.
     */
    function( $value ) {
        return 'no';
    },
    10
);
```
