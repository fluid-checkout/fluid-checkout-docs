```php
add_action( 'fc_pro_woo_delivery_slots_after_fields',
    /**
     * Customize this hook.
     */
    function() {
        $substep_visible = $this->is_substep_delivery_slots_visible() ? 'yes' : 'no';
        echo '<input class="fc-substep-visible-state" type="hidden" value="' . $substep_visible . '" />';
    },
    5
);
```
