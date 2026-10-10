---
related_hooks:
  - fc_shipping_method_has_cost
---

```php
add_filter( 'fc_shipping_method_option_price',
    /**
     * Customize shipping method price display.
     *
     * @param mixed $method_costs Method costs.
     * @param \WC_Shipping_Rate $method Method.
     * @return mixed Filtered value.
     */
    function( $method_costs, $method ) {
        $cost = $method->get_cost();
        if ( $cost == 0 ) {
            return '<span class="free-shipping-text">' . __( 'FREE', 'my-theme' ) . '</span>';
        }
        return $method_costs;
    },
    10,
    2
);

add_filter( 'fc_shipping_method_has_cost',
    /**
     * Always show cost for all shipping methods.
     *
     * @param mixed $value Value to filter.
     * @param \WC_Shipping_Rate $method Method.
     * @return mixed Filtered value.
     */
    function( $value, $method ) {
        return true;
    },
    10,
    2
);
```
