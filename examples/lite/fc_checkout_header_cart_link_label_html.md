```php
add_filter( 'fc_checkout_header_cart_link_label_html',
    /**
     * Add item count to cart link.
     *
     * @param string $link_label_html Link label html.
     * @return string Filtered value.
     */
    function( $link_label_html ) {
        $item_count = WC()->cart->get_cart_contents_count();
        return $link_label_html . sprintf( _n( ' (%d item)', ' (%d items)', $item_count, 'my-theme' ), $item_count );
    },
    10
);
```
