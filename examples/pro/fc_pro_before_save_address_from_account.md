```php
add_filter( 'fc_pro_before_save_address_from_account',
    /**
     * Test function to modify address data before saving from account.
     *
     * @param array $address_entry Address entry data.
     * @param int $user_id User ID.
     * @return array Filtered value.
     */
    function( $address_entry, $user_id ) {
        // Ensure city is always capitalized
        if ( ! empty( $address_entry['city'] ) ) {
            $address_entry['city'] = ucwords( strtolower( $address_entry['city'] ) );
        }

        return $address_entry;
    },
    10,
    2
);
```
