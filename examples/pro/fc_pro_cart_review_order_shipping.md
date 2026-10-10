```php
add_action( 'fc_pro_cart_review_order_shipping',
    /**
     * Add shipping estimate notice.
     */
    function() {
        echo '<tr class="shipping-estimate">';
        echo '<td colspan="2"><small>' . esc_html__( 'Shipping calculated based on your location', 'text-domain' ) . '</small></td>';
        echo '</tr>';
    },
    15
);
```
