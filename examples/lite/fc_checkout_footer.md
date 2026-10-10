```php
add_action( 'fc_checkout_footer',
    /**
     * Add checkout footer content.
     */
    function() {
        echo '<div class="checkout-footer">Thank you for shopping with us</div>';
    },
    10
);
```
