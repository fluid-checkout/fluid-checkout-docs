Running under very_late_hooks so needs a higher priority to run correctly. In this example we used 150

```php
add_filter( 'fc_coupon_code_substep_priority',
    /**
     * Set lower priority for coupon code substep.
     *
     * @param int $priority Hook or step priority. Default 10.
     * @return int Filtered value.
     */
    function( $priority ) {
        return 50;
    },
    150
);
```
