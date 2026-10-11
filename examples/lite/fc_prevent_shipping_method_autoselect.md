The simplest way to prevent automatic selection.

```php
add_filter( 'fc_prevent_shipping_method_autoselect', '__return_true', 10 );
```

Use a callback when you need conditions.

```php
add_filter( 'fc_prevent_shipping_method_autoselect',
    /**
     * Prevent automatic shipping method selection.
     *
     * @param bool $should_prevent Whether to prevent automatic selection. Default false.
     * @param string $default Default shipping method.
     * @param array $rates Shipping rates.
     * @param string $chosen_method Chosen method id.
     * @return bool Filtered value.
     */
    function( $should_prevent, $default, $rates, $chosen_method ) {
        return true;
    },
    10,
    4
);
```
