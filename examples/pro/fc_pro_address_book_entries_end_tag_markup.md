```php
add_filter( 'fc_pro_address_book_entries_end_tag_markup',
    /**
     * Change closing tag from </ul> to </div> for billing addresses.
     *
     * @param string $markup HTML markup.
     * @param string $address_type Address type (billing/shipping).
     * @param array $address_book_entries Address book entries.
     * @return string Filtered value.
     */
    function( $markup, $address_type, $address_book_entries ) {
        // Use div instead of ul for billing
        if ( $address_type === 'billing' ) {
            return '</div>';
        }

        // Otherwise, keep default tag
        return $markup;
    },
    10,
    3
);
```
