```php
add_action( 'fc_coderockz_woo_delivery_after_hidden_fields',
    /**
     * Output custom hidden fields.
     */
    function() {
        // Get field values
        $delivery_tips = FluidCheckout_Steps::instance()->get_checkout_field_value_from_session_or_posted_data( 'coderockz_woo_delivery_tips_field' );
        $pickup_location = FluidCheckout_Steps::instance()->get_checkout_field_value_from_session_or_posted_data( 'coderockz_woo_delivery_pickup_location_field' );
        $additional_field = FluidCheckout_Steps::instance()->get_checkout_field_value_from_session_or_posted_data( 'coderockz_woo_delivery_additional_field_field' );

        // Output hidden fields
        echo '<input type="hidden" id="fc_coderockz_woo_delivery_tips" name="fc_coderockz_woo_delivery_tips" value="' . esc_attr( $delivery_tips ) . '">';
        echo '<input type="hidden" id="fc_coderockz_woo_pickup_location" name="fc_coderockz_woo_pickup_location" value="' . esc_attr( $pickup_location ) . '">';
        echo '<input type="hidden" id="fc_coderockz_woo_additional_field" name="fc_coderockz_woo_additional_field" value="' . esc_attr( $additional_field ) . '">';
    },
    10
);
```
