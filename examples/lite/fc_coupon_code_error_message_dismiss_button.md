```php
add_filter( 'fc_coupon_code_error_message_dismiss_button',
    /**
     * Add custom class to coupon error dismiss button.
     *
     * @param string $text Text to display.
     * @return string Filtered value.
     */
    function( $text ) {
        return str_replace( 'class="fc-coupon-code-message-dismiss"', 'class="fc-coupon-code-message-dismiss custom-dismiss-btn"', $text );
    },
    10
);
```
