```php
add_filter( 'fc_compat_dintero_checkout_skip_undo_hooks_early_classes',
    /**
     * Add custom feature classes to skip early when undoing Dintero Checkout hooks.
     *
     * @param array $skip Whether to skip the default behavior.
     * @return array Filtered value.
     */
    function( $skip ) {
        $skip[] = 'FluidCheckout_EarlyFeature';
        return $skip;
    },
    10
);
```
