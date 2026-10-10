```php
add_filter( 'fc_pro_checkout_coupon_code_message_text',
    /**
     * Customize coupon code message text.
     *
     * @param string $text Text.
     * @return string Filtered value.
     */
    function( $text ) {
        return __( 'Got a discount code? Enter it here!', 'text-domain' );
    },
    10
);
```
