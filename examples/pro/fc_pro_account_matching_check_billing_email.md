```php
add_filter( 'fc_pro_account_matching_check_billing_email',
    /**
     * Disable account matching.
     *
     * @param bool $check_email Whether to check for account matches by billing email. Defaults to true.
     * @return bool Filtered value.
     */
    function( $check_email ) {
        return false;
    },
    10
);
```
