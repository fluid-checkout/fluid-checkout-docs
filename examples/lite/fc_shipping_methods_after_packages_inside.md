```php
add_action( 'fc_shipping_methods_after_packages_inside',
    /**
     * Add packages help text.
     */
    function() {
        echo '<p class="shipping-help">Need help choosing? Contact us!</p>';
    },
    10
);
```
