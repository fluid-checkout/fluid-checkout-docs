---
related_hooks:
  - fc_shipping_method_has_cost
---

```php
add_filter( 'fc_shipping_method_option_price_markup',
    /**
     * Add custom styling to shipping method prices.
     *
     * @param string $html HTML markup.
     * @param WC_Shipping_Rate $method Method.
     * @param mixed $method_costs Method costs.
     * @return string Filtered value.
     */
    function( $html, $method, $method_costs ) {
        // Get cost
        $cost = $method->get_cost();

        // Define return custom price classes
        $price_class = $cost == 0 ? 'price-free' : 'price-cost';
        return str_replace( 'class="', 'class="' . $price_class . ' ', $html );
    },
    10,
    3
);

add_filter( 'fc_shipping_method_has_cost',
    /**
     * Always show cost for all shipping methods.
     *
     * @param mixed $value Value to filter.
     * @param WC_Shipping_Rate $method Method.
     * @return mixed Filtered value.
     */
    function( $value, $method ) {
        return true;
    },
    10,
    2
);
```
