```php
add_action( 'fc_pro_edit_account_address_form',
    /**
     * Add custom notice to edit address form.
     *
     * @param string $load_address The address type being edited ( billing or shipping ).
     * @param array $address Array containing the address field values.
     */
    function( $load_address, $address ) {
        echo '<div class="address-form-notice">';
        echo '<p><strong>Note:</strong> Please ensure your address information is accurate.</p>';
        echo '</div>';
    },
    10,
    2
);
```
