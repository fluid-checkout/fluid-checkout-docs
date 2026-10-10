```php
add_action( 'fc_pro_cart_footer',
    /**
     * Add cart footer content.
     */
    function() {
        // Only on cart page
        if ( ! is_cart() ) { return; }

        echo '<div class="cart-footer-content">';
        echo '<p>&copy; ' . date( 'Y' ) . ' ' . esc_html( get_bloginfo( 'name' ) ) . '</p>';
        echo '</div>';
    },
    10
);
```
