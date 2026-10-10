```php
add_filter( 'fc_set_parsed_posted_data',
    /**
     * Add prefix to order notes.
     *
     * @param mixed $new_posted_data New posted data.
     * @return mixed Filtered value.
     */
    function( $new_posted_data ) {
        // Add prefix to order notes if present
        if ( ! empty( $new_posted_data['order_comments'] ) ) {
            $new_posted_data['order_comments'] = 'Customer note: ' . $new_posted_data['order_comments'];
        }
        return $new_posted_data;
    },
    10
);
```
