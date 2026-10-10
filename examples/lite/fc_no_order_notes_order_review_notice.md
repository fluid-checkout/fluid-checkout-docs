```php
add_filter( 'fc_no_order_notes_order_review_notice',
    /**
     * Customize no order notes notice.
     *
     * @param string $notice Notice shown when the order notes substep has no review text.
     * @return string Filtered value.
     */
    function( $notice ) {
        return __( 'No special instructions provided.', 'my-theme' );
    },
    10
);
```
