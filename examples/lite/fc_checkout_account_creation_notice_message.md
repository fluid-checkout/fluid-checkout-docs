```php
add_filter( 'fc_checkout_account_creation_notice_message',
    /**
     * Customize account creation notice message.
     *
     * @param string $text Text to display.
     * @return string Filtered value.
     */
    function( $text ) {
        return __( 'Create an account to track your orders and save time on future purchases.', 'your-text-domain' );
    },
    10
);
```
