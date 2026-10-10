```php
add_filter( 'fc_checkout_email_fields_for_mailcheck',
    /**
     * Add custom email field to mailcheck.
     *
     * @param array $value Value to filter.
     * @return array Filtered value.
     */
    function( $value ) {
        $value[] = 'shipping_email';
        return $value;
    },
    10
);
```
