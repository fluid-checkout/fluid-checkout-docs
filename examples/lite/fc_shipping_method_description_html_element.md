```php
add_filter( 'fc_shipping_method_description_html_element',
    /**
     * Use paragraph element for shipping method descriptions.
     *
     * @param string $html HTML markup. Default small.
     * @return string Filtered value.
     */
    function( $html ) {
        return 'p';
    },
    10
);
```
