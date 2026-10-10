```php
add_filter( 'fc_pro_address_book_address_fields',
    /**
     * Change company field label to "Business name" in address book forms.
     *
     * @param array $fields Address fields array.
     * @return array Filtered value.
     */
    function( $fields ) {
        // Check if company field exists and modify its label
        if ( isset( $fields['company'] ) ) {
            $fields['company']['label'] = 'Business name';
        }

        return $fields;
    },
    10
);
```
