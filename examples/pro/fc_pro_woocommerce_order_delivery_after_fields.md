```php
add_action( 'fc_pro_woocommerce_order_delivery_after_fields',
    /**
     * Customize this hook.
     */
    function() {
        // Get settings
        $delivery_option = WC_OD()->settings()->get_setting( 'checkout_delivery_option' );

        // Get values
        $substep_editable_value = 'calendar' === $delivery_option ? 'yes' : 'no';
        $substep_visible_value = WC_OD_Checkout::instance()->needs_details() ? 'yes' : 'no';

        // Output substep state hidden fields
        echo '<input class="fc-substep-editable-state" type="hidden" value="' . $substep_editable_value . '" />';
        echo '<input class="fc-substep-visible-state" type="hidden" value="' . $substep_visible_value . '" />';
    },
    10
);
```
