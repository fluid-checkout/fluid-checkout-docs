```php
add_filter( 'fc_pro_cart_shipping_calculator_initially_expanded',
    /**
     * Show shipping calculator expanded.
     *
     * @param bool $is_expanded Whether calculator should be initially expanded. Defaults to false, collapsed.
     * @return bool Filtered value.
     */
    function( $is_expanded ) {
        return true;
    },
    10
);
```

```php
add_filter( 'fc_pro_cart_shipping_calculator_initially_expanded',
    /**
     * Initially expand shipping calculator on cart page.
     *
     * @param bool $is_expanded Whether calculator should be initially expanded. Defaults to false, collapsed.
     * @return bool Filtered value.
     */
    function( $is_expanded ) {
        return true;
    },
    10
);
```
