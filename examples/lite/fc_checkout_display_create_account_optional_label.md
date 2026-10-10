```php
add_filter( 'fc_checkout_display_create_account_optional_label',
    /**
     * Hide optional label for account creation.
     *
     * @param bool $label Label text. Default true.
     * @return bool Filtered value.
     */
    function( $label ) {
        return false;
    },
    10
);
```
