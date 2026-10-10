```php
add_action( 'fc_shipping_methods_before_packages',
    /**
     * Add shipping methods header.
     */
    function() {
        echo '<div>Choose Shipping Method</div>';
    },
    10
);
```
