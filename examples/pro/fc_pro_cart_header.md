```php
add_action( 'fc_pro_cart_header',
    /**
     * Add cart header branding.
     */
    function() {
        echo '<div class="cart-header-branding">';
        echo '<p style="text-align: center;">' . esc_html__( 'Custom Information', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    5
);
```
