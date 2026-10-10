```php
add_filter( 'fc_checkout_html_custom_attributes',
    /**
     * Add custom HTML attributes to checkout page.
     *
     * @param array $html HTML markup. Default empty array.
     * @return array Filtered value.
     */
    function( $html ) {
        $html['custom-attribute'] = 'custom-checkout-attribute';
        return $html;
    },
    10
);
```
