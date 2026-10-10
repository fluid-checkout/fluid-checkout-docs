```php
add_filter( 'fc_coupon_code_error_message_dismiss_button_enabled',
    /**
     * Disable dismiss button for coupon error messages.
     *
     * @param bool $text Text to display. Default true.
     * @return bool Filtered value.
     */
    function( $text ) {
        return false;
    },
    10
);
```
