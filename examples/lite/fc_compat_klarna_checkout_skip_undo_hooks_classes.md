```php
add_filter( 'fc_compat_klarna_checkout_skip_undo_hooks_classes',
    /**
     * Add custom feature classes to skip when undoing Klarna Checkout hooks.
     *
     * @param array $skip Whether to skip the default behavior. Default empty array.
     * @return array Filtered value.
     */
    function( $skip ) {
        $skip[] = 'FluidCheckout_Feature';
        return $skip;
    },
    10
);
```
