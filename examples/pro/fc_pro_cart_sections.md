```php
add_action( 'fc_pro_cart_sections',
    /**
     * Add content to cart sections.
     */
    function() {
        echo '<div class="cart-sections">Custom information</div>';
    },
    10
);
```
