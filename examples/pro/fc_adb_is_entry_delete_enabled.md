```php
add_filter( 'fc_adb_is_entry_delete_enabled',
    /**
     * Disable deleting address book entries.
     *
     * @param bool $is_enabled Whether deleting entries is enabled. Default: true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
