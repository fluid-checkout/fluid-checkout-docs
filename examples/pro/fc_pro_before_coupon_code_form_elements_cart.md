```php
add_action( 'fc_pro_before_coupon_code_form_elements_cart',
    /**
     * Output extra content before coupon code section on cart page.
     */
    function() {
        echo '<p>';
        echo esc_html__( 'This will be displayed before the coupon code section on the cart page.', 'text-domain' );
        echo '</p>';
    },
    15
);
```
