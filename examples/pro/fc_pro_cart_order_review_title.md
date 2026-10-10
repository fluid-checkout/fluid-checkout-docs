```php
add_filter( 'fc_pro_cart_order_review_title',
    /**
     * Customize order review title.
     *
     * @param string $title The order review title.
     * @return string Filtered value.
     */
    function( $title ) {
        return __( 'Your Order', 'text-domain' );
    },
    10
);
```
