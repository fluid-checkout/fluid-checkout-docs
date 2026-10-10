```php
add_filter( 'fc_pro_checkout_coupon_code_message_text',
    /**
     * Customize coupon code message text.
     *
     * @param string $message_text The coupon code message text. Default: “Have a coupon?”.
     * @return string Filtered value.
     */
    function( $message_text ) {
        return __( 'Got a discount code? Enter it here!', 'text-domain' );
    },
    10
);
```
