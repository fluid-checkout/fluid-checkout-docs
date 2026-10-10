```php
add_filter( 'fc_pro_account_matching_check_billing_email',
    /**
     * Disable account matching.
     *
     * @param bool $value Whether account matching check billing email. Default true.
     * @return bool Filtered value.
     */
    function( $value ) {
        return false;
    },
    10
);
```
