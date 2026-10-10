```php
add_filter( 'fc_payment_not_needed_message',
    /**
     * Customize payment not needed message.
     *
     * @param string $text Text to display.
     * @return string Filtered value.
     */
    function( $text ) {
        return __( 'Your order is free! No payment required.', 'my-theme' );
    },
    10
);
```
