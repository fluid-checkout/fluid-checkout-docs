```php
add_filter( 'fc_enable_checkout_email_mailcheck',
    /**
     * Disable email typo suggestions.
     *
     * @param bool $enabled Whether the feature is enabled. Default true.
     * @return bool Filtered value.
     */
    function( $enabled ) {
        return false;
    },
    10
);
```
