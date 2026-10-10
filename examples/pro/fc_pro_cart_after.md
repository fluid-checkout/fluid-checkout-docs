```php
add_action( 'fc_pro_cart_after',
    /**
     * Add cart tracking code.
     */
    function() {
        if ( ! is_cart() ) { return; }

        echo '<script>';
        echo 'console.log("Cart page loaded");';
        echo '</script>';
    },
    10
);
```
