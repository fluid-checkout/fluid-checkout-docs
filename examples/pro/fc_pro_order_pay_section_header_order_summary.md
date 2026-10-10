```php
add_action( 'fc_pro_order_pay_section_header_order_summary',
    /**
     * Add custom information to order summary.
     *
     * @param \WC_Order $order Order object.
     */
    function( $order ) {
        echo '<div class="custom-info">Custom information</div>';
    },
    10
);
```
