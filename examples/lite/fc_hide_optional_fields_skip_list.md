```php
add_filter( 'fc_hide_optional_fields_skip_list',
    /**
     * Skip hiding specific optional fields.
     *
     * @param string[] $skip_list Field keys to skip.
     * @return string[] Filtered value.
     */
    function( $skip_list ) {
        $skip_list[] = 'billing_company';
        $skip_list[] = 'shipping_company';
        return $skip_list;
    },
    10
);
```
