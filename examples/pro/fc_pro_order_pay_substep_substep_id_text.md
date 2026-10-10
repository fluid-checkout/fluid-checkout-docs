In `fc_pro_order_pay_substep_{substep_id}_text`, `shipping_method` replaces `{substep_id}`.

```php
add_filter( 'fc_pro_order_pay_substep_shipping_method_text',
    /**
     * Customize shipping method substep review text.
     *
     * @param string $html The complete substep review text HTML.
     * @param WC_Order $order The order object.
     * @return string Filtered value.
     */
    function( $html, $order ) {
        // Wrap in custom div
        return '<div class="custom-shipping-review">' . $html . '</div>';
    },
    10,
    2
);
```
