```php
add_filter( 'fc_show_order_totals_row_highlighted',
    /**
     * Always highlight order totals row.
     *
     * @param string $value Value to filter.
     * @return string Filtered value.
     */
    function( $value ) {
        return true;
    },
    10
);
```
