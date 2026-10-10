```php
add_action( 'fc_checkout_header_cart_link',
    /**
     * Add custom cart link.
     */
    function() {
        echo '<a href="' . wc_get_cart_url() . '" class="custom-cart-link">View Cart</a>';
    },
    10
);
```
