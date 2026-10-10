```php
add_filter( 'fc_do_order_notes_hooks_priority',
    /**
     * Change order notes hooks priority.
     *
     * @param int $priority Hook or step priority. Default 100.
     * @return int Filtered value.
     */
    function( $priority ) {
        return 1000;
    },
    10
);
```
