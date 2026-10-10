```php
add_action( 'fc_pro_woocommerce_germanized_preferred_delivery_after_fields',
    /**
     * Customize this hook.
     */
    function() {
        // Get value
        $substep_visible_value = $this->is_preferred_delivery_section_enabled() ? 'yes' : 'no';

        // Output substep state hidden field
        echo '<input class="fc-substep-visible-state" type="hidden" value="' . $substep_visible_value . '" />';
    },
    10
);
```
