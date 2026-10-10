In `fc_pro_process_address_book_entry_field_{key}`, `first_name` replaces `{key}`.

```php
add_filter( 'fc_pro_process_address_book_entry_field_first_name',
    /**
     * Format first name field consistently.
     *
     * @param mixed $value Field value.
     * @param string $key Field key. (in filter name).
     * @return mixed Filtered value.
     */
    function( $value, $key ) {
        return ucfirst( strtolower( trim( $value ) ) );
    },
    10,
    2
);
```
