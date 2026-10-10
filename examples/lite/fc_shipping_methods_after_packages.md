```php
add_action( 'fc_shipping_methods_after_packages',
    /**
     * Add shipping methods message after packages.
     */
    function() {
        echo '<div>Custom message After Packages</div>';
    },
    10
);
```
