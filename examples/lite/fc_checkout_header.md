```php
add_action( 'fc_checkout_header',
    /**
     * Add checkout header content.
     */
    function() {
        echo '<div class="custom-checkout-header" style="text-align: center;">Custom checkout header content</div>';
    },
    10
);
```
