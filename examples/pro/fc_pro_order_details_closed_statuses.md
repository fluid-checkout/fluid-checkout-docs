```php
add_filter( 'fc_pro_order_details_closed_statuses',
    /**
     * Add archived status as closed.
     *
     * @param array $statuses Order statuses.
     * @return array Filtered value.
     */
    function( $statuses ) {
        $statuses[] = 'archived';
        return $statuses;
    },
    10
);
```
