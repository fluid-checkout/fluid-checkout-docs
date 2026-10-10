```php
add_filter( 'fc_pro_account_matching_has_account_match',
    /**
     * Prevent account matching for specific email addresses.
     *
     * @param bool $has_account_match Whether an account match was found.
     * @param array $data The form data being checked, including email address and other field values.
     * @return bool Filtered value.
     */
    function( $has_account_match, $data ) {
            if ( isset( $data['billing_email'] ) ) {
                $email = sanitize_email( $data['billing_email'] );

                // Specific emails to block
                $blacklisted_emails = array(
                    '
        [email protected]
        ',
                );

                if ( in_array( $email, $blacklisted_emails ) ) {
                    return false;
                }
            }

            return $has_account_match;
    },
    10,
    2
);
```
