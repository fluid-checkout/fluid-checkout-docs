```php
add_filter( 'fc_checkout_no_shipping_method_chosen_html',
    /**
     * Customize no shipping method chosen message.
     *
     * @param string $html HTML markup.
     * @return string Filtered value.
     */
    function( $html ) {
        return '<span class="no-shipping">' . __( 'Please select a shipping method', 'my-theme' ) . '</span>';
    },
    10
);
```
