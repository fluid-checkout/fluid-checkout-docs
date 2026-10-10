```php
add_filter( 'fc_pro_checkout_account_matching_text',
    /**
     * Customize account matching message.
     *
     * @param string $text Text.
     * @return string Filtered value.
     */
    function( $text ) {
        return __( 'We found an existing account with this email. This purchase will be linked to your existing account associated with the email address provided.', 'text-domain' );
    },
    10
);
```
