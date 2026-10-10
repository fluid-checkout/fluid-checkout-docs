```php
add_action( 'fc_pro_cart_sidebar_sections',
    /**
     * Add estimated delivery to cart sidebar.
     */
    function() {
        echo '<div class="cart-sidebar-delivery">';
        echo '<h4>' . esc_html__( 'Estimated Delivery', 'text-domain' ) . '</h4>';
        echo '<p>' . esc_html__( '3-5 business days', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    20
);
```
