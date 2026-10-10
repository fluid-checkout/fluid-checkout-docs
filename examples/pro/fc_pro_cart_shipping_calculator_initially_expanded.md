```php
add_filter( 'fc_pro_cart_shipping_calculator_initially_expanded',
    /**
     * Show shipping calculator expanded.
     *
     * @param bool $value Whether cart shipping calculator initially expanded. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
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
     * @param bool $value Whether cart shipping calculator initially expanded. Default false.
     * @return bool Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
