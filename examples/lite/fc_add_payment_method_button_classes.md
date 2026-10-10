```php
add_filter( 'fc_add_payment_method_button_classes',
    /**
     * Add custom classes to add payment method button.
     *
     * @param array $classes CSS classes. Default empty array.
     * @return array Filtered value.
     */
    function( $classes ) {
        $classes[] = 'custom-button';

        return $classes;
    },
    10
);
```
