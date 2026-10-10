```php
add_action( 'fc_substep_coupon_codes_text_before',
    /**
     * Add coupon codes header text.
     */
    function() {
        if ( WC()->cart->get_coupons() ) {
            echo '<div class="fc-coupon-codes__header">Applied coupon codes:</div>';
        }
    },
    10
);
```
