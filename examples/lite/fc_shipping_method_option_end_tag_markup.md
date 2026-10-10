```php
add_filter( 'fc_shipping_method_option_end_tag_markup',
    /**
     * Add custom content after shipping methods.
     *
     * @param string $html HTML markup. Default </ul>.
     * @return string Filtered value.
     */
    function( $html ) {
        return '</ul><!-- End shipping methods -->';
    },
    10
);
```
