```php
add_filter( 'fc_pro_address_book_migration_users_per_request',
    /**
     * Reduce batch size for better performance on slower servers.
     *
     * @param int $users_per_request Number of users to process per request. Defaults to 500.
     * @return int Filtered value.
     */
    function( $users_per_request ) {
        return 100; // Process 100 users per request instead of default 500
    },
    10
);
```
