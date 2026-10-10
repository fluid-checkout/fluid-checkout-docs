```php
add_filter( 'fc_cart_has_multiple_packages',
    /**
     * Force single package display even with multiple packages.
     *
     * @param bool $has_multiple_packages Whether the cart has multiple shipping packages.
     * @return bool Filtered value.
     */
    function( $has_multiple_packages ) {
        return false; // Always treat as single package
    },
    10
);
```
