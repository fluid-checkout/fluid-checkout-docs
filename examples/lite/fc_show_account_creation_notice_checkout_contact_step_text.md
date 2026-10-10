```php
add_filter( 'fc_show_account_creation_notice_checkout_contact_step_text',
    /**
     * Hide account creation notice message.
     *
     * @param string $text Text to display. Default yes.
     * @return string Filtered value.
     */
    function( $text ) {
        return 'no';
    },
    10
);
```
