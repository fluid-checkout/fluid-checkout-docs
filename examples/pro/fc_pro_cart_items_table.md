```php
add_action( 'fc_pro_cart_items_table',
    /**
     * Add custom cart items header.
     */
    function() {
        echo '<div class="cart-items-header">';
        echo '<h3>' . esc_html__( 'Your Items', 'text-domain' ) . '</h3>';
        echo '</div>';
    },
    5
);
```
