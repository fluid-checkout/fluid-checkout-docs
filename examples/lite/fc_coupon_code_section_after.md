```php
add_action( 'fc_coupon_code_section_after',
    /**
     * Add coupon section header.
     */
    function() {
        echo '<div>Enter your coupon code above to enjoy exclusive discounts!</div>';
    },
    10
);
```
