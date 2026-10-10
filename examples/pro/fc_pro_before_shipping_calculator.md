```php
add_action( 'fc_pro_before_shipping_calculator',
    /**
     * Add shipping calculator intro.
     */
    function() {
        echo '<div class="shipping-calculator-intro">';
        echo '<p>' . esc_html__( 'Calculate your shipping cost:', 'text-domain' ) . '</p>';
        echo '</div>';
    },
    10
);
```

```php
add_action( 'fc_pro_before_shipping_calculator',
    /**
     * Add custom content before shipping calculator.
     */
    function() {
        echo '<div class="shipping-notice">Free shipping on orders over $50!</div>';
    },
    10
);
```
