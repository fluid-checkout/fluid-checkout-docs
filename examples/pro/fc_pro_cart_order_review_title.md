```php
add_filter( 'fc_pro_cart_order_review_title',
    /**
     * Customize order review title.
     *
     * @param mixed $title Title text.
     * @return mixed Filtered value.
     */
    function( $title ) {
        return __( 'Your Order', 'text-domain' );
    },
    10
);
```
