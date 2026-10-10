```php
add_action( 'fc_shipping_methods_before_packages_inside',
    /**
     * Add packages intro.
     */
    function() {
        echo '<p>Select your preferred shipping option</p>';
    },
    10
);
```
