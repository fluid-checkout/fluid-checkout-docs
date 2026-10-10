```php
add_filter( 'fc_shipping_method_option_start_tag_markup',
    /**
     * Add custom attributes to shipping methods container.
     *
     * @param string $html HTML markup.
     * @return string Filtered value.
     */
    function( $html ) {
        return '<ul id="shipping_method" class="shipping-method__options data-custom-attribute="shipping-options"">';
    },
    10
);
```
