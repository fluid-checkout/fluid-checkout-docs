```php
add_action( 'fc_coupon_code_section_before',
    /**
     * Add coupon section header.
     */
    function() {
        echo '<div>Enter your coupon code below to enjoy exclusive discounts!</div>';
    },
    10
);
```
