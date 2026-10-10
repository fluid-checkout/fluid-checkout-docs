```php
add_action( 'fc_pro_after_coupon_code_form_elements_cart',
    /**
     * Output extra content after coupon code section on cart page.
     */
    function() {
        echo '<p>';
        echo esc_html__( 'This will be displayed after the coupon code section on the cart page.', 'text-domain' );
        echo '</p>';
    },
    15
);
```
