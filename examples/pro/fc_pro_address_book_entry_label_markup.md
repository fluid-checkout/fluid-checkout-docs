```php
add_filter( 'fc_pro_address_book_entry_label_markup',
    /**
     * Show only name and city for cleaner look.
     *
     * @param string $markup Formatted address markup HTML.
     * @param array $address_entry Address entry data.
     * @param string $address_type Address type (billing/shipping).
     * @return string Filtered value.
     */
    function( $markup, $address_entry, $address_type ) {
        $markup = '<strong>' . $address_entry['first_name'] . ' ' . $address_entry['last_name'] . '</strong><br>';
        $markup .= $address_entry['city'] . ', ' . $address_entry['state'];
        return $markup;
    },
    10,
    3
);
```
