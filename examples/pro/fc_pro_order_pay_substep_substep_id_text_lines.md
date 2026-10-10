In `fc_pro_order_pay_substep_{substep_id}_text_lines`, `order_notes` replaces `{substep_id}`.

```php
add_filter( 'fc_pro_order_pay_substep_order_notes_text_lines',
    /**
     * Add custom text lines to order notes substep.
     *
     * @param array $text_lines Array of review text lines. Defaults to empty array.
     * @param WC_Order $order The order object.
     * @return array Filtered value.
     */
    function( $text_lines, $order ) {
        // Add order date for reference
        $order_date = $order->get_date_created();

        if ( $order_date ) {
            $text_lines[] = __( 'Order Date:', 'text-domain' ) . ' ' . $order_date->date_i18n( get_option( 'date_format' ) );
        }

        return $text_lines;
    },
    10,
    2
);
```
