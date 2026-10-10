In `fc_pro_order_pay_substep_{substep_id}_text_lines`, `order_notes` replaces `{substep_id}`.

```php
add_filter( 'fc_pro_order_pay_substep_order_notes_text_lines',
    /**
     * Add custom text lines to order notes substep.
     *
     * @param array $value Filtered value. Default empty array.
     * @param \WC_Order $order Order object.
     * @return array Filtered value.
     */
    function( $value, $order ) {
        // Add order date for reference
        $order_date = $order->get_date_created();

        if ( $order_date ) {
            $value[] = __( 'Order Date:', 'text-domain' ) . ' ' . $order_date->date_i18n( get_option( 'date_format' ) );
        }

        return $value;
    },
    10,
    2
);
```
