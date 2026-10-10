```php
add_filter( 'fc_adb_is_entry_add_enabled',
    /**
     * Disable adding new address book entries.
     *
     * @param bool $is_enabled Whether adding entries is enabled. Default: true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
