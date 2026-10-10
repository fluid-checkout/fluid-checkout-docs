```php
add_filter( 'fc_wrapper_classes_add_payment_method_page',
    /**
     * Add custom classes to add payment method page.
     *
     * @param string $classes CSS classes. Default empty string.
     * @return string Filtered value.
     */
    function( $classes ) {
        $classes .= ' custom-class-payment-page';
        return $classes;
    },
    10
);
```
