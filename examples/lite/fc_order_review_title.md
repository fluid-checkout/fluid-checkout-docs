```php
add_filter( 'fc_order_review_title',
    /**
     * Change order summary title.
     *
     * @param string $title Title text.
     * @return string Filtered value.
     */
    function( $title ) {
        return __( 'Your Order', 'my-theme' );
    },
    10
);
```
