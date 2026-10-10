```php
add_filter( 'fc_adb_is_entry_edit_enabled',
    /**
     * Disable editing address book entries.
     *
     * @param bool $is_enabled Whether editing entries is enabled. Default: true.
     * @return bool Filtered value.
     */
    function( $is_enabled ) {
        return false;
    },
    10
);
```
