```php
add_action( 'fc_substep_coupon_codes_text_after',
    /**
     * Add promotional text after coupon codes display.
     */
    function() {
        // Only show if there are coupons applied
        if ( WC()->cart->get_coupons() ) {
            echo '<div class="fc-coupon-codes-promo">You are saving money!</div>';
        }
    },
    10
);
```
