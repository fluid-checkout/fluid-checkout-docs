```php
add_action( 'fc_pro_after_shipping_calculator',
    /**
     * Add shipping information after calculator.
     */
    function() {
        echo '<div class="shipping-info">';
        echo '<p><small>' . esc_html__( 'Free shipping on orders over $50', 'text-domain' ) . '</small></p>';
        echo '</div>';
    },
    10
);
```

```php
add_action( 'fc_pro_after_shipping_calculator',
    /**
     * Add custom content after shipping calculator.
     */
    function() {
        echo '<div class="shipping-info">Need help? Contact our support team.</div>';
    },
    10
);
```
